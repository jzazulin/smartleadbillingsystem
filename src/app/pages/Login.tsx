import React, { useState } from "react";
import { 
  Lock, 
  User, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { cn } from "@/lib/utils";

interface LoginProps {
  onLoginSuccess: (email: string) => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "employee@smartlead.corp",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate API request
    setTimeout(() => {
      // Negative Scenario Logic: Trigger error if password is "error"
      if (formData.password === "error") {
        setError("Неверный логин или пароль. Повторите попытку.");
        setIsLoading(false);
      } else {
        // Positive Scenario
        setSuccess(true);
        setTimeout(() => {
          onLoginSuccess(formData.email);
        }, 800);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl" />
      </div>

      <Card className={cn(
        "w-full max-w-md shadow-xl border-slate-200 bg-white relative transition-all duration-500",
        success ? "scale-95 opacity-0" : "scale-100 opacity-100"
      )}>
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-600/20">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            SmartLead ERP
          </CardTitle>
          <CardDescription className="text-slate-500">
            Вход в корпоративную систему
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message - Negative Scenario */}
            {error && (
              <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2 border-red-200 bg-red-50 text-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Корпоративная почта</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@company.com" 
                  className={cn("pl-9", error && "border-red-300 focus-visible:ring-red-200")}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Пароль</Label>
                <a href="#" className="text-xs text-blue-600 hover:text-blue-500 font-medium">
                  Забыли пароль?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  className={cn("pl-9 pr-9", error && "border-red-300 focus-visible:ring-red-200")}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••"
                  required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className={cn(
                "w-full mt-6 bg-blue-700 hover:bg-blue-800 transition-all", 
                success && "bg-emerald-600 hover:bg-emerald-700"
              )}
              disabled={isLoading || success}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Авторизация...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Успешно
                </>
              ) : (
                <>
                  Войти в систему
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
            <div className="space-y-2">
                <p>Для демонстрации ошибки введите пароль: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-mono text-xs">error</code></p>
                <div className="text-xs text-left bg-slate-50 p-3 rounded border border-slate-100 space-y-1">
                    <p className="font-semibold text-slate-700">Тестовые аккаунты:</p>
                    <p>👨‍💼 <code className="text-blue-600">employee@smartlead.corp</code> (Сотрудник)</p>
                    <p>👔 <code className="text-blue-600">director@smartlead.corp</code> (Директор)</p>
                    <p>👥 <code className="text-blue-600">hr@smartlead.corp</code> (HR)</p>
                    <p>💰 <code className="text-blue-600">accountant@smartlead.corp</code> (Бухгалтер)</p>
                </div>
            </div>
            <p className="text-xs text-slate-400">
                &copy; 2026 SmartLead Corp. System v2.4
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
