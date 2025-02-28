"use client";

import * as React from "react";
import schoolLogo from "@/assets/school logo.png";
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
import { GraduationCap, Users } from "lucide-react";

// Define valid roles
type Role = "admin" | "teacher" | "accountant" | "user" | "super_admin" | "staff";

// Role-based permissions at SECTION level
const roleBasedAccess: Record<Role, string[]> = {
  admin: ["Students", "Teacher", "Staff", "Human Resource", "Accountant", "Create Class Routine", "Exam Schedule", "Off Day Setup"],
  teacher: ["Students", "Teacher", "Create Class Routine", "Exam Schedule"],
  accountant: ["Accountant"],
  user: ["Human Resource"],
  super_admin: ["Students", "Teacher", "Staff", "Human Resource", "Accountant", "Create Class Routine", "Exam Schedule", "Off Day Setup"],
  staff: ["Staff"], // Staff should only see its own section
};

// Item-Level Access Control
const itemPermissions: Record<Role, { [key: string]: string[] }> = {
  admin: {
    Staff: ["add", "edit", "view"],
    Students: ["add", "view"],
    "Exam Schedule": ["add", "edit"],
  },
  staff: {
    Staff: ["add", "view"], // Staff can add and view, but NOT edit
  },
  teacher: {},
  accountant: {},
  user: { Staff: ["add", "edit", "view"] },
  super_admin: {
    Staff: ["add", "edit", "view"],
    Students: ["add", "edit", "view"],
    Teacher: ["add", "edit", "view"],
    "Exam Schedule": ["add", "edit"],
    "Human Resource": ["view"],
    Accountant: ["add", "edit", "view"],
    "Create Class Routine": ["add", "edit"],
    "Off Day Setup": ["add", "edit"],
  },
};

// Sample Navigation Data
const data = {
  teams: [
    {
      name: "pilot-project",
      image: schoolLogo,
    },
  ],
  navMain: [
    {
      title: "Students",
      url: "#",
      icon: GraduationCap,
      isActive: true,
      items: [
        { title: "Add student", url: "/student/add-student", permission: "add" },
        { title: "Update student", url: "/student/edit-student", permission: "edit" },
        { title: "All Students", url: "/student/all-students", permission: "view" },
        { title: "Student Details", url: "/student/student-details", permission: "view" },
        { title: "Student Dashboard", url: "/student/student-dashboard", permission: "view" },
      ],
    },
    {
      title: "Teacher",
      url: "#",
      icon: GraduationCap,
      items: [
        { title: "Add Teacher", url: "/teacher/add-teacher", permission: "add" },
        { title: "Edit Teacher", url: "/teacher/edit-teacher", permission: "edit" },
        { title: "All Teachers", url: "/teacher/all-teacher", permission: "view" },
        { title: "Teacher Dashboard", url: "/teacher/teacher-dashboard", permission: "view" },
        { title: "Teacher Details", url: "/teacher/teacher-details", permission: "view" },
      ],
    },
    {
      title: "Staff",
      url: "#",
      icon: GraduationCap,
      items: [
        { title: "Add Staff", url: "/staff/add-staff", permission: "add" },
        { title: "Edit Staff", url: "/staff/edit-staff", permission: "edit" },
        { title: "All Staffs", url: "/staff/all-staff", permission: "view" },
      ],
    },
    {
      title: "Human Resource",
      url: "#",
      icon: Users,
      items: [{ title: "HR Dashboard", url: "/human-resource/hr-dashboard", permission: "view" }],
    },
    {
      title: "Accountant",
      url: "#",
      icon: GraduationCap,
      items: [
        { title: "Add Accountant", url: "/accountant/add-accountant", permission: "add" },
        { title: "Edit Accountant", url: "/accountant/edit-accountant", permission: "edit" },
      ],
    },
    {
      title: "Create Class Routine",
      url: "#",
      icon: GraduationCap,
      items: [
        { title: "Add Class Routine", url: "/create_class_routine", permission: "add" },
        { title: "Edit Class Routine", url: "/edit_class_routine", permission: "edit" },
      ],
    },
    {
      title: "Exam Schedule",
      url: "#",
      icon: GraduationCap,
      items: [
        { title: "Add Exam Schedule", url: "/exam-schedule/add-exam-schedule", permission: "add" },
        { title: "Edit Exam Schedule", url: "/exam-schedule/edit-exam-schedule", permission: "edit" },
      ],
    },
    {
      title: "Off Day Setup",
      url: "#",
      icon: GraduationCap,
      items: [
        { title: "Add Off Day Setup", url: "/off-day-setup/add-off-day", permission: "add" },
        { title: "Edit Off Day Setup", url: "/off-day-setup/edit-off-day", permission: "edit" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Get the user's role from Redux
  const userRole = useSelector((state: RootState) => state.auth.user?.role);

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
  const filteredNavItems = data.navMain
    .filter((section) => roleBasedAccess[role]?.includes(section.title))
    .map((section) => ({
      ...section,
      items: filterItems(section.items, section.title),
    }))
    .filter((section) => section.items.length > 0); // Remove empty sections

  return (
    <Sidebar collapsible="icon" side="left" variant="inset" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="scrollBarThin">
        <NavMain items={filteredNavItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
