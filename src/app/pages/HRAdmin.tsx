import React, { useState } from "react";
import { 
  Search, 
  UserPlus, 
  Upload, 
  Filter,
  FilePenLine,
  Trash2,
  Calendar as CalendarIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";

const employees = [
  { id: 1, tabId: "0482", name: "Иванов Алексей", dept: "Разработка", position: "Frontend Developer", rate: "850", hireDate: "12.03.2023", status: "Active" },
  { id: 2, tabId: "0485", name: "Петрова Мария", dept: "Маркетинг", position: "Head of Marketing", rate: "1200", hireDate: "01.06.2022", status: "Active" },
  { id: 3, tabId: "0491", name: "Сидоров Сергей", dept: "Разработка", position: "Team Lead", rate: "1500", hireDate: "15.01.2021", status: "Vacation" },
  { id: 4, tabId: "0503", name: "Козлова Елена", dept: "HR", position: "HR Manager", rate: "750", hireDate: "10.09.2024", status: "Active" },
  { id: 5, tabId: "0511", name: "Новиков Дмитрий", dept: "Продажи", position: "Sales Manager", rate: "600", hireDate: "20.11.2024", status: "Active" },
];

export function HRAdmin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editEmployee, setEditEmployee] = useState<any>(null);

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.tabId.includes(searchTerm)
  );

  return (
    <div className="space-y-6 p-6 bg-slate-50/50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Штатное расписание</h1>
          <p className="text-slate-500">Управление карточками сотрудников и тарификацией</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                Импорт реестра (CSV)
            </Button>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <UserPlus className="h-4 w-4" />
                Создать карточку
            </Button>
        </div>
      </div>

      <Card className="shadow-sm">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-white rounded-t-lg">
             <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input 
                    placeholder="Поиск по ФИО, должности или таб. номеру..." 
                    className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <Button variant="outline" size="icon" className="border-slate-200">
                 <Filter className="h-4 w-4 text-slate-500" />
             </Button>
        </div>
        <CardContent className="p-0">
            <Table>
                <TableHeader className="bg-slate-50">
                    <TableRow>
                        <TableHead className="w-[100px]">Таб. №</TableHead>
                        <TableHead>ФИО Сотрудника</TableHead>
                        <TableHead>Должность</TableHead>
                        <TableHead>Подразделение</TableHead>
                        <TableHead className="text-right">Тариф (₽/ч)</TableHead>
                        <TableHead>Дата приема</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredEmployees.map((emp) => (
                        <TableRow key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                            <TableCell className="font-mono text-slate-500 text-xs">{emp.tabId}</TableCell>
                            <TableCell className="font-medium text-slate-900">{emp.name}</TableCell>
                            <TableCell className="text-slate-600">{emp.position}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className="font-normal text-slate-500 bg-slate-50">
                                    {emp.dept}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right font-medium">{emp.rate} ₽</TableCell>
                            <TableCell className="text-sm text-slate-500">{emp.hireDate}</TableCell>
                            <TableCell>
                                <Badge variant={emp.status === "Active" ? "success" : "warning"} className="text-[10px] px-2 py-0.5">
                                    {emp.status === "Active" ? "Активен" : "Отпуск"}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="icon" onClick={() => setEditEmployee(emp)} className="h-8 w-8">
                                            <FilePenLine className="h-4 w-4 text-slate-400 hover:text-blue-600" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl">
                                        <DialogHeader>
                                            <DialogTitle className="text-xl">Карточка сотрудника</DialogTitle>
                                            <DialogDescription>Редактирование учетных данных и параметров расчета</DialogDescription>
                                        </DialogHeader>
                                        
                                        <div className="grid grid-cols-12 gap-6 py-4">
                                            {/* Avatar Placeholder */}
                                            <div className="col-span-3 flex flex-col items-center gap-3">
                                                <div className="h-32 w-32 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-4xl font-bold text-slate-300">
                                                    {emp.name.charAt(0)}
                                                </div>
                                                <Button variant="outline" size="sm" className="w-full text-xs">Загрузить фото</Button>
                                            </div>

                                            {/* Form Fields */}
                                            <div className="col-span-9 grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Фамилия Имя Отчество</label>
                                                    <Input defaultValue={emp.name} className="bg-slate-50" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Табельный номер</label>
                                                    <Input defaultValue={emp.tabId} className="font-mono" />
                                                </div>
                                                
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Должность</label>
                                                    <Input defaultValue={emp.position} />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Подразделение</label>
                                                    <Input defaultValue={emp.dept} />
                                                </div>

                                                <div className="col-span-2 h-px bg-slate-200 my-2" />

                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Часовая тарифная ставка (₽)</label>
                                                    <Input defaultValue={emp.rate} type="number" className="font-medium" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Дата приема</label>
                                                    <div className="relative">
                                                        <Input defaultValue={emp.hireDate} />
                                                        <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Дата увольнения</label>
                                                    <div className="relative">
                                                        <Input placeholder="—" />
                                                        <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Статус</label>
                                                    <select className="flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50">
                                                        <option>Работает</option>
                                                        <option>В отпуске</option>
                                                        <option>Больничный</option>
                                                        <option>Уволен</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <DialogFooter className="flex justify-between sm:justify-between">
                                            <Button variant="ghost" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Архивировать сотрудника
                                            </Button>
                                            <div className="flex gap-2">
                                                <Button variant="outline">Отмена</Button>
                                                <Button className="bg-blue-600 hover:bg-blue-700">Сохранить изменения</Button>
                                            </div>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
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
