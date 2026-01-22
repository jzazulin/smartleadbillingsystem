import React, { useState } from "react";
import { 
  Calculator, 
  Settings, 
  History, 
  Lock,
  Unlock,
  Download,
  FileJson,
  FileSpreadsheet,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Skeleton } from "@/app/components/ui/skeleton";

interface EmployeePayroll {
  id: number;
  tabId: string;
  name: string;
  hours: number;
  rate: number;
  basePay: number; // hours * rate
  bonus: number;
  gross: number; // base + bonus
  tax: number; // 13%
  net: number; // gross - tax
  status: "Draft" | "Calculated" | "Approved";
}

const initialData: EmployeePayroll[] = [
  { id: 1, tabId: "0482", name: "Иванов Алексей", hours: 168, rate: 850, basePay: 142800, bonus: 35000, gross: 177800, tax: 23114, net: 154686, status: "Calculated" },
  { id: 2, tabId: "0485", name: "Петрова Мария", hours: 160, rate: 1200, basePay: 192000, bonus: 15000, gross: 207000, tax: 26910, net: 180090, status: "Calculated" },
  { id: 3, tabId: "0491", name: "Сидоров Сергей", hours: 152, rate: 1500, basePay: 228000, bonus: 0, gross: 228000, tax: 29640, net: 198360, status: "Draft" },
  { id: 4, tabId: "0503", name: "Козлова Елена", hours: 168, rate: 750, basePay: 126000, bonus: 5000, gross: 131000, tax: 17030, net: 113970, status: "Calculated" },
];

interface PayrollPanelProps {
  selectedMonth?: string;
}

