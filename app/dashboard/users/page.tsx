/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllUsersQuery } from "@/store/actions/auth";
import { useAllroleQuery } from "@/store/actions/role";
import { useState } from "react";
import ChangeRoleModal from "./_components/ChangeRoleModal";

const displayKeys = ["firstName", "lastName", "email", "phone_number", "role"];

const Users = () => {
  const {
    data: usersResponse = [],
    isLoading,
    isError,
  } = useGetAllUsersQuery();

  // Fetch all roles
  const { data: rolesResponse = [] } = useAllroleQuery();
  const roles = Array.isArray(rolesResponse)
    ? rolesResponse
    : rolesResponse.data || [];

  // Ensure users is always an array
  const users = Array.isArray(usersResponse)
    ? usersResponse
    : usersResponse.data || [];

  // Helper to get role name by id
  const getRoleName = (roleId: string) => {
    const found = roles.find((role: any) => role.id === roleId);
    return found ? found.roleName || found.name : roleId;
  };

  // State for tracking which user is being changed (optional for modal)
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Handler for submitting role change (implement your mutation here)
  const handleChangeRole = async (userId: string, roleId: string) => {
    // Example: await updateUserRole({ userId, roleId }).unwrap();
    // Show toast or handle errors as needed
  };

  return (
    <div className="w-full h-full p-5">
      <div className="p-6 w-full bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700 border-b">
                <th className="px-2 py-3 whitespace-nowrap capitalize">#</th>
                {displayKeys.map((key) => (
                  <th
                    key={key}
                    className="px-2 py-3 whitespace-nowrap capitalize"
                  >
                    {key.replace(/([A-Z])/g, " $1")}
                  </th>
                ))}
                <th className="px-2 py-3 whitespace-nowrap capitalize">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={displayKeys.length + 2}
                    className="text-center py-6"
                  >
                    Loading users...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td
                    colSpan={displayKeys.length + 2}
                    className="text-center py-6 text-red-500"
                  >
                    Error loading users.
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan={displayKeys.length + 2}
                    className="text-center py-6 text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user: any, index: number) => (
                  <tr
                    key={user.id || index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition duration-200 border-b`}
                  >
                    <td className="px-2 py-3 text-sm text-gray-700">
                      {index + 1}
                    </td>
                    {displayKeys.map((key) => (
                      <td key={key} className="px-2 py-3 text-sm text-gray-700">
                        {key === "role"
                          ? getRoleName(user[key])
                          : String(user[key] ?? "")}
                      </td>
                    ))}
                    <td className="px-2 py-3 text-sm text-gray-700">
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        onClick={() => setSelectedUser(user)}
                      >
                        Change Role
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {selectedUser && (
          <ChangeRoleModal
            user={selectedUser}
            roles={roles}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
