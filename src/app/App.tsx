import React, { useState } from "react";
import { Sidebar } from "@/app/components/Sidebar";
import { Header } from "@/app/components/Header";
import { EmployeeDashboard } from "@/app/pages/EmployeeDashboard";
import { Timesheets } from "@/app/pages/Timesheets";
import { PayrollPanel } from "@/app/pages/PayrollPanel";
import { HRAdmin } from "@/app/pages/HRAdmin";
import { Login } from "@/app/pages/Login";
import { SettingsPage } from "@/app/pages/Settings";

type View = "employee" | "manager" | "accountant" | "hr" | "settings";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>("employee");
  const [selectedMonth, setSelectedMonth] = useState("Январь 2026");

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView("employee"); // Reset view on logout
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const getUserInfo = (view: View) => {
    switch (view) {
      case "employee":
        return { name: "Алексей Иванов", role: "Frontend Developer" };
      case "manager":
        return { name: "Сергей Петров", role: "Team Lead" };
      case "accountant":
        return { name: "Ирина Васильевна", role: "Главный бухгалтер" };
      case "hr":
        return { name: "Елена Козлова", role: "HR Manager" };
      case "settings":
        return { name: "Алексей Иванов", role: "Настройки профиля" };
    }
  };

  const { name, role } = getUserInfo(currentView);

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        onLogout={handleLogout}
      />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header 
          userRole={role} 
          userName={name} 
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />
        
        <main className="flex-1 overflow-auto">
          {currentView === "employee" && <EmployeeDashboard selectedMonth={selectedMonth} />}
          {currentView === "manager" && <Timesheets />}
          {currentView === "accountant" && <PayrollPanel selectedMonth={selectedMonth} />}
          {currentView === "hr" && <HRAdmin />}
          {currentView === "settings" && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}
