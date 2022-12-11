import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_BASE_URL;

const createRequest = (url) => ({ url });

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getDataAll: builder.query({
      query: () => createRequest("/apps"),
    }),
    getDataSearch: builder.query({
      query: ({ startDate, endDate }) =>
        createRequest(`/report?startDate=${startDate}&endDate=${endDate}`),
    }),
  }),
});

export const { useGetDataAllQuery, useGetDataSearchQuery } = dataApi;
