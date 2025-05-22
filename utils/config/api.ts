import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "@/store/index";
import { BASE_API_URL } from "./constants";

const baseAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: async (headers, { getState }) => {
      const {
        appReducer: { token },
      } = getState() as RootState;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["categories", "compliants", "organizations", "role", "User"],
  endpoints: () => ({}),
});

export default baseAPI;
