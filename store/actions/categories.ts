/* eslint-disable @typescript-eslint/no-explicit-any */
import baseAPI from "@/utils/config/api";
import Cookies from "js-cookie";

const token = Cookies.get("access_token");
const userApi = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    categories: builder.mutation<any, any>({
      query: (body: any) => {
        const token = Cookies.get("access_token");

        return {
          url: "/categories",
          method: "POST",
          body,
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        };
      },
      invalidatesTags: ["categories"],
    }),
    allCategories: builder.query<any, void>({
      query: () => ({
        url: "/categories",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["categories"],
    }),
  }),
});

export const { useAllCategoriesQuery, useCategoriesMutation } = userApi;
