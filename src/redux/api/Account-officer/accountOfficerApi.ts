import { baseApi } from "../baseApi";



const accountOfficerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createAccountOfficer: builder.mutation({
            query: (info) => ({
                url: "/account-officer",
                method: "POST",
                body: info,
            }),
            invalidatesTags: ["account_officer"],
        }),
        getAllAccountOfficers: builder.query({
            query: ({ page, limit, sort, searchTerm, status }) => ({
                url: "/account-officer",
                method: "GET",
                params: { page, limit, sort, searchTerm, status }
            }),
            providesTags: ["account_officer"],
        }),

        getSingleAccountOfficer: builder.query({
            query: (id) => ({
                url: `/account-officer/${id}`,
                method: "GET",
            }),
            providesTags: ["account_officer"],
        }),

        updateAccountOfficer: builder.mutation({
            query: ({ id, data }) => ({
                url: `/account-officer/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["account_officer"],
        }),
        deleteAccountOfficer: builder.mutation({
            query: (id) => ({
                url: `/account-officer/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["account_officer"],
        }),
    }),
});

export const {
    useCreateAccountOfficerMutation,
    useGetAllAccountOfficersQuery,
    useGetSingleAccountOfficerQuery,
    useUpdateAccountOfficerMutation,
    useDeleteAccountOfficerMutation

} = accountOfficerApi;
