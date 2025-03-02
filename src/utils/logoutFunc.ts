import { logout } from "@/redux/features/Auth/authSlice";
import { toast } from "sonner";
import { persistor } from "@/redux/store";
import { AppDispatch } from "@/redux/store"; // Import the correct dispatch type

export const handleLogout = async (dispatch: AppDispatch, isSessionExpired: boolean): Promise<void> => {
    try {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/logout`, {
            method: "POST",
            credentials: "include",
        });

        // Remove from Redux
        dispatch(logout());
        // Flush persisted storage to clear Redux state
        await persistor.flush();
        localStorage.removeItem("persist:auth");

        // Show appropriate logout message based on the event
        if (isSessionExpired) {
            toast.warning("Your session has expired. Please log in again to continue.");
        } else {
            toast.success("You’ve logged out. Come back anytime!");
        }

        // Redirect to login page
        window.location.href = "/auth/login";
    } catch (error) {
        toast.error("Logout failed. Please try again.");
    }
};
