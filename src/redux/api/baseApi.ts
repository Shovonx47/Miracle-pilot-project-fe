import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setUser, logout } from "../features/Auth/authSlice";
import Cookies from "js-cookie";

// Define a service using a base URL and expected endpoints
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    headers.set("Content-Type", "application/json");
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
      // Try to refresh the token
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/auth/refresh-token`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const data = await res.json();

      if (data?.data?.token) {
        // Update Redux state
        api.dispatch(
          setUser({
            token: data.data.token,
          })
        );
        
        // Update cookie
        Cookies.set('authToken', data.data.token, { 
          expires: 7,
          path: '/',
          sameSite: 'lax'
        });
        
        // Retry the original request with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Handle token refresh failure - without using handleLogout
        Cookies.remove('authToken', { path: '/' });
        document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        
        // Dispatch logout action directly
        api.dispatch(logout());
        localStorage.removeItem("persist:auth");
        
        // Redirect to login
        window.location.href = '/auth/login';
      }
    } catch (error) {
      // Handle error - without using handleLogout
      Cookies.remove('authToken', { path: '/' });
      document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      // Dispatch logout action directly
      api.dispatch(logout());
      localStorage.removeItem("persist:auth");
      
      // Redirect to login
      window.location.href = '/auth/login';
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
    "salary",
  ],
  endpoints: () => ({}),
});