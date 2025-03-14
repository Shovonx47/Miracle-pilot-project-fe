import { baseApi } from "../baseApi";

const salaryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSalary: builder.mutation({
            query: (info) => ({
                url: "/salary",
                method: "POST",
                body: info,
            }),
            invalidatesTags: ["salary"],
        }),
        getAllSalaries: builder.query({
            query: ({ page, limit, sort, searchTerm, status }) => ({
                url: "/salary",
                method: "GET",
                params: { page, limit, sort, searchTerm, status }
            }),
            providesTags: ["salary"],
        }),
        getSingleSalary: builder.query({
            query: (id) => ({
                url: `/salary/${id}`,
                method: "GET",
            }),
            providesTags: ["salary"],
        }),
        updateSalary: builder.mutation({
            query: ({ id, data }) => ({
                url: `/salary/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["salary"],
        }),
        deleteSalary: builder.mutation({
            query: (id) => ({
                url: `/salary/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["salary"],
        }),
    }),
});

export const {
    useCreateSalaryMutation,
    useGetAllSalariesQuery,
    useGetSingleSalaryQuery,
    useUpdateSalaryMutation,
    useDeleteSalaryMutation
} = salaryApi; 