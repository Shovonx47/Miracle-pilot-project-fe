import { baseApi } from "../baseApi";

const attendanceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addAttendance: builder.mutation({
            query: (info) => ({
                url: `/attendance`,
                method: "POST",
                body: info
            }),
            invalidatesTags: ["attendance"],
        }),
    }),
});

export const {
    useAddAttendanceMutation
} = attendanceApi;
