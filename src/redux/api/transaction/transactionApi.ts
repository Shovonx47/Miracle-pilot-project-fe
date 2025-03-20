import { baseApi } from "../baseApi";
import { TransactionResponse } from "@/types/transaction";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTransaction: build.mutation({
      query: (data) => ({
        url: "/transaction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["transaction"],
    }),
    getAllTransactions: build.query<TransactionResponse, Partial<Record<string, any>>>({
      query: (params = {}) => {
        // If date is provided, use the date range endpoint
        if (params.date) {
          return {
            url: "/transaction/get-all-transaction-by-date",
            method: "GET",
            params: {
              startDate: params.date,
              endDate: params.date
            }
          };
        }
        // Otherwise use the regular endpoint
        return {
          url: "/transaction",
          method: "GET",
          params: Object.keys(params).length > 0 ? params : undefined
        };
      },
      providesTags: ["transaction"],
    }),
  }),
});

export const { useCreateTransactionMutation, useGetAllTransactionsQuery } = transactionApi;
