import { logout } from "@/redux/features/Auth/authSlice";
import { toast } from "sonner";
import { persistor } from "@/redux/store";
import { AppDispatch } from "@/redux/store"; // Import the correct dispatch type

export const handleLogout = async (dispatch: AppDispatch): Promise<void> => {
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

        // Show Logout Success Message
        toast.warning("Your session has expired. Please log in again to continue.");


        // Redirect to login page
        window.location.href = "/";
    } catch (error) {
        console.error("Logout failed", error);
        toast.error("Logout failed. Please try again.");
    }
};
