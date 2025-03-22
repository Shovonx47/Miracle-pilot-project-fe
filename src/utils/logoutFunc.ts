
import { logout } from "@/redux/features/Auth/authSlice";
import { toast } from "sonner";
import { persistor } from "@/redux/store";
import { AppDispatch } from "@/redux/store"; // Import the correct dispatch type

export const handleLogout = async (dispatch: AppDispatch, isSessionExpired: boolean,router?: any): Promise<void> => {
    try {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/auth/logout`, {
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


         if (router?.push) {
            router.push("/auth/login");
        } else {
            window.location.href = "/auth/login"; // Fallback
        }
    } catch (error) {
        console.log(error);
        toast.error("Logout failed. Please try again.");
    }
};
