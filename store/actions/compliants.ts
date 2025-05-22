/* eslint-disable @typescript-eslint/no-explicit-any */
import baseAPI from "@/utils/config/api";
import Cookies from "js-cookie";

const token = Cookies.get("access_token");

const compliantsApi = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    postCompliant: builder.mutation<any, FormData>({
      query: (body: FormData) => {
        return {
          url: "/compliants",
          method: "POST",
          body,
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        };
      },
      invalidatesTags: ["compliants"],
    }),
    editCompliant: builder.mutation<any, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/compliants/${id}`,
        method: "PATCH",
        body,
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      }),
      invalidatesTags: ["compliants"],
    }),
    allCompliants: builder.query<any, void>({
      query: () => ({
        url: "/compliants",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["compliants"],
    }),
    singleCompliant: builder.query<any, string>({
      query: (id) => ({
        url: `/compliants/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["compliants"],
    }),
    assignOrganizationToCompliant: builder.mutation<
      any,
      { compliantId: string; organizationId: string }
    >({
      query: ({ compliantId, organizationId }) => {
        const token = Cookies.get("access_token");
        return {
          url: `/compliants/${compliantId}/assign-organization`,
          method: "PATCH",
          body: { organizationId },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["compliants"],
    }),
  }),
});

export const {
  usePostCompliantMutation,
  useEditCompliantMutation,
  useAllCompliantsQuery,
  useSingleCompliantQuery,
  useAssignOrganizationToCompliantMutation,
} = compliantsApi;
