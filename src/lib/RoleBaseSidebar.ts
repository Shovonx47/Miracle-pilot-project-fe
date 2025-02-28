export const roleBasedAccess = {
    admin: ["Students", "Teacher", "Staff", "Human Resource", "Accountant", "Create Class Routine", "Exam Schedule", "Off Day Setup"],
    teacher: ["Students", "Teacher", "Create Class Routine", "Exam Schedule"],
    accountant: ["Accountant"],
    hr: ["Human Resource"],
    super_admin: ["Students", "Teacher", "Staff", "Human Resource", "Accountant", "Create Class Routine", "Exam Schedule", "Off Day Setup"],
  };
  