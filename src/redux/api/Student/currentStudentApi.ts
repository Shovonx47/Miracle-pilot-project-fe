import { baseApi } from "../baseApi";
import { StudentApiResponse } from "@/types/student";

const currentStudentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentStudent: builder.query<StudentApiResponse, void>({
      query: () => ({
        url: "/students",
        method: "GET",
      }),
      transformResponse: (baseQueryReturnValue: any): StudentApiResponse => {
        return baseQueryReturnValue as StudentApiResponse;
      },
      providesTags: ["student"],
    }),
  }),
});

export const { useGetCurrentStudentQuery } = currentStudentApi;

// For server-side rendering
export const { getCurrentStudent } = currentStudentApi.endpoints;