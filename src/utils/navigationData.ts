import schoolLogo from "@/assets/school logo.png";
import { GraduationCap, Users } from "lucide-react";
// Sample Navigation Data
export const navigationData = {
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
          { title: "Attendance", url: "/student/attendance", permission: "view" },
        ],
      },
      {
        title: "Teacher",
        url: "#",
        icon: GraduationCap,
        items: [
          { title: "Add Teacher", url: "/teacher/add-teacher", permission: "add" },
          { title: "Edit Teacher", url: "/teacher/edit-teacher", permission: "edit" },
          { title: "All Teachers", url: "/teacher/all-teachers", permission: "view" },
          { title: "Teacher Dashboard", url: "/teacher/teacher-dashboard", permission: "view" },
          { title: "Teacher Details", url: "/teacher/teacher-details", permission: "view" },
          { title: "Attendance", url: "/teacher/attendance", permission: "view" },
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
          { title: "Attendance", url: "/staff/attendance", permission: "view" },
        ],
      },
      {
        title: "Accounts",
        url: "#",
        icon: Users,
        items: [
          { 
            title: "Income and Expenses", 
            url: "/accounts/income-and-expense", 
            permission: "view" 
          },
          { 
            title: "Add Expenses", 
            url: "/accounts/add-expenses", 
            permission: "view" 
          },
          { 
            title: "Add Categories", 
            url: "/accounts/add-categories", 
            permission: "add" 
          },
          { 
            title: "Report", 
            url: "/accounts/accounts-report", 
            permission: "view" 
          }
        ],
        
      },
      {
        title: "Human Resource",
        url: "#",
        icon: Users,
        items: [
          { 
            title: "HR Dashboard", 
            url: "/human-resource/hr-dashboard", 
            permission: "view" 
          }
        ],
      },
      {
        title: "Accountant",
        url: "#",
        icon: GraduationCap,
        items: [
          { title: "Add Accountant", url: "/accountant/add-accountant", permission: "add" },
          { title: "Edit Accountant", url: "/accountant/edit-accountant", permission: "edit" },
          { title: "Attendance", url: "/accountant/attendance", permission: "view" },
        ],
      },
      {
        title: "Class Routine",
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
        title: "Off Day",
        url: "#",
        icon: GraduationCap,
        items: [
          { title: "Add Off Day Setup", url: "/off-day-setup/add-off-day", permission: "add" },
          { title: "Edit Off Day Setup", url: "/off-day-setup/edit-off-day", permission: "edit" },
        ],
      },
      {
        title: "Admin",
        url: "#",
        icon: GraduationCap,
        items: [
          {
            title: "Class Routine",
            url: "/admin/class-routine",
          },
          {
            title: "Class Timings",
            url: "/admin/class-timings",
          },
        ],
      },
      {
        title: "Payroll",
        url: "#",
        icon: GraduationCap,
        items: [
          {
            title: "Employee Payroll",
            url: "/payroll/employee-payroll",
          },
        ],
      },
    ],
  };