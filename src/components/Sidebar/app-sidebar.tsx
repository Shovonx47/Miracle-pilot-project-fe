"use client";

import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./sidebar-main";
import { roleBasedAccess } from "@/utils/roleBasedAccess";
import { Role } from "@/utils/role";
import { itemPermissions } from "@/utils/itemPermissions";
import { navigationData } from "@/utils/navigationData";
import { verifyToken } from "@/utils/verifyToken";
import { TUser } from "@/redux/features/Auth/authSlice";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [mounted, setMounted] = React.useState(false);
  const [userRole, setUserRole] = React.useState<Role>("teacher");
  const userToken = useSelector((state: RootState) => state?.auth?.token);

  React.useEffect(() => {
    setMounted(true);
    if (userToken) {
      try {
        const user = verifyToken(userToken) as TUser;
        setUserRole((user?.role as Role) || "teacher");
      } catch (error) {
        console.error("Error verifying token:", error);
        setUserRole("teacher");
      }
    }
  }, [userToken]);

  // Updated filterItems function to handle role-specific visibility
  const filterItems = React.useCallback((items: any[], sectionTitle: string) => {
    if (userRole === "super_admin") return items;

    return items.filter((item) => {
      // Handle student-specific visibility
      if (userRole === "student") {
        // Only show items specifically marked for students
        return item.showForRoles?.includes("student");
      }

      // For other roles, hide items marked as hidden for them
      if (item.hideForRoles?.includes(userRole)) {
        return false;
      }

      // Check permissions as before
      return itemPermissions[userRole]?.[sectionTitle]?.includes(item.permission);
    });
  }, [userRole]);

  // Filter sections and their respective items
  const filteredNavItems = React.useMemo(() => {
    return navigationData.navMain
      .filter((section) => roleBasedAccess[userRole]?.includes(section.title))
      .map((section) => ({
        ...section,
        items: filterItems(section.items, section.title),
      }))
      .filter((section) => section.items.length > 0);
  }, [userRole, filterItems]);

  if (!mounted) {
    return null;
  }

  return (
    <Sidebar collapsible="icon" side="left" variant="inset" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={navigationData.teams} />
      </SidebarHeader>
      <SidebarContent className="scrollBarThin">
        <NavMain items={filteredNavItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
