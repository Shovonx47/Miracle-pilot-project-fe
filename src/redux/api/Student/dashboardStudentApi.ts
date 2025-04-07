import { baseApi } from "../baseApi";
import { Student, StudentApiResponse } from "@/types/student";

const dashboardStudentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStudent: builder.query<StudentApiResponse, void>({
      query: () => ({
        url: "/students",
        method: "GET"
      }),
      transformResponse: (baseQueryReturnValue: any): StudentApiResponse => {
        // Get the logged-in user's information from localStorage
        let userId = "";
        if (typeof window !== 'undefined') {
          try {
            const authToken = localStorage.getItem('auth_token');
            if (authToken) {
              // Decode JWT token to get user information
              const base64Url = authToken.split('.')[1];
              const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
              const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
              }).join(''));
              
              const decodedToken = JSON.parse(jsonPayload);
              userId = decodedToken.id || decodedToken.userId || "";
            }
          } catch (error) {
            console.error("Error decoding token:", error);
          }
        }

        // Filter students to find the one matching the logged-in user
        if (baseQueryReturnValue?.data?.data?.length > 0 && userId) {
          const students = baseQueryReturnValue.data.data;
          // Find the student that matches the logged-in user's ID
          const currentStudent = students.find((student: Student) => 
            student._id === userId || student.userId === userId || student.auth === userId
          );
          
          if (currentStudent) {
            return {
              ...baseQueryReturnValue,
              data: {
                ...baseQueryReturnValue.data,
                data: [currentStudent] // Only return the matched student
              }
            } as StudentApiResponse;
          }
        }
        
        return baseQueryReturnValue as StudentApiResponse;
      },
      providesTags: ["student"],
    }),
  }),
});

export const { useGetDashboardStudentQuery } = dashboardStudentApi;

// For server-side rendering
export const { getDashboardStudent } = dashboardStudentApi.endpoints;