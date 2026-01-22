import React from "react";
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Smartphone,
  Save,
  Mail,
  Moon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import { Switch } from "@/app/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";

export function SettingsPage() {
  return (
    <div className="space-y-6 p-6 bg-slate-50/50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Настройки системы</h1>
          <p className="text-slate-500">Управление профилем, безопасностью и уведомлениями</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Save className="h-4 w-4" />
            Сохранить изменения
        </Button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
          <TabsTrigger value="security">Безопасность</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Личная информация</CardTitle>
              <CardDescription>
                Эти данные отображаются в вашем профиле сотрудника
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                    <div className="h-20 w-20 rounded-full bg-slate-200 border-2 border-slate-100 flex items-center justify-center text-3xl font-bold text-slate-400">
                        АИ
                    </div>
                    <Button variant="outline" size="sm">Изменить фото</Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">ФИО</Label>
                        <Input id="name" defaultValue="Иванов Алексей Петрович" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="title">Должность</Label>
                        <Input id="title" defaultValue="Frontend Developer" disabled className="bg-slate-50" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Корпоративная почта</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input id="email" defaultValue="a.ivanov@smartlead.corp" className="pl-9" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Телефон</Label>
                        <div className="relative">
                            <Smartphone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input id="phone" defaultValue="+7 (999) 000-00-00" className="pl-9" />
                        </div>
                    </div>
                </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Настройка уведомлений</CardTitle>
              <CardDescription>
                Выберите, как и когда вы хотите получать оповещения
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                        <Label className="text-base">Email уведомления</Label>
                        <p className="text-sm text-slate-500">
                            Получать расчетный листок на почту
                        </p>
                    </div>
                    <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                        <Label className="text-base">Push-уведомления</Label>
                        <p className="text-sm text-slate-500">
                            Оповещения о поступлении зарплаты
                        </p>
                    </div>
                    <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                        <Label className="text-base">Системные новости</Label>
                        <p className="text-sm text-slate-500">
                            Информация об обновлениях системы и регламентах
                        </p>
                    </div>
                    <Switch />
                </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Безопасность аккаунта</CardTitle>
              <CardDescription>
                Управление паролем и активными сессиями
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="current-password">Текущий пароль</Label>
                    <Input id="current-password" type="password" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="new-password">Новый пароль</Label>
                        <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Подтверждение</Label>
                        <Input id="confirm-password" type="password" />
                    </div>
                </div>
                <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                    Сменить пароль
                </Button>
                
                <div className="border-t border-slate-100 pt-4 mt-4">
                    <h3 className="text-sm font-medium mb-3">Активные сессии</h3>
                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="flex items-center gap-3">
                            <Globe className="h-5 w-5 text-slate-400" />
                            <div>
                                <p className="text-sm font-medium">Chrome on MacOS</p>
                                <p className="text-xs text-slate-500">Москва, Россия • Текущая сессия</p>
                            </div>
                        </div>
                        <Badge variant="success" className="text-[10px]">Online</Badge>
                    </div>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
