import { Role } from "./role";

export const roleBasedAccess: Record<Role, string[]> = {
    admin: ["Students", "Teacher", "Staff", "Human Resource", "Accountant", "Class Routine", "Exam Schedule", "Off Day", "Accounts"],
    teacher: ["Students", "Teacher", "Class Routine", "Exam Schedule"],
    accountant: ["Accountant", "Accounts"],
    student: ["Students", "Exam Schedule", "Off Day", "Class Routine"],
    super_admin: ["Students", "Teacher", "Staff", "Human Resource", "Accountant", "Class Routine", "Exam Schedule", "Off Day", "Admin", "Payroll", "Accounts"],
    staff: ["Staff"], // Staff should only see its own section
  };