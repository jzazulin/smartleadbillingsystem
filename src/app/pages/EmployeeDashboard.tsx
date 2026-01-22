import React from "react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
} from "recharts";
import { Download, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";

interface EmployeeDashboardProps {
  selectedMonth?: string;
}

const MOCK_DATA_BY_MONTH: Record<string, {
  chart: { name: string; value: number; color: string }[];
  details: { id: number; type: string; amount: number; tax: number; net: number; isDeduction?: boolean }[];
  totalNet: number;
  paymentDate: string;
  trend: string;
}> = {
  "Январь 2026": {
    chart: [
      { name: "Оклад", value: 85000, color: "#2563eb" },
      { name: "KPI Премия", value: 35000, color: "#10b981" },
      { name: "Надбавки", value: 12500, color: "#f59e0b" },
    ],
    details: [
      { id: 1, type: "Оклад (168ч)", amount: 85000.00, tax: 11050.00, net: 73950.00 },
      { id: 2, type: "Ежемесячная премия", amount: 35000.00, tax: 4550.00, net: 30450.00 },
      { id: 3, type: "Компенсация питания", amount: 12500.00, tax: 0.00, net: 12500.00 },
      { id: 4, type: "Удержание НДФЛ (13%)", amount: -15600.00, tax: 0, net: 0, isDeduction: true },
    ],
    totalNet: 116900.00,
    paymentDate: "10.02.2026",
    trend: "+12% к прошлому месяцу"
  },
  "Декабрь 2025": {
    chart: [
      { name: "Оклад", value: 85000, color: "#2563eb" },
      { name: "KPI Премия", value: 45000, color: "#10b981" },
      { name: "Годовой бонус", value: 50000, color: "#8b5cf6" },
    ],
    details: [
      { id: 1, type: "Оклад (176ч)", amount: 85000.00, tax: 11050.00, net: 73950.00 },
      { id: 2, type: "Ежемесячная премия", amount: 45000.00, tax: 5850.00, net: 39150.00 },
      { id: 3, type: "Годовой бонус", amount: 50000.00, tax: 6500.00, net: 43500.00 },
      { id: 4, type: "Удержание НДФЛ (13%)", amount: -23400.00, tax: 0, net: 0, isDeduction: true },
    ],
    totalNet: 156600.00,
    paymentDate: "10.01.2026",
    trend: "+25% к прошлому месяцу"
  },
  "Ноябрь 2025": {
    chart: [
      { name: "Оклад", value: 85000, color: "#2563eb" },
      { name: "KPI Премия", value: 30000, color: "#10b981" },
    ],
    details: [
      { id: 1, type: "Оклад (160ч)", amount: 85000.00, tax: 11050.00, net: 73950.00 },
      { id: 2, type: "Ежемесячная премия", amount: 30000.00, tax: 3900.00, net: 26100.00 },
      { id: 3, type: "Удержание НДФЛ (13%)", amount: -14950.00, tax: 0, net: 0, isDeduction: true },
    ],
    totalNet: 100050.00,
    paymentDate: "10.12.2025",
    trend: "-5% к прошлому месяцу"
  }
};

export function EmployeeDashboard({ selectedMonth = "Январь 2026" }: EmployeeDashboardProps) {
  const currentData = MOCK_DATA_BY_MONTH[selectedMonth] || MOCK_DATA_BY_MONTH["Январь 2026"];
  const { chart, details, totalNet, paymentDate, trend } = currentData;

  return (
    <div className="space-y-6 p-6 bg-slate-50/50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Мои расчеты</h1>
          <p className="text-slate-500">Обзор начислений за {selectedMonth}</p>
        </div>
        <div className="flex gap-2">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4" />
            Скачать квиток (PDF)
            </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main "To Pay" Widget */}
        <Card className="md:col-span-1 border-l-4 border-l-emerald-500 shadow-md">
          <CardHeader className="pb-2">
            <CardDescription>Итого к выплате</CardDescription>
            <CardTitle className="text-4xl font-bold text-slate-900">
              {totalNet.toLocaleString('ru-RU')} ₽
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="success" className="px-2 py-1 text-sm">
                Рассчитано
              </Badge>
              <span className="text-sm text-slate-500">Выплата: {paymentDate}</span>
            </div>
            <div className="mt-6 text-sm text-slate-500 flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span>{trend}</span>
            </div>
          </CardContent>
        </Card>

        {/* Chart */}
        <Card className="md:col-span-2 shadow-md">
            <CardHeader>
                <CardTitle>Структура дохода</CardTitle>
            </CardHeader>
          <CardContent className="flex items-center justify-between">
             <div className="h-[200px] w-[300px] shrink-0 min-w-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={chart}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    >
                    {chart.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    </Pie>
                    <Tooltip 
                        formatter={(value) => `${value.toLocaleString()} ₽`}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                </PieChart>
                </ResponsiveContainer>
             </div>
             <div className="flex-1 pl-8 space-y-4">
                {chart.map((item) => (
                    <div key={item.name} className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-sm font-medium text-slate-700">{item.name}</span>
                        </div>
                        <span className="font-bold text-slate-900">{item.value.toLocaleString()} ₽</span>
                    </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Details Table */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Детализация начислений</CardTitle>
          <CardDescription>Расчетный лист № {selectedMonth}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Вид начисления / Удержания</TableHead>
                <TableHead className="text-right">Начислено</TableHead>
                <TableHead className="text-right">НДФЛ / Удержано</TableHead>
                <TableHead className="text-right">На руки</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {details.map((item) => (
                <TableRow key={item.id} className={item.isDeduction ? "bg-red-50/30" : ""}>
                  <TableCell className="font-medium text-slate-700">{item.type}</TableCell>
                  <TableCell className="text-right">
                    {item.isDeduction ? "" : `${item.amount.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽`}
                  </TableCell>
                  <TableCell className="text-right text-slate-500">
                    {item.isDeduction 
                        ? `${Math.abs(item.amount).toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽` 
                        : `${item.tax.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽`
                    }
                  </TableCell>
                  <TableCell className="text-right font-bold text-slate-900">
                    {item.net > 0 ? `${item.net.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽` : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
