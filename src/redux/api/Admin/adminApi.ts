import { baseApi } from "../baseApi";

const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSingleAdmin: builder.query({
            query: (id) => ({
                url: `/admin/${id}`,
                method: "GET",
            }),
            providesTags: ["admin"],
        }),
    }),
});

export const {
    useGetSingleAdminQuery,
} = adminApi;
