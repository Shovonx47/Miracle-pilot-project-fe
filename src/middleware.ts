import { jwtDecode } from "jwt-decode";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Define public routes that do not require authentication
const AuthRoutes = ["/auth/login", "/auth/register", "/auth/add-details"];

// Define role-based protected routes
const roleBasedPrivateRoutes = {
    user: ["/", "/profile", "/dashboard"],
    student: ["/", "/admin", "/student/add-student", "/student/all-students", "/student/edit-student"],
    teacher: ["/", "/admin", "/student/add-student", "/student/all-students"],
    staff: ["/", "/admin", "/student/add-student", "/student/all-students"],
    admin: ["/", "/admin", "/student/add-student", "/student/all-students"],
    super_admin: [],
};

type Role = keyof typeof roleBasedPrivateRoutes;

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow public routes without authentication
    if (AuthRoutes.includes(pathname)) {
        console.log("Public route, allowing access.");
        return NextResponse.next();
    }

    // Get the token from cookies
    const accessToken = request.cookies.get("refreshToken")?.value;

    if (!accessToken) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
        const decodedData = jwtDecode(accessToken) as any;

        // Check if the token is expired
        if (!decodedData || Date.now() >= decodedData.exp * 1000) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }

        const role = decodedData?.role as Role;

        // If the user is super_admin, allow access to all routes
        if (role === "super_admin") {
            console.log("Super admin, allowing access to all routes.");
            return NextResponse.next();
        }

        if (!role || !roleBasedPrivateRoutes[role]) {
            console.log("Role is not valid, redirecting.");
            return NextResponse.redirect(new URL("/forbiddenPage", request.url));
        }

        const allowedRoutes = roleBasedPrivateRoutes[role];
        const isAllowed = allowedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

        if (isAllowed) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/forbiddenPage", request.url));
    } catch (error) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
}

export const config = {
    matcher: [
        "/",
        "/admin",
        "/super-admin",
        "/student/all-students",
        "/student/edit-student",
        "/teacher/edit-teacher",
        "/staff/edit-staff",
        "/human-resource/hr-dashboard",
        "/exam-schedule/edit-exam-schedule",
    ],
};