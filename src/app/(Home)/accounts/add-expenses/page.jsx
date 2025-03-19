import React from 'react';
import { IoSearchOutline } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import Link from 'next/link';
import PaymentForm from "@/components/Accounts/PaymentForm";

export default function AllStudentsPage() {
  return (
    <div className="p-2 md:p-2 lg:p-7">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-headerText">Accounts</span>
          <span className="text-dataText">Accounts / Income and Expenses</span>
        </div>
      </div>
      
      {/* Payment Form Component */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Add New Expense</h2>
        <PaymentForm />
      </div>
    </div>
  );
}