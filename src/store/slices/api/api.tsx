import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Get_Character } from "@/constants/api";
import { ICharacterArray } from "@/types/interface";
import { HYDRATE } from "next-redux-wrapper";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: Get_Character }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    getCharacterByName: builder.query<ICharacterArray, string>({
      query: (name) => `?name=${name}`,
    }),
    getCharacterByPage: builder.query<
      ICharacterArray,
      { page: number; pageSize: number }
    >({
      query: ({ page, pageSize }) => `?page=${page}&pageSize=${pageSize}`,
    }),
    getCharacterDetails: builder.query<ICharacterArray, number>({
      query: (id) => `${id}`,
    }),
  }),
});

export const {
  useGetCharacterByNameQuery,
  useGetCharacterByPageQuery,
  useGetCharacterDetailsQuery,
  util: { getRunningQueriesThunk },
} = api;

export const { getCharacterByName, getCharacterByPage, getCharacterDetails } =
  api.endpoints;
