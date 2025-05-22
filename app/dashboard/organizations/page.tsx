"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useGetOrganizationsQuery } from "@/store/actions/organization";
import { useAssignUserOrganizationMutation } from "@/store/actions/auth";
import { isAdmin } from "@/utils/config/isValidRole";
import { useState } from "react";
import AddOrganizationModal from "./_components/AddOrganizationModal";
import AssignUserModal from "./_components/AssignUserModal";

const Organizations = () => {
  const [openModal, setOpenModal] = useState(false);
  const [assignModal, setAssignModal] = useState<null | {
    organizationName: string;
  }>(null);
  const toggleModal = () => setOpenModal(!openModal);

  const {
    data: organizationsResponse = {},
    isLoading,
    isError,
  } = useGetOrganizationsQuery();

  const [assignUserOrganization] = useAssignUserOrganizationMutation();

  const organizations = Array.isArray(organizationsResponse)
    ? organizationsResponse
    : organizationsResponse.data || [];

  const handleAssignUser = async (userId: string, organizationName: string) => {
    await assignUserOrganization({
      userId,
      organization_name: organizationName,
    }).unwrap();
  };

  if (isLoading) {
    return <div>Loading organizations...</div>;
  }

  if (isError) {
    return <div>Error loading organizations.</div>;
  }

  return (
    <div className="w-full h-full p-6">
      <div className="p-8 w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Organizations</h2>
          {isAdmin() && (
            <button
              onClick={toggleModal}
              className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Add Organization
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">#</th>
                <th className="px-4 py-2 border-b text-left">
                  Organization Name
                </th>
                <th className="px-10 py-2 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {organizations.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No organizations found.
                  </td>
                </tr>
              ) : (
                organizations?.map((org: any, idx: number) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{idx + 1}</td>
                    <td className="px-4 py-2 border-b">
                      {org.organization_name}
                    </td>
                    <td className="px-4 py-2 border-b flex justify-end">
                      <button
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        onClick={() =>
                          setAssignModal({
                            organizationName: org.organization_name,
                          })
                        }
                      >
                        Assign User
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAdmin() && openModal && <AddOrganizationModal onClose={toggleModal} />}
      {assignModal && (
        <AssignUserModal
          organizationName={assignModal.organizationName}
          onClose={() => setAssignModal(null)}
          onAssign={handleAssignUser}
        />
      )}
    </div>
  );
};

export default Organizations;
