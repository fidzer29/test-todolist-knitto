import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PostPayload } from "../interface/index";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getTodoById: builder.query<PostPayload, number>({
      query: (id) => `todos/${id}`,
    }),
    getTodos: builder.query<PostPayload[], void>({
      query: () => `todos`,
    }),
  }),
});

export const { useGetTodoByIdQuery, useGetTodosQuery } = todoApi;
