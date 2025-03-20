export interface Transaction {
  _id: string;
  transactionCategory: string;
  transactionSubCategory: string;
  amount: number;
  transactionType: string;
  transactionDate: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Meta {
  page: number | null;
  limit: number | null;
  total: number;
  totalPage: number | null;
}

export interface TransactionResponse {
  success: boolean;
  message: string;
  data: {
    meta: Meta;
    data: Transaction[];
  };
}
