import { baseApi } from "../baseApi";



const teacherApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createTeacher: builder.mutation({
            query: (info) => ({
                url: "/teachers",
                method: "POST",
                body: info,
            }),
            invalidatesTags: ["teacher"],
        }),
        getAllTeachers: builder.query({
            query: ({ page, limit, sort, searchTerm, status }) => ({
                url: "/teachers",
                method: "GET",
                params: { page, limit, sort, searchTerm, status }
            }),
            providesTags: ["teacher"],
        }),

        getSingleTeacher: builder.query({
            query: (id) => ({
                url: `/teachers/${id}`,
                method: "GET",
            }),
            providesTags: ["teacher"],
        }),

        updateTeacher: builder.mutation({
            query: ({ id, data }) => ({
                url: `/teachers/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["teacher"],
        }),
        deleteTeacher: builder.mutation({
            query: (id) => ({
                url: `/teachers/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["teacher"],
        }),
    }),
});

export const {
    useCreateTeacherMutation,
    useGetAllTeachersQuery,
    useGetSingleTeacherQuery,
    useUpdateTeacherMutation,
    useDeleteTeacherMutation

} = teacherApi;
