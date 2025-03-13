import { baseApi } from "../baseApi";

const loginApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (info) => ({
                url: "/login",
                method: "POST",
                body: info,
                credentials: 'include',
            }),
            // invalidatesTags: ["class_routine"],
        }),
    }),
});

export const {
    useLoginMutation
} = loginApi;
