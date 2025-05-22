/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useGetAllUsersQuery } from "@/store/actions/auth";

interface AssignUserModalProps {
  organizationName: string;
  onClose: () => void;
  onAssign: (userId: string, organizationName: string) => Promise<void>;
}

const AssignUserModal: React.FC<AssignUserModalProps> = ({
  organizationName,
  onClose,
  onAssign,
}) => {
  const { data: usersResponse = [], isLoading: usersLoading } =
    useGetAllUsersQuery();
  const users = Array.isArray(usersResponse)
    ? usersResponse
    : usersResponse.data || [];

  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast.error("Please select a user.");
      return;
    }
    setLoading(true);
    try {
      await onAssign(userId, organizationName);
      toast.success("User assigned to organization successfully!");
      onClose();
    } catch (err: any) {
      console.log(err);
      toast.error(err?.data?.message || "Failed to assign user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">
          Assign User to Organization
        </h2>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-lg"
        >
          ✕
        </button>
        <form onSubmit={handleAssign} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select User
            </label>
            <select
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full border p-2 rounded"
              required
              disabled={usersLoading}
            >
              <option value="">-- Select a user --</option>
              {users.map((user: any) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName} ({user.email})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organization Name
            </label>
            <input
              type="text"
              value={organizationName}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? "Assigning..." : "Assign User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignUserModal;
