/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useAllCategoriesQuery } from "@/store/actions/categories";
import { usePostItemMutation } from "@/store/actions/compliants";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const statusOptions = ["Available", "Damaged", "Borrowed"];
const conditionOptions = ["New", "Good", "Worn Out", "Broken"];

const itemSchema = z.object({
  name: z.string().min(1, "Item Name is required"),
  title: z.string().min(1, "Item Title is required"),
  description: z.string().min(1, "Description is required"),
  serial_number: z.string().min(5, "Serial number is required"),
  images: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required")
    .max(4, "You can upload up to 4 images"),
  status: z.enum(statusOptions as [string, ...string[]]),
  condition: z.enum(conditionOptions as [string, ...string[]]),
  categoryId: z.string().min(1, "Category is required"),
});

type FormValues = z.infer<typeof itemSchema>;

interface EditItemModalProps {
  toggleEditModal: () => void;
  item: {
    id: string;
    name: string;
    title: string;
    description: string;
    serial_number: string;
    condition: string;
    status: string;
    categoryId: string;
    images: { src: string }[];
  };
}

const EditItemModal = ({ toggleEditModal, item }: EditItemModalProps) => {
  const [previews, setPreviews] = useState<string[]>(
    item.images?.map((image) => image.src) || []
  );

  const { data, error, isLoading: loadingCategories } = useAllCategoriesQuery();
  const categories = data?.data;

  const [postItem] = usePostItemMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: item.name,
      title: item.title,
      description: item.description,
      serial_number: item.serial_number,
      status: item.status,
      condition: item.condition,
      categoryId: item.categoryId,
      images: item.images.map((img) => new File([], img.src)),
    },
  });

  useEffect(() => {
    setPreviews(item.images?.map((image) => image.src) || []);
  }, [item.images]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + previews.length > 4) {
      toast.warn("You can only upload up to 4 images.");
      return;
    }

    setPreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
    setValue("images", [...files], { shouldValidate: true });
  };

  const removeImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));

    setValue(
      "images",
      previews
        .filter((_, i) => i !== index)
        .map((src, i) => new File([], `file-${i}`)),
      { shouldValidate: true }
    );
  };

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("serial_number", data.serial_number);
    data.images.forEach((image) => formData.append("images", image));
    formData.append("status", data.status);
    formData.append("condition", data.condition);
    formData.append("categoryId", data.categoryId);

    try {
      const response = await postItem(formData).unwrap();
      toast.success(response?.message);
      toggleEditModal();
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/10 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 text-black">
        <h1 className="text-2xl font-semibold mb-4">Edit Item</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2 pb-5 flex flex-col gap-5">
              <label htmlFor="images" className="block text-lg">
                Images
              </label>
              <div
                className="border-2 border-dashed border-gray-300 p-4 rounded-md flex flex-col items-center justify-center cursor-pointer h-full"
                onClick={() => document.getElementById("images")?.click()}
              >
                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />
                <span className="text-gray-500 text-sm">
                  Drag & Drop or Click to Upload
                </span>
              </div>
              {errors.images && (
                <span className="text-red-500 text-sm">
                  {errors.images.message}
                </span>
              )}

              <div className="grid grid-cols-2 gap-2">
                {previews.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      width={100}
                      height={100}
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs py-1 px-2 rounded-full"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-4/5 space-y-1">
              <div>
                <label htmlFor="name" className="block text-lg">
                  Item Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className={`w-full p-2 border rounded-md ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="title" className="block text-lg">
                  Item Title
                </label>
                <input
                  type="text"
                  id="title"
                  {...register("title")}
                  className={`w-full p-2 border rounded-md ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.title && (
                  <span className="text-red-500 text-sm">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="serial_number" className="block text-lg">
                  Serial Number
                </label>
                <input
                  type="text"
                  id="serial_number"
                  {...register("serial_number")}
                  className={`w-full p-2 border rounded-md ${
                    errors.serial_number ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.serial_number && (
                  <span className="text-red-500 text-sm">
                    {errors.serial_number.message}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-lg">
                  Category
                </label>
                <select
                  id="category"
                  {...register("categoryId")}
                  className="w-full p-3 border rounded-md text-black"
                >
                  <option value="">Select a Category</option>
                  {categories?.map((category: any) => (
                    <option
                      key={category?.id}
                      value={category?.id}
                      className="text-black"
                    >
                      {category?.categoryName}
                    </option>
                  ))}
                </select>
                {errors?.categoryId && (
                  <span className="text-red-500 text-sm">
                    {errors?.categoryId?.message}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="status" className="block text-lg">
                  Status
                </label>
                <select
                  id="status"
                  {...register("status")}
                  className="w-full p-3 border rounded-md"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="condition" className="block text-lg">
                  Condition
                </label>
                <select
                  id="condition"
                  {...register("condition")}
                  className="w-full p-3 border rounded-md"
                >
                  {conditionOptions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-lg">
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description")}
                  className={`w-full p-2 border rounded-md ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={toggleEditModal}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItemModal;
