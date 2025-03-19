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

// Helper function to set a cookie (client-side only)
const setCookie = (name: string, value: string, days: number) => {
  if (typeof document !== 'undefined') {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`;
  }
};

// Helper function to delete a cookie (client-side only)
const deleteCookie = (name: string) => {
  if (typeof document !== 'undefined') {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
};

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
        setCookie('authToken', data.data.token, 7);
        
        // Retry the original request with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Handle token refresh failure - without using handleLogout
        deleteCookie('authToken');
        deleteCookie('refreshToken');
        
        // Dispatch logout action directly
        api.dispatch(logout());
        
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem("persist:auth");
        }
        
        // Redirect to login (client-side only)
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
      }
    } catch (error) {
      // Handle error - without using handleLogout
      deleteCookie('authToken');
      deleteCookie('refreshToken');
      
      // Dispatch logout action directly
      api.dispatch(logout());
      
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem("persist:auth");
      }
      
      // Redirect to login (client-side only)
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
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