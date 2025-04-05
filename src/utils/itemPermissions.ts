import { Role } from "./role";

// Item-Level Access Control
export const itemPermissions: Record<Role, { [key: string]: string[] }> = {
  admin: {
    Staff: ["add", "edit", "view"],
    Students: ["add", "edit", "view"],
    "Exam Schedule": ["add", "edit"],
    "Accounts": ["view"],
    "Human Resource": ["view"],
  },
  staff: {
    Staff: ["add", "view"], // Staff can add and view, but NOT edit
  },
  teacher: {
    Students: ["view"],
    Teacher: ["view"],
    "Class Routine": ["view", "add", "edit"],
    "Exam Schedule": ["view", "add", "edit"]
  },
  accountant: {
    "Accounts": ["view"],
  },
  student: {
    Students: ["view"] // Students can only view their own information
  },
  super_admin: {
    Staff: ["add", "edit", "view"],
    Students: ["add", "edit", "view"],
    Teacher: ["add", "edit", "view"],
    "Exam Schedule": ["add", "edit"],
    "Human Resource": ["view"],
    Accountant: ["add", "edit", "view"],
    "Class Routine": ["add", "edit"],
    "Off Day": ["add", "edit"],
    Payroll: ["add", "edit"],
    Admin: ["add", "edit"],
    "Accounts": ["view"],
  },
};