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
  // Get the user's role from Redux

  const userToken = useSelector((state: RootState) => state?.auth?.token);

  // Check if userToken is not null
  let userRole

  if (userToken) {
    const user = verifyToken(userToken) as TUser;
    userRole = user?.role
  } else {
    userRole = "";
  }


  // Ensure userRole is valid and a proper Role type
  const role: Role = (userRole as Role) ?? "teacher"; // Default to 'teacher' if role is undefined

  // Function to filter items inside each section
  const filterItems = (items: any[], sectionTitle: string) => {
    // If user is super_admin, return all items
    if (role === "super_admin") return items;

    return items.filter((item) =>
      itemPermissions[role]?.[sectionTitle]?.includes(item.permission)
    );
  };

  // Filter sections and their respective items
  const filteredNavItems = navigationData.navMain
    .filter((section) => roleBasedAccess[role]?.includes(section.title))
    .map((section) => ({
      ...section,
      items: filterItems(section.items, section.title),
    }))
    .filter((section) => section.items.length > 0); // Remove empty sections

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
