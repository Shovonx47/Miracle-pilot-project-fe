import { Role } from "./role";

export const roleBasedAccess: Record<Role, string[]> = {
    admin: ["Students", "Teacher", "Staff", "Human Resource", "Accountant", "Class Routine", "Exam Schedule", "Off Day", "Accounts"],
    teacher: ["Students", "Teacher", "Class Routine", "Exam Schedule"],
    accountant: ["Accountant", "Accounts"],
    // Update student role to only see Students section
    student: ["Students"],
    super_admin: ["Students", "Teacher", "Staff", "Human Resource", "Accountant", "Class Routine", "Exam Schedule", "Off Day", "Admin", "Payroll", "Accounts"],
    staff: ["Staff"], // Staff should only see its own section
};