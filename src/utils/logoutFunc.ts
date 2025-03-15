import { logout } from "@/redux/features/Auth/authSlice";
import { toast } from "sonner";
// Remove direct import from store
// import { persistor } from "@/redux/store";
// import { AppDispatch } from "@/redux/store";

// Use a more generic type for dispatch
export const handleLogout = async (dispatch: any, isSessionExpired: boolean): Promise<void> => {
    try {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/logout`, {
            method: "POST",
            credentials: "include",
        });

        // Remove from Redux
        dispatch(logout());
        
        // Instead of using persistor directly, clear localStorage
        localStorage.removeItem("persist:auth");

        // Show appropriate logout message based on the event
        if (isSessionExpired) {
            toast.warning("Your session has expired. Please log in again to continue.");
        } else {
            toast.success("You've logged out. Come back anytime!");
        }

        // Redirect to login page
        window.location.href = "/auth/login";
    } catch (error) {
        toast.error("Logout failed. Please try again.");
    }
};
