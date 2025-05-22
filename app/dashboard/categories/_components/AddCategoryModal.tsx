"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategoriesMutation } from "@/store/actions/categories";
import { toast } from "react-toastify";

interface AddCategoryModalProps {
  onClose: () => void;
}

const categorySchema = z.object({
  organizationId: z.string().nonempty("Organization ID is required"),
  categoryName: z
    .string()
    .nonempty("Category name is required")
    .min(2, "Category name must be at least 2 characters long"),
});

type CategoryForm = z.infer<typeof categorySchema>;

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
  });

  const [addCategory, { isLoading, error }] = useCategoriesMutation();

  const onSubmit = async (data: CategoryForm) => {
    try {
      const response = await addCategory({
        organizationId: data.organizationId,
        categoryName: data.categoryName,
      }).unwrap();
      toast.success(response?.data?.message);
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 md:w-3/5 lg:w-1/3">
        <h2 className="md:text-xl lg:text-lg font-bold text-gray-800 mb-4">
          Add New Category
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-base md:text-xl lg:text-lg font-medium">
              Organization ID
            </label>
            <input
              type="text"
              {...register("organizationId")}
              className="w-full mt-1 p-2 md:p-4 lg:p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              placeholder="Enter organization ID"
            />
            {errors?.organizationId && (
              <p className="text-red-500 text-sm md:text-base lg:text-sm mt-1">
                {errors?.organizationId?.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 text-base md:text-xl lg:text-lg font-medium">
              Category Name
            </label>
            <input
              type="text"
              {...register("categoryName")}
              className="w-full mt-1 p-2 md:p-4 lg:p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              placeholder="Enter category name"
            />
            {errors?.categoryName && (
              <p className="text-red-500 text-sm md:text-base lg:text-sm mt-1">
                {errors?.categoryName?.message}
              </p>
            )}
          </div>

          {isLoading && <p className="text-gray-500">Adding category...</p>}
          {error && (
            <p className="text-red-500 text-sm">
              Failed to add category. Please try again.
            </p>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white text-base md:text-lg rounded-lg hover:bg-gray-500 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white text-base md:text-lg rounded-lg hover:bg-blue-700 transition"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
