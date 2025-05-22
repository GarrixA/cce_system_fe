/* eslint-disable @typescript-eslint/no-explicit-any */
import baseAPI from "@/utils/config/api";
import Cookies from "js-cookie";

const token = Cookies.get("access_token");
const organizationApi = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createOrganization: builder.mutation<any, any>({
      query: (body: any) => ({
        url: "/organizations",
        method: "POST",
        body,
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      }),
      invalidatesTags: ["organizations"],
    }),
    getOrganizations: builder.query<any, void>({
      query: () => ({
        url: "/organizations",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["organizations"],
    }),
  }),
});

export const { useCreateOrganizationMutation, useGetOrganizationsQuery } =
  organizationApi;
