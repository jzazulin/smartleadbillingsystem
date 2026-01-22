import React from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface HeaderProps {
  userRole: string;
  userName: string;
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export function Header({ userRole, userName, selectedMonth, onMonthChange }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-4 w-1/3">
        <Select value={selectedMonth} onValueChange={onMonthChange}>
          <SelectTrigger className="w-[180px] bg-slate-50 border-slate-200">
            <SelectValue placeholder="Выберите месяц" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Январь 2026">Январь 2026</SelectItem>
            <SelectItem value="Декабрь 2025">Декабрь 2025</SelectItem>
            <SelectItem value="Ноябрь 2025">Ноябрь 2025</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button variant="ghost" size="icon" className="relative text-slate-500">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </Button>
        
        <div className="h-8 w-px bg-slate-200 mx-2" />

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-slate-900">{userName}</span>
            <span className="text-xs text-slate-500">{userRole}</span>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border-2 border-white shadow-sm ring-1 ring-slate-100">
            {userName.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
}
