import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { 
  FileSpreadsheet, 
  UploadCloud, 
  AlertTriangle, 
  CheckCircle2, 
  FileDown, 
  X,
  FileWarning,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { cn } from "@/lib/utils";

export function Timesheets() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "validating" | "error" | "success">("idle");
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setUploadStatus("uploading");
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
        setProgress(prev => {
            if (prev >= 100) {
                clearInterval(interval);
                setUploadStatus("validating");
                // Simulate validation delay
                setTimeout(() => {
                    setUploadStatus("error"); // Demo error state as requested
                }, 1000);
                return 100;
            }
            return prev + 10;
        });
    }, 200);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    'application/vnd.ms-excel': ['.xls']
  }, maxFiles: 1 });

  const validationErrors = [
    { row: 12, col: "E", code: "ERR-001", message: "Сотрудник Иванов И.И.: Превышен суточный лимит 24ч (значение: 25)" },
    { row: 45, col: "B", code: "ERR-002", message: "Сотрудник Петров С.В.: Неверный формат табельного номера" },
    { row: 48, col: "H", code: "WARN-001", message: "Сотрудник Сидоров А.А.: Работа в выходной день без приказа", type: "warning" },
  ];

  return (
    <div className="space-y-6 p-6 bg-slate-50/50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Управление табелями</h1>
          <p className="text-slate-500">Загрузка и проверка данных об отработанном времени</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="gap-2 text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100">
                <FileDown className="h-4 w-4" />
                Скачать шаблон табеля (XLSX)
            </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Upload Zone */}
        <div className="md:col-span-2 space-y-6">
            <Card className={cn(
                "border-dashed border-2 transition-colors cursor-pointer",
                isDragActive ? "border-blue-500 bg-blue-50" : "border-slate-300 bg-slate-50 hover:bg-slate-100"
            )}>
                <div {...getRootProps()} className="p-12 flex flex-col items-center justify-center text-center">
                    <input {...getInputProps()} />
                    <div className={cn(
                        "h-16 w-16 rounded-full flex items-center justify-center mb-4 transition-colors",
                        isDragActive ? "bg-blue-200 text-blue-700" : "bg-blue-100 text-blue-600"
                    )}>
                        <UploadCloud className="h-8 w-8" />
                    </div>
                    {isDragActive ? (
                        <p className="text-lg font-medium text-blue-600">Отпустите файл для загрузки...</p>
                    ) : (
                        <>
                        <p className="text-lg font-medium text-slate-700">Перетащите файл табеля сюда</p>
                        <p className="text-sm text-slate-500 mt-2">Поддерживаются форматы .XLSX, .XLS</p>
                        </>
                    )}
                </div>
            </Card>

            {/* Current File Status */}
            {files.length > 0 && (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex justify-between items-center">
                            <span>Обработка файла</span>
                            <span className="text-xs font-normal text-slate-500 uppercase tracking-wider">
                                {uploadStatus === "uploading" && "Загрузка..."}
                                {uploadStatus === "validating" && "Валидация данных..."}
                                {uploadStatus === "error" && "Ошибка проверки"}
                                {uploadStatus === "success" && "Готово"}
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 mb-4">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded bg-green-100 flex items-center justify-center">
                                    <FileSpreadsheet className="h-5 w-5 text-green-700" />
                                </div>
                                <div>
                                    <p className="font-medium text-sm text-slate-900">{files[0].name}</p>
                                    <p className="text-xs text-slate-500">{(files[0].size / 1024).toFixed(1)} KB • Загружен пользователем</p>
                                </div>
                            </div>
                            {uploadStatus !== "uploading" && uploadStatus !== "validating" && (
                                <Button variant="ghost" size="icon" onClick={() => { setFiles([]); setUploadStatus("idle"); }}>
                                    <X className="h-4 w-4 text-slate-400 hover:text-red-500" />
                                </Button>
                            )}
                        </div>

                        {(uploadStatus === "uploading" || uploadStatus === "validating") && (
                            <div className="space-y-2">
                                <Progress value={progress} className="h-2" />
                                <p className="text-xs text-center text-slate-500">
                                    {uploadStatus === "uploading" ? "Передача данных на сервер..." : "Проверка бизнес-правил и форматов..."}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>

        {/* Validation Protocol Sidebar */}
        <div className="md:col-span-1">
           {uploadStatus === "idle" && (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-400 text-center text-sm">
                    <FileWarning className="h-10 w-10 mb-3 opacity-20" />
                    <p>Протокол валидации будет отображен здесь после загрузки файла</p>
                </div>
           )}
           
           {(uploadStatus === "uploading" || uploadStatus === "validating") && (
               <Card className="h-full flex items-center justify-center">
                   <div className="flex flex-col items-center gap-2">
                       <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                       <p className="text-sm text-slate-500">Анализ структуры...</p>
                   </div>
               </Card>
           )}

           {uploadStatus === "error" && (
               <Card className="border-red-200 bg-red-50/50 h-full flex flex-col">
                   <CardHeader className="pb-3 border-b border-red-100 bg-red-50 rounded-t-lg">
                       <div className="flex items-center gap-2 text-red-700">
                           <AlertTriangle className="h-5 w-5" />
                           <CardTitle className="text-base">Протокол ошибок</CardTitle>
                       </div>
                       <CardDescription className="text-red-600/80">Найдены критические ошибки (2)</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-3 pt-4 flex-1 overflow-auto max-h-[500px]">
                       {validationErrors.map((err, idx) => (
                           <div key={idx} className={cn(
                               "p-3 rounded-md border shadow-sm text-sm",
                               err.type === "warning" ? "bg-amber-50 border-amber-200" : "bg-white border-red-100"
                           )}>
                               <div className="flex justify-between items-start mb-1">
                                    <Badge variant={err.type === "warning" ? "warning" : "destructive"} className="px-1.5 py-0 text-[10px]">
                                        {err.code}
                                    </Badge>
                                    <span className="text-xs text-slate-400 font-mono">R{err.row}:C{err.col}</span>
                               </div>
                               <p className="text-slate-700 mt-1 leading-snug">{err.message}</p>
                           </div>
                       ))}
                   </CardContent>
                   <div className="p-4 border-t border-red-100 bg-red-50 rounded-b-lg mt-auto">
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white shadow-sm">
                           Скачать отчет об ошибках
                        </Button>
                        <Button variant="ghost" className="w-full mt-2 text-red-700 hover:bg-red-100 hover:text-red-800" onClick={() => { setFiles([]); setUploadStatus("idle"); }}>
                            Загрузить исправленный файл
                        </Button>
                   </div>
               </Card>
           )}

           {uploadStatus === "success" && (
               <Card className="border-emerald-200 bg-emerald-50 h-full">
                    <CardHeader className="border-b border-emerald-100 bg-emerald-50 rounded-t-lg">
                        <div className="flex items-center gap-2 text-emerald-700">
                           <CheckCircle2 className="h-5 w-5" />
                           <CardTitle>Проверка пройдена</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Всего записей:</span>
                                <span className="font-medium">142</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Общее время:</span>
                                <span className="font-medium">23,856 ч</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Департамент:</span>
                                <span className="font-medium">IT Dept.</span>
                            </div>
                        </div>
                        
                        <div className="mt-8 space-y-3">
                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-sm">
                                Импортировать данные
                            </Button>
                            <Button variant="outline" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-100">
                                Предпросмотр
                            </Button>
                        </div>
                    </CardContent>
               </Card>
           )}
        </div>
      </div>
    </div>
  );
}
