
import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import TopBar from "@/components/layout/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, Bell, Moon, Sun, Globe, Zap, Database, User } from "lucide-react";

export default function Settings() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("pt-BR");
  const [notifications, setNotifications] = useState(true);
  const [integrations, setIntegrations] = useState({
    googleCalendar: false,
    dropbox: false,
    whatsapp: false,
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar 
          title="Configurações do Sistema" 
          subtitle="Personalize sua experiência e integrações"
          action={null}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="legal-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <SettingsIcon className="w-5 h-5 text-blue-600" />
                  <span>Preferências Gerais</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Tema</Label>
                  </div>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light"><Sun className="w-4 h-4 mr-2" />Claro</SelectItem>
                      <SelectItem value="dark"><Moon className="w-4 h-4 mr-2" />Escuro</SelectItem>
                      <SelectItem value="auto"><Zap className="w-4 h-4 mr-2" />Automático</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Idioma</Label>
                  </div>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR"><Globe className="w-4 h-4 mr-2" />Português (Brasil)</SelectItem>
                      <SelectItem value="en-US"><Globe className="w-4 h-4 mr-2" />English (US)</SelectItem>
                      <SelectItem value="es-ES"><Globe className="w-4 h-4 mr-2" />Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notificações</Label>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
              </CardContent>
            </Card>

            <Card className="legal-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-green-600" />
                  <span>Integrações</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Google Calendar</Label>
                  </div>
                  <Switch checked={integrations.googleCalendar} onCheckedChange={checked => setIntegrations(i => ({ ...i, googleCalendar: checked }))} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Dropbox</Label>
                  </div>
                  <Switch checked={integrations.dropbox} onCheckedChange={checked => setIntegrations(i => ({ ...i, dropbox: checked }))} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>WhatsApp</Label>
                  </div>
                  <Switch checked={integrations.whatsapp} onCheckedChange={checked => setIntegrations(i => ({ ...i, whatsapp: checked }))} />
                </div>
              </CardContent>
            </Card>

            <Card className="legal-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-purple-600" />
                  <span>Conta</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button variant="outline" className="w-full">Alterar Senha</Button>
                <Button variant="destructive" className="w-full">Excluir Conta</Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
