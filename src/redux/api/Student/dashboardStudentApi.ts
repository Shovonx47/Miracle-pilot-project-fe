import { baseApi } from "../baseApi";
import { StudentApiResponse } from "@/types/student";

const dashboardStudentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStudent: builder.query<StudentApiResponse, void>({
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

export const { useGetDashboardStudentQuery } = dashboardStudentApi;

// For server-side rendering
export const { getDashboardStudent } = dashboardStudentApi.endpoints;