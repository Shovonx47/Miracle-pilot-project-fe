import { baseApi } from "../baseApi";



const studentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createStudent: builder.mutation({
            query: (info) => ({
                url: "/students",
                method: "POST",
                body: info,
                credentials: "include",
            }),
            invalidatesTags: ["student"],
        }),
        getAllStudents: builder.query({
            query: ({ page, limit, sort, searchTerm, status }) => ({
                url: "/students",
                method: "GET",
                params: { page, limit, sort, searchTerm, status }
            }),
            providesTags: ["student"],
        }),

        getSingleStudent: builder.query({
            query: (id) => ({
                url: `/students/${id}`,
                method: "GET",
            }),
            providesTags: ["student"],
        }),

        updateStudent: builder.mutation({
            query: ({ id, data }) => ({
                url: `/students/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["student"],
        }),
        deleteStudent: builder.mutation({
            query: (id) => ({
                url: `/students/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["student"],
        }),
    }),
});

export const {
    useCreateStudentMutation,
    useGetAllStudentsQuery,
    useGetSingleStudentQuery,
    useUpdateStudentMutation,
    useDeleteStudentMutation

} = studentApi;
