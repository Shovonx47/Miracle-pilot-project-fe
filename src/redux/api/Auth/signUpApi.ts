import { baseApi } from "../baseApi";



const signUpApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (info) => ({
                url: "/register-user",
                method: "POST",
                body: info,
            }),
             
        }),
          
    }),
});

export const {
    useSignupMutation

} = signUpApi;
