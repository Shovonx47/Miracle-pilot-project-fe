import { baseApi } from "../baseApi";

const singleUserApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSingleUser: builder.query({
            query: (userId) => ({
                url: `/auth/${userId}`,
                method: "GET",
            }),
            // invalidatesTags: ["class_routine"],
        }),
    }),
});

export const {
    useGetSingleUserQuery
} = singleUserApi;
