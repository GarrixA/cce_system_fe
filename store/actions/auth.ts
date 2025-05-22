/* eslint-disable @typescript-eslint/no-explicit-any */
import baseAPI from "@/utils/config/api";
import Cookies from "js-cookie";

const userApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (body: any) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<any, any>({
      query: (body: any) => ({
        url: "/users/register",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
    }),
    getAllUsers: builder.query<any, void>({
      query: () => {
        const token = Cookies.get("access_token");
        return {
          url: "/users",
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        };
      },
      providesTags: ["User", "role"],
    }),
    assignUserOrganization: builder.mutation<
      any,
      { userId: string; organization_name: string }
    >({
      query: ({ userId, organization_name }) => {
        const token = Cookies.get("access_token");
        return {
          url: `/users/${userId}/assign-organization`,
          method: "PATCH",
          body: { organization_name },
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["User", "role"],
    }),

    verify2FA: builder.mutation<any, { token: string; otp: string }>({
      query: ({ token, otp }) => ({
        url: `/users/2fa/${token}`,
        method: "POST",
        body: { otp },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetAllUsersQuery,
  useAssignUserOrganizationMutation,
  useVerify2FAMutation,
} = userApi;
