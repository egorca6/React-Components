import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Get_Character } from "@/constants/api";
import { ICharacterArray } from "@/types/interface";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: Get_Character }),
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
} = api;
