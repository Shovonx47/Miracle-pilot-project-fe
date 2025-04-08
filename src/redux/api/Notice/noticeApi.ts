import { baseApi } from '../baseApi';

interface Notice {
  id: string;
  title: string;
  date: string;
  color: string;
}

interface NoticeApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Notice[];
}

// Define the query parameters interface
interface GetAllNoticesParams {
  page?: number;
  limit?: number;
  sort?: string;
}

const noticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNotice: builder.mutation({
      query: (info) => ({
        url: "/notice",
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["notice"],
    }),
    getAllNotices: builder.query<Notice[], GetAllNoticesParams | void>({
      query: (params: GetAllNoticesParams = {}) => ({
        url: "/notice",
        method: "GET",
        params
      }),
      transformResponse: (baseQueryReturnValue: any & NoticeApiResponse) => {
        return baseQueryReturnValue.success ? baseQueryReturnValue.data : [];
      },
      providesTags: ["notice"],
    }),
    getSingleNotice: builder.query({
      query: (id) => ({
        url: `/notice/${id}`,
        method: "GET",
      }),
      providesTags: ["notice"],
    }),
    updateNotice: builder.mutation({
      query: ({ id, data }) => ({
        url: `/notice/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["notice"],
    }),
    deleteNotice: builder.mutation({
      query: (id) => ({
        url: `/notice/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notice"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateNoticeMutation,
  useGetAllNoticesQuery,
  useGetSingleNoticeQuery,
  useUpdateNoticeMutation,
  useDeleteNoticeMutation
} = noticeApi;

export { noticeApi };