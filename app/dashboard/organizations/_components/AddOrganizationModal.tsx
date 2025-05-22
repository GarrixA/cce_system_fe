"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateOrganizationMutation } from "@/store/actions/organization";
import { toast } from "react-toastify";

const organizationSchema = z.object({
  organization_name: z.string().nonempty("Organization name is required"),
});

type OrganizationFormValues = z.infer<typeof organizationSchema>;

const AddOrganizationModal = ({ onClose }: { onClose: () => void }) => {
  const [addOrganization, { isLoading }] = useCreateOrganizationMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationSchema),
  });

  const onSubmit = async (data: OrganizationFormValues) => {
    try {
      const response = await addOrganization(data).unwrap();
      toast.success(response?.message || "Organization added successfully");
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add organization");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Add New Organization</h2>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-lg"
        >
          ✕
        </button>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Organization Name
            </label>
            <input
              {...register("organization_name")}
              className="w-full border p-2 rounded"
              placeholder="Enter organization name"
            />
            {errors.organization_name && (
              <p className="text-red-500 text-sm">
                {errors.organization_name.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOrganizationModal;
