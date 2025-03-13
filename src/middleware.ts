import { jwtDecode } from "jwt-decode";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Define public routes that do not require authentication
const AuthRoutes = ["/auth/login", "/auth/register", "/auth/add-details"];

// Define role-based protected routes
const roleBasedPrivateRoutes = {
    user: ["/", "/profile", "/dashboard"],
    student: ["/", "/admin", "/student/add-student", "/student/all-students"],
    teacher: ["/", "/admin", "/student/add-student", "/student/all-students"],
    staff: ["/", "/admin", "/student/add-student", "/student/all-students"],
    admin: ["/", "/admin", "/student/add-student", "/student/all-students"],
    super_admin: [],
};

type Role = keyof typeof roleBasedPrivateRoutes;

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (AuthRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    const accessToken = request.cookies.get("refreshToken")?.value;
    
    if (!accessToken) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
        const decodedData = jwtDecode(accessToken) as any;
        
        if (!decodedData || Date.now() >= decodedData.exp * 1000) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }

        const role = decodedData?.role as Role;

        if (role === "super_admin") {
            return NextResponse.next();
        }

        if (!role || !roleBasedPrivateRoutes[role]) {
            return NextResponse.redirect(new URL("/forbiddenPage", request.url));
        }

        const allowedRoutes = roleBasedPrivateRoutes[role];
        const isAllowed = allowedRoutes.some((route) => 
            pathname === route || pathname.startsWith(`${route}/`)
        );

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
        "/student/add-student",
        "/student/all-students",
        "/student/edit-student",
        "/teacher/add-teacher",
        "/teacher/edit-teacher",
        "/staff/add-staff",
        "/staff/edit-staff",
        "/human-resource/hr-dashboard",
        "/exam-schedule/edit-exam-schedule",
    ],
};
