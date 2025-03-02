import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setUser } from "../features/Auth/authSlice";
import { handleLogout } from "@/utils/logoutFunc";

// Define a service using a base URL and expected endpoints

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const isSessionExpired = true;

  let result = await baseQuery(args, api, extraOptions);


  if (result?.error?.status === 401) {
    //* Send Refresh

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/refresh-token`, {
      method: 'POST',
      credentials: 'include',
    });

    const data = await res.json();

    if (data?.data?.token) {
      // const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          // user,
          token: data.data.token,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      await handleLogout(api.dispatch, isSessionExpired);
    }
  }

  return result;
};


export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "student",
    "teacher",
    "staff",
    "account_officer",
    "class_routine",
    "exam_schedule",
    "off_day",
  ],
  endpoints: () => ({}),
});
