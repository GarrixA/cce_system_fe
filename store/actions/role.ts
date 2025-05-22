/* eslint-disable @typescript-eslint/no-explicit-any */
import baseAPI from "@/utils/config/api";
import Cookies from "js-cookie";

const token = Cookies.get("access_token");
const roleApi = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    role: builder.mutation<any, any>({
      query: (body: any) => {
        const token = Cookies.get("access_token");

        return {
          url: "/roles",
          method: "POST",
          body,
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        };
      },
      invalidatesTags: ["role"],
    }),
    allrole: builder.query<any, void>({
      query: () => ({
        url: "/roles",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["role"],
    }),
    assignRoleToUser: builder.mutation<
      any,
      { userId: string; roleName: string }
    >({
      query: ({ userId, roleName }) => {
        const token = Cookies.get("access_token");
        return {
          url: `/users/${userId}/roles`,
          method: "POST",
          body: { roleName },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["role"],
    }),
  }),
});

export const { useAllroleQuery, useRoleMutation, useAssignRoleToUserMutation } =
  roleApi;
