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
  const [userEmail, setUserEmail] = useState<string>("");

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView("employee"); 
    setUserEmail("");
  };

  const handleLoginSuccess = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const getAllowedViews = (email: string): View[] => {
    if (email.includes("director")) {
        return ["employee", "manager", "accountant", "hr", "settings"];
    }
    if (email.includes("hr")) {
        return ["employee", "hr", "settings"];
    }
    if (email.includes("accountant")) {
        return ["employee", "accountant", "settings"];
    }
    // Default employee
    return ["employee", "settings"];
  };

  const allowedViews = getAllowedViews(userEmail);

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Keeping the existing logic for demo purposes, though in a real app this would come from the user profile
  const getUserInfo = (view: View) => {
    // Override identity based on login if we wanted to, but keeping the "persona" switching for demo feel
    // unless strictly required. 
    // Let's actually make it consistent with the login to avoid confusion.
    
    if (userEmail.includes("director")) return { name: "Виктор Петрович", role: "Генеральный директор" };
    if (userEmail.includes("hr")) return { name: "Елена Козлова", role: "HR Manager" };
    if (userEmail.includes("accountant")) return { name: "Ирина Васильевна", role: "Главный бухгалтер" };
    
    return { name: "Алексей Иванов", role: "Frontend Developer" };
  };

  const { name, role } = getUserInfo(currentView);

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        onLogout={handleLogout}
        allowedViews={allowedViews}
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
