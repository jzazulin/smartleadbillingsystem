import React from "react";
import { 
  LayoutDashboard, 
  Calculator, 
  FileSpreadsheet, 
  PieChart, 
  Users, 
  Settings,
  LogOut,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";

type View = "employee" | "manager" | "accountant" | "hr" | "settings";

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  onLogout: () => void;
  allowedViews: View[];
}

export function Sidebar({ currentView, onViewChange, onLogout, allowedViews }: SidebarProps) {
  const navItems = [
    {
      label: "Личный кабинет",
      view: "employee" as View,
      icon: LayoutDashboard,
      role: "Сотрудник"
    },
    {
      label: "Управление табелями",
      view: "manager" as View,
      icon: FileSpreadsheet,
      role: "Руководитель"
    },
    {
      label: "Панель расчетов",
      view: "accountant" as View,
      icon: Calculator,
      role: "Бухгалтер"
    },
    {
      label: "Кадры и данные",
      view: "hr" as View,
      icon: Users,
      role: "HR"
    }
  ];

  const filteredNavItems = navItems.filter(item => allowedViews.includes(item.view));
  const showSettings = allowedViews.includes("settings");

  return (
    <div className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 items-center px-6 border-b border-slate-100">
        <Briefcase className="mr-2 h-6 w-6 text-blue-600" />
        <span className="text-lg font-bold text-slate-900">SmartLead</span>
      </div>
      
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-3">
          {filteredNavItems.map((item) => (
            <button
              key={item.view}
              onClick={() => onViewChange(item.view)}
              className={cn(
                "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                currentView === item.view
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className={cn("mr-3 h-5 w-5 flex-shrink-0", currentView === item.view ? "text-blue-600" : "text-slate-400")} />
              <div className="flex flex-col items-start">
                <span>{item.label}</span>
                {currentView !== item.view && (
                   <span className="text-[10px] text-slate-400 font-normal">{item.role}</span>
                )}
              </div>
            </button>
          ))}
        </nav>

        {showSettings && (
            <div className="mt-8 px-3">
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Система
            </p>
            <nav className="space-y-1">
                <button 
                    onClick={() => onViewChange("settings")}
                    className={cn(
                        "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        currentView === "settings"
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                >
                    <Settings className={cn("mr-3 h-5 w-5 flex-shrink-0", currentView === "settings" ? "text-blue-600" : "text-slate-400")} />
                    Настройки
                </button>
            </nav>
            </div>
        )}
      </div>

      <div className="border-t border-slate-100 p-4">
        <button 
            onClick={onLogout}
            className="flex w-full items-center px-2 py-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Выйти
        </button>
      </div>
    </div>
  );
}
