"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  useAllCompliantsQuery,
  useAssignOrganizationToCompliantMutation,
} from "@/store/actions/compliants";
import { useGetOrganizationsQuery } from "@/store/actions/organization";
import { toast } from "react-toastify";
import { isAdmin, isAGENCY } from "@/utils/config/isValidRole";

const CompliantsList = () => {
  const { data, isLoading, isError } = useAllCompliantsQuery();
  const { data: orgsData = [] } = useGetOrganizationsQuery();
  const organizations = Array.isArray(orgsData)
    ? orgsData
    : orgsData.data || [];

  const compliants = Array.isArray(data) ? data : data?.data || [];

  const [assignOrganizationToCompliant] =
    useAssignOrganizationToCompliantMutation();

  const getOrganizationName = (orgId: string) => {
    const found = organizations.find(
      (org: any) =>
        org.id === orgId ||
        org.organization_id === orgId ||
        org.organizationId === orgId
    );
    return found ? found.organization_name : orgId;
  };

  // Handler for assign organization button
  const handleAssignOrganization = async (compliantId: string) => {
    const organizationId = organizations[0]?.id;
    if (!organizationId) {
      toast.error("No organization available to assign.");
      return;
    }
    try {
      await assignOrganizationToCompliant({
        compliantId,
        organizationId,
      }).unwrap();
      toast.success("Organization assigned successfully!");
    } catch (err: any) {
      toast.error(err?.message || "Failed to assign organization.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading compliants.</div>;

  return (
    <div className="p-6 w-full h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold mb-6">Compliants List</h1>
      </div>

      {isAdmin() && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">#</th>
                <th className="px-4 py-2 border-b text-left">Name</th>
                <th className="px-4 py-2 border-b text-left">Description</th>
                <th className="px-4 py-2 border-b text-left">Status</th>
                <th className="px-4 py-2 border-b text-left">Email</th>
                <th className="px-4 py-2 border-b text-left">Phone</th>
                <th className="px-4 py-2 border-b text-left">Organization</th>
                <th className="px-4 py-2 border-b text-left">Answered</th>
                <th className="px-4 py-2 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {compliants?.map((compliant: any, idx: number) => (
                <tr key={compliant.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{idx + 1}</td>
                  <td className="px-4 py-2 border-b">{compliant.name}</td>
                  <td className="px-4 py-2 border-b">
                    {compliant.description}
                  </td>
                  <td className="px-4 py-2 border-b capitalize">
                    {compliant.status}
                  </td>
                  <td className="px-4 py-2 border-b">{compliant.email}</td>
                  <td className="px-4 py-2 border-b">
                    {compliant.phone_number}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {getOrganizationName(compliant.organizationId)}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {compliant.isAnswered ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2 border-b text-xs text-gray-400">
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      onClick={() => handleAssignOrganization(compliant.id)}
                    >
                      Assign Organization
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isAGENCY() && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {compliants.map((compliant: any) => (
            <div
              key={compliant.id}
              className="bg-white shadow rounded-lg p-6 flex flex-col gap-2"
            >
              <div className="font-bold text-lg">{compliant.name}</div>
              <div className="text-gray-700">{compliant.description}</div>
              <div>
                <span className="font-semibold">Status:</span>{" "}
                <span className="capitalize">{compliant.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompliantsList;
