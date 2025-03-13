import { baseApi } from "../baseApi";

const classRoutineApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createClassRoutine: builder.mutation({
            query: (info) => ({
                url: "/class-routine",
                method: "POST",
                body: info,
            }),
            invalidatesTags: ["class_routine"],
        }),
        getAllClassRoutines: builder.query({
            query: ({ page, limit, sort }) => ({
                url: "/class-routine",
                method: "GET",
                params: { page, limit, sort }
            }),
            providesTags: ["class_routine"],
        }),
        getSingleClassRoutine: builder.query({
            query: (id) => ({
                url: `/class-routine/${id}`,
                method: "GET",
            }),
            providesTags: ["class_routine"],
        }),
        updateClassRoutine: builder.mutation({
            query: ({ id, data }) => ({
                url: `/class-routine/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["class_routine"],
        }),
        deleteClassRoutine: builder.mutation({
            query: (id) => ({
                url: `/class-routine/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["class_routine"],
        }),
    }),
});

export const {
    useCreateClassRoutineMutation,
    useGetAllClassRoutinesQuery,
    useGetSingleClassRoutineQuery,
    useUpdateClassRoutineMutation,
    useDeleteClassRoutineMutation
} = classRoutineApi; 