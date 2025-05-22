"use client";

import { useEffect, useState } from "react";
import AddCategoryModal from "./_components/AddCategoryModal";
import { isAdmin } from "@/utils/config/isValidRole";
import { useAllCategoriesQuery } from "@/store/actions/categories";

const Categories = () => {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal(!openModal);
  const [adminState, setAdminState] = useState(false);

  useEffect(() => {
    setAdminState(isAdmin());
  }, []);

  const { data, error, isLoading } = useAllCategoriesQuery();
  const categories = data?.data;

  return (
    <div className="w-full h-full bg-[#CCE2F3] flex items-center justify-center">
      <div className="p-6 w-4/5 md:w-3/5 lg:w-1/2 mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Categories</h3>
          {adminState && (
            <button
              className="font-bold text-base px-2 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={toggleModal}
            >
              Add Category
            </button>
          )}
        </div>

        {isLoading ? (
          <p className="text-gray-600">Loading categories...</p>
        ) : error ? (
          <p className="text-red-500">Failed to load categories</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((cat: { id: string; categoryName: string }) => (
                <li
                  key={cat?.id}
                  className="py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  {cat?.categoryName}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No categories found</p>
            )}
          </ul>
        )}
      </div>

      {openModal && <AddCategoryModal onClose={toggleModal} />}
    </div>
  );
};

export default Categories;
