// middleware.ts
import { jwtDecode } from "jwt-decode";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Define the public routes (no authentication required)
const AuthRoutes = ["/", "/register", "/add-details"]; // Public routes

// Define role-based private routes using regular expressions
const roleBasedPrivateRoutes = {
  user: [
    "/profile",  // Profile route for user
    "/dashboard", // Dashboard route for user
  ],
  admin: [
    "/admin", // Admin area (admin dashboard, settings, etc.)
    "/student/add-student", // Admin access to adding students
    "/student/all-students", // Admin access to all students
  ],
  super_admin: [
    "/super-admin", // Super admin area
    "/student/add-student", // Super admin access to adding students
    "/student/all-students", // Super admin access to all students
    "/admin", // Super admin can access the admin area as well
  ],
};

// Helper function to build matcher patterns from role-based routes
const buildMatcher = (routes: string[]) => {
  return routes.map(route => `${route}(/.*)?`); // Use regex to match the base route and any sub-path
};

type Role = keyof typeof roleBasedPrivateRoutes;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the access token (refreshToken)
  const accessToken = request.cookies.get("refreshToken")?.value ?? null;

  // If there's no token and the route is public, allow access
  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      // If there's no token and it's not a public route, redirect to login page
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  let decodedData = null;
  try {
    decodedData = jwtDecode(accessToken) as any;
  } catch (error) {
    // If the token is invalid or expired, redirect to login
    return NextResponse.redirect(new URL("/", request.url));
  }

  const role = decodedData?.role as Role;

  // If the role doesn't exist or is invalid, redirect to login
  if (!role || !roleBasedPrivateRoutes[role]) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Build matcher routes for the role
  const allowedRoutes = buildMatcher(roleBasedPrivateRoutes[role]);

  // Check if the current path is in the allowed routes for the role
  const isAllowed = allowedRoutes.some((route) => pathname.match(new RegExp(route)));

  // If the route is allowed for the user role, proceed; otherwise, redirect to login
  if (isAllowed) {
    return NextResponse.next();
  }

  // If none of the conditions match, redirect to login
  return NextResponse.redirect(new URL("/forbiddenPage", request.url));
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/add-details", // Public add-details route
    "/profile(/.*)?", // Match /profile and all sub-paths
    "/dashboard(/.*)?", // Match /dashboard and all sub-paths
    "/admin(/.*)?", // Match /admin and all sub-paths
    "/super-admin(/.*)?", // Match /super-admin and all sub-paths
    "/student/add-student", // Protect the student add page
    "/student/all-students", // Protect student all-students page
    "/student/edit-student", // Protect student edit page
    "/teacher/add-teacher", // Protect teacher add page
    "/teacher/edit-teacher", // Protect teacher edit page
    "/staff/add-staff", // Protect staff add page
    "/staff/edit-staff", // Protect staff edit page
    "/human-resource/hr-dashboard", // Protect HR dashboard page
    "/exam-schedule/edit-exam-schedule", // Protect exam schedule edit page
    // Add any other routes that need to be protected
  ],
};
