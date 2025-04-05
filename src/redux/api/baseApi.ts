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
    // Try to get token from Redux store first
    let token = (getState() as RootState).auth.token;
    
    // If not in Redux, try localStorage (for handling direct navigation to add-student)
    if (!token && typeof window !== 'undefined') {
      token = localStorage.getItem('auth_token') || '';
    }

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      console.log("Setting authorization header:", `Bearer ${token.substring(0, 10)}...`);
    }
    
    // Ensure content type is set
    headers.set('Content-Type', 'application/json');
    
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  // If we get an unauthorized error, try to refresh the token
  if (result?.error?.status === 401) {
    try {
      console.log('Attempting to refresh token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/auth/refresh-token`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data?.data?.token) {
        console.log('Token refreshed successfully');
        api.dispatch(
          setUser({
            token: data.data.token,
          })
        );
        // Retry the original request with the new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.log('Token refresh failed');
        await handleLogout(api.dispatch, true);
      }
    } catch (error) {
      console.error('Token refresh error:', error);
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
    "pendingRequest",
  ],
  endpoints: () => ({}),
});
