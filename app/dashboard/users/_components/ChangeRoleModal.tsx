/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { useAssignRoleToUserMutation } from "@/store/actions/role";

interface ChangeRoleModalProps {
  user: any;
  roles: any[];
  onClose: () => void;
}

const schema = yup.object().shape({
  userId: yup.string().required("User ID is required"),
  roleId: yup.string().required("Role is required"),
});

const ChangeRoleModal: React.FC<ChangeRoleModalProps> = ({
  user,
  roles,
  onClose,
}) => {
  const [assignRoleToUser, { isLoading }] = useAssignRoleToUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      userId: user.id,
      roleId: user.role,
    },
  });

  useEffect(() => {
    setValue("userId", user.id);
    setValue("roleId", user.role);
  }, [user, setValue]);

  const submitHandler = async (data: any) => {
    await assignRoleToUser({
      userId: data.userId,
      roleName: data.roleId,
    }).unwrap();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Change User Role</h2>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-lg"
        >
          ✕
        </button>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User Name
            </label>
            <input
              type="text"
              value={`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              {...register("roleId")}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">-- Select Role --</option>
              {roles.map((role: any) => (
                <option key={role.id} value={role.roleName || role.name}>
                  {role.roleName || role.name}
                </option>
              ))}
            </select>
            {typeof errors.roleId?.message === "string" && (
              <p className="text-red-500 text-xs mt-1">
                {errors.roleId.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? "Changing..." : "Change Role"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeRoleModal;
