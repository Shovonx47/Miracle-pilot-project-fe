import { baseApi } from "../baseApi";



const forgotPasswordApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        forgotPassword: builder.mutation({
            query: (info) => ({
                url: "/send-verify-code",
                method: "PUT",
                body: info,
            }),
            invalidatesTags: ["forgot_password"],
        }),
        verifyOtp: builder.mutation({
            query: (info) => ({
                url: "/verify-otp",
                method: "PUT",
                body: info,
            }),
            invalidatesTags: ["forgot_password"],
        }),
        updatePassword: builder.mutation({
            query: (info) => ({
                url: "/update-forgot-password",
                method: "PUT",
                body: info,
            }),
            invalidatesTags: ["forgot_password"],
        }),

    }),
});

export const {
    useForgotPasswordMutation,
    useVerifyOtpMutation,
    useUpdatePasswordMutation

} = forgotPasswordApi;
