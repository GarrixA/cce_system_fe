import React from "react";

const DeleteItemsModal = ({
  toggleDeleteModal,
  onDeleteConfirm,
}: {
  toggleDeleteModal: () => void;
  onDeleteConfirm: () => void;
}) => {
  return (
    <div className="fixed inset-0 w-full h-full bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white w-1/3 h-auto p-6 rounded-lg shadow-lg relative">
        <h3 className="text-xl font-semibold mb-4">
          Are you sure you want to delete this item?
        </h3>
        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md text-black"
            onClick={toggleDeleteModal}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md"
            onClick={onDeleteConfirm}
          >
            Confirm
          </button>
        </div>
        <button
          className="absolute top-4 right-4 text-gray-500"
          onClick={toggleDeleteModal}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default DeleteItemsModal;
