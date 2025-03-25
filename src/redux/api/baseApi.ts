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
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }
    // Remove these CORS headers - they should be set by the server
    // headers.set('Access-Control-Allow-Credentials', 'true');
    // headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_BASE_API_URL || '');

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/auth/refresh-token`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data?.data?.token) {
        api.dispatch(
          setUser({
            token: data.data.token,
          })
        );
        // Retry the original request
        result = await baseQuery(args, api, extraOptions);
      } else {
        await handleLogout(api.dispatch, true);
      }
    } catch (error) {
      await handleLogout(api.dispatch, true);
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
    "admin",
    "account_officer",
    "class_routine",
    "exam_schedule",
    "off_day",
    "salary",
    "attendance",
    "forgot_password",
  ],
  endpoints: () => ({}),
});
