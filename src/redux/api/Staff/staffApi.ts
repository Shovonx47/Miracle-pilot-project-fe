import { baseApi } from "../baseApi";



const staffApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createStaff: builder.mutation({
            query: (info) => ({
                url: "/staff",
                method: "POST",
                body: info,
            }),
            invalidatesTags: ["staff"],
        }),
        getAllStaffs: builder.query({
            query: ({ page, limit, sort, searchTerm, status }) => ({
                url: "/staff",
                method: "GET",
                params: { page, limit, sort, searchTerm, status }
            }),
            providesTags: ["staff"],
        }),

        getSingleStaff: builder.query({
            query: (id) => ({
                url: `/staff/${id}`,
                method: "GET",
            }),
            providesTags: ["staff"],
        }),

        updateStaff: builder.mutation({
            query: ({ id, data }) => ({
                url: `/staff/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["staff"],
        }),
        deleteStaff: builder.mutation({
            query: (id) => ({
                url: `/staff/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["staff"],
        }),
    }),
});

export const {
    useCreateStaffMutation,
    useGetAllStaffsQuery,
    useGetSingleStaffQuery,
    useUpdateStaffMutation,
    useDeleteStaffMutation

} = staffApi;
