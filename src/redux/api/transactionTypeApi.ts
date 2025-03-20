import { baseApi } from "./baseApi";

interface TransactionType {
  _id: string;
  type: string;
  category: string;
  subCategory: string;
  createdAt: string;
  updatedAt: string;
}

// New interface for create/update operations
interface ITransactionTypePayload {
  type: string;
  category: string;
  subCategory: string;
}

interface ITransactionTypeResponse {
  success: boolean;
  message: string;
  data: TransactionType[];
}

const transactionTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTransactionType: build.mutation<ITransactionTypeResponse, ITransactionTypePayload>({
      query: (data) => ({
        url: "/transaction-Type",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["transaction_type"],
    }),
    
    getAllTransactionTypes: build.query<ITransactionTypeResponse, Record<string, any>>({
      query: (params) => ({
        url: "/transaction-Type",
        method: "GET",
        params: params,
      }),
      providesTags: ["transaction_type"],
    }),
  }),
  overrideExisting: false,
});

export const { 
  useCreateTransactionTypeMutation,
  useGetAllTransactionTypesQuery 
} = transactionTypeApi;
