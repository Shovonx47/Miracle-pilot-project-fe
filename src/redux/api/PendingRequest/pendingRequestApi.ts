import { baseApi } from "../baseApi";

const pendingRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPendingRequest: builder.mutation({
      query: (info) => ({
        url: "/pending-requests",
        method: "POST",
        body: info,
        credentials: "include",
      }),
      invalidatesTags: ["pendingRequest"],
    }),
    
    getAllPendingRequests: builder.query({
      query: ({ page, limit, status, requestType, sortBy, sortOrder }) => ({
        url: "/pending-requests",
        method: "GET",
        params: { page, limit, status, requestType, sortBy, sortOrder }
      }),
      providesTags: ["pendingRequest"],
    }),
    
    getSinglePendingRequest: builder.query({
      query: (requestId) => ({
        url: `/pending-requests/${requestId}`,
        method: "GET",
      }),
      providesTags: ["pendingRequest"],
    }),
    
    processPendingRequest: builder.mutation({
      query: ({ requestId, data }) => ({
        url: `/pending-requests/${requestId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["pendingRequest", "student", "teacher"],
    }),
  }),
});

export const {
  useCreatePendingRequestMutation,
  useGetAllPendingRequestsQuery,
  useGetSinglePendingRequestQuery,
  useProcessPendingRequestMutation
} = pendingRequestApi; 