export function PayrollPanel({ selectedMonth = "Январь 2026" }: PayrollPanelProps) {
  const [calculating, setCalculating] = useState(false);
  const [periodStatus, setPeriodStatus] = useState<"Open" | "Closed">("Open");
  const [data, setData] = useState(initialData);
  const [correctionAmount, setCorrectionAmount] = useState("");
  const [correctionComment, setCorrectionComment] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeePayroll | null>(null);

  const handleCalculate = () => {
    setCalculating(true);
    setTimeout(() => {
      setCalculating(false);
      setData(prev => prev.map(item => ({ ...item, status: "Calculated" })));
    }, 1500);
  };

  const handleClosePeriod = () => {
      setPeriodStatus("Closed");
      setData(prev => prev.map(item => ({ ...item, status: "Approved" })));
  };

  const handleSaveCorrection = () => {
     if(!selectedEmployee) return;
     const amount = parseFloat(correctionAmount) || 0;
     
     setData(prev => prev.map(emp => {
         if(emp.id === selectedEmployee.id) {
             const newBonus = emp.bonus + amount;
             const newGross = emp.basePay + newBonus;
             const newTax = newGross * 0.13;
             return { 
                 ...emp, 
                 bonus: newBonus, 
                 gross: newGross,
                 tax: newTax,
                 net: newGross - newTax
             };
         }
         return emp;
     }));
     setCorrectionAmount("");
     setCorrectionComment("");
     setSelectedEmployee(null);
  };

  const totalGross = data.reduce((acc, item) => acc + item.gross, 0);
  const totalTax = data.reduce((acc, item) => acc + item.tax, 0);
  const totalNet = data.reduce((acc, item) => acc + item.net, 0);

  return (
    <div className="space-y-6 p-6 bg-slate-50/50 min-h-screen">
       {/* Module 3.3: Period Management */}
       <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Расчетный период: {selectedMonth}</h1>
            <Badge variant={periodStatus === "Open" ? "success" : "destructive"} className="ml-2">
                {periodStatus === "Open" ? "Открыт" : "Закрыт"}
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">Доступно для редактирования до 10.02.2026</p>
        </div>
        <div className="flex gap-2">
             {periodStatus === "Open" ? (
                <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50" onClick={handleClosePeriod}>
                    <Lock className="mr-2 h-4 w-4" />
                    Закрыть период
                </Button>
             ) : (
                <Button variant="outline" className="border-slate-200" onClick={() => setPeriodStatus("Open")}>
                    <Unlock className="mr-2 h-4 w-4" />
                    Открыть период
                </Button>
             )}
            
            <Button onClick={handleCalculate} disabled={calculating || periodStatus === "Closed"} className="bg-blue-600 hover:bg-blue-700">
                {calculating ? (
                    <>
                       <span className="animate-spin mr-2">⏳</span> Расчет...
                    </>
                ) : (
                    <>
                        <Calculator className="mr-2 h-4 w-4" />
                        Массовый перерасчет
                    </>
                )}
            </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">ФОТ (Начислено)</CardTitle>
                  <span className="text-xs font-bold text-slate-400">GROSS</span>
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">{totalGross.toLocaleString()} ₽</div>
                  <p className="text-xs text-slate-500">База для налогообложения</p>
              </CardContent>
          </Card>
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">НДФЛ (13%)</CardTitle>
                  <span className="text-xs font-bold text-slate-400">TAX</span>
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold text-red-600">{totalTax.toLocaleString()} ₽</div>
                  <p className="text-xs text-slate-500">К уплате в бюджет</p>
              </CardContent>
          </Card>
          <Card className="border-emerald-200 bg-emerald-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-emerald-900">К выплате на руки</CardTitle>
                  <span className="text-xs font-bold text-emerald-600">NET</span>
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold text-emerald-700">{totalNet.toLocaleString()} ₽</div>
                  <p className="text-xs text-emerald-600/80">Готово к отправке в банк</p>
              </CardContent>
          </Card>
      </div>

      {/* Module 4: Reporting & Export */}
      <div className="flex gap-2 justify-end">
          <Button variant="outline" className="gap-2 text-slate-600">
              <FileSpreadsheet className="h-4 w-4" />
              Сводная ведомость (XLSX)
          </Button>
          <Button variant="outline" className="gap-2 text-slate-600">
              <FileJson className="h-4 w-4" />
              Реестр для банка (CSV)
          </Button>
      </div>

      {/* Module 3: Calculation Table */}
      <Card>
          <CardHeader>
              <CardTitle>Ведомость начислений</CardTitle>
              <CardDescription>Детализация расчета по сотрудникам</CardDescription>
          </CardHeader>
          <CardContent>
              {calculating ? (
                  <div className="space-y-4">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                  </div>
              ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Таб. №</TableHead>
                            <TableHead>ФИО Сотрудника</TableHead>
                            <TableHead className="text-right">Отработано</TableHead>
                            <TableHead className="text-right">Оклад (Rate*Time)</TableHead>
                            <TableHead className="text-right">Премии/Бонусы</TableHead>
                            <TableHead className="text-right">Начислено</TableHead>
                            <TableHead className="text-right text-red-600">НДФЛ</TableHead>
                            <TableHead className="text-right font-bold">На руки</TableHead>
                            <TableHead className="text-center">Статус</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className="font-mono text-xs text-slate-500">{row.tabId}</TableCell>
                                <TableCell className="font-medium text-slate-900">
                                    {row.name}
                                    <div className="text-[10px] text-slate-400">Ставка: {row.rate} ₽/ч</div>
                                </TableCell>
                                <TableCell className="text-right text-slate-600">{row.hours} ч</TableCell>
                                <TableCell className="text-right">{row.basePay.toLocaleString()} ₽</TableCell>
                                <TableCell className="text-right text-emerald-600">+{row.bonus.toLocaleString()} ₽</TableCell>
                                <TableCell className="text-right font-medium">{row.gross.toLocaleString()} ₽</TableCell>
                                <TableCell className="text-right text-red-600">-{row.tax.toLocaleString()} ₽</TableCell>
                                <TableCell className="text-right font-bold bg-slate-50">{row.net.toLocaleString()} ₽</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={row.status === "Approved" ? "success" : row.status === "Calculated" ? "default" : "warning"} className="text-[10px]">
                                        {row.status === "Approved" ? "Утверждено" : row.status === "Calculated" ? "Рассчитано" : "Черновик"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                disabled={periodStatus === "Closed"}
                                                onClick={() => setSelectedEmployee(row)}
                                            >
                                                <Settings className="h-4 w-4 text-slate-400" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Ручная корректировка</DialogTitle>
                                                <DialogDescription>
                                                    {row.name} (Таб. {row.tabId})
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Сумма корректировки (+/-)</label>
                                                    <Input 
                                                        placeholder="Например: 5000" 
                                                        value={correctionAmount}
                                                        onChange={(e) => setCorrectionAmount(e.target.value)}
                                                        type="number"
                                                    />
                                                    <p className="text-xs text-slate-500">Положительное значение увеличит премию, отрицательное - уменьшит.</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Основание</label>
                                                    <Input 
                                                        placeholder="Приказ №..." 
                                                        value={correctionComment}
                                                        onChange={(e) => setCorrectionComment(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit" onClick={handleSaveCorrection}>Применить</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
              )}
          </CardContent>
      </Card>
    </div>
  );
}
