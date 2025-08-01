
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import TopBar from "@/components/layout/topbar";
import OverviewCards from "@/components/dashboard/overview-cards";
import RevenueChart from "@/components/dashboard/revenue-chart";
import RecentActivities from "@/components/dashboard/recent-activities";
import QuickActions from "@/components/dashboard/quick-actions";
import UpcomingEvents from "@/components/dashboard/upcoming-events";
import Calendar from "@/components/dashboard/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Activity,
  Calendar as CalendarIcon,
  BarChart3,
  Clock,
  DollarSign,
  RefreshCw,
  AlertTriangle,
  Bell,
  CheckCircle
} from "lucide-react";

// Tipos para alertas e stats
type AlertType = 'warning' | 'info' | 'success' | 'error';
type Alert = { id: string; type: AlertType; title: string; message: string };
type Stats = {
  totalRevenue: number;
  activeContracts: number;
  revenueGrowth: number;
  pendingTasks: number;
};

  const [timeRange, setTimeRange] = useState('30d');
  const [activeView, setActiveView] = useState('overview');
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showBell, setShowBell] = useState(false);
  const toastShown = useRef(false);
  const { toast } = useToast();

  // Simulação de fetch de dados
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setStats({
        totalRevenue: 120000,
        activeContracts: 42,
        revenueGrowth: 12,
        pendingTasks: 5
      });
      setAlerts([
        { id: '1', type: 'info', title: 'Bem-vindo!', message: 'Confira as novidades do sistema.' },
        { id: '2', type: 'warning', title: 'Prazo próximo!', message: 'Você tem prazos a vencer esta semana.' }
      ]);
      setIsLoading(false);
    }, 1200);
  }, [timeRange]);

  // Exibir toast para alertas info
  useEffect(() => {
    const infoAlert = alerts.find(a => a.type === 'info');
    if (infoAlert && !toastShown.current) {
      toast({
        title: infoAlert.title,
        description: infoAlert.message,
        duration: 4000,
        variant: 'info',
      });
      toastShown.current = true;
      setTimeout(() => {
        setAlerts(prev => prev.filter(a => a.id !== infoAlert.id));
        toastShown.current = false;
      }, 4000);
    }
  }, [alerts, toast]);

  const getAlertIcon = (type: AlertType) => {
    const icons = {
      warning: AlertTriangle,
      info: Bell,
      success: CheckCircle,
      error: AlertTriangle
    };
    return icons[type] || Bell;
  };

  const getAlertColor = (type: AlertType) => {
    const colors = {
      warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
      info: "bg-blue-50 border-blue-200 text-blue-800",
      success: "bg-green-50 border-green-200 text-green-800",
      error: "bg-red-50 border-red-200 text-red-800"
    };
    return colors[type] || colors.info;
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-100 animate-fade-in">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar 
          title="Dashboard Executivo" 
          subtitle="Visão geral do sistema jurídico e indicadores de performance"
          action={
            <div className="flex items-center space-x-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 dias</SelectItem>
                  <SelectItem value="30d">30 dias</SelectItem>
                  <SelectItem value="90d">90 dias</SelectItem>
                  <SelectItem value="1y">1 ano</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Atualizar
              </Button>
            </div>
          }
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Feedback de loading */}
            {isLoading && (
              <div className="flex justify-center items-center py-10">
                <span className="animate-pulse text-lg text-blue-600">Carregando dados do dashboard...</span>
              </div>
            )}
            {/* Alertas e notificações (exceto info) */}
            {alerts.filter(a => a.type !== 'info').length > 0 && (
              <div className="space-y-3">
                {alerts.filter(a => a.type !== 'info').map((alert) => {
                  const AlertIcon = getAlertIcon(alert.type);
                  return (
                    <Card key={alert.id} className={`border shadow-lg transition-transform hover:scale-[1.02] ${getAlertColor(alert.type)}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <AlertIcon className="w-5 h-5 animate-bounce" />
                          <div className="flex-1">
                            <h4 className="font-medium">{alert.title}</h4>
                            <p className="text-sm opacity-90">{alert.message}</p>
                          </div>
                          {alerts.length > 1 && (
                            <Button variant="ghost" size="sm" onClick={() => setAlerts(alerts.filter(a => a.id !== alert.id))}>
                              Dispensar
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
            {/* Cards de overview com efeito */}
            <div className="w-full flex flex-wrap gap-6 justify-between items-stretch">
              <OverviewCards />
            </div>
            {/* Navegação por abas */}
            <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
            <div className="relative">
              <button
                className="absolute -top-12 right-0 flex items-center justify-center w-10 h-10 rounded-full hover:bg-blue-100 transition"
                onClick={() => setShowBell((v) => !v)}
                aria-label="Notificações"
              >
                <Bell className="w-6 h-6 text-blue-600" />
                {alerts.length > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{alerts.length}</span>
                )}
              </button>
              {showBell && (
                <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50 p-4">
                  <h4 className="font-semibold mb-2">Notificações</h4>
                  {alerts.length === 0 && <div className="text-gray-500 text-sm">Nenhuma notificação.</div>}
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-2 mb-2 last:mb-0">
                      <span>{getAlertIcon(alert.type)({ className: "w-4 h-4 mt-1" })}</span>
                      <div>
                        <div className="font-medium text-sm">{alert.title}</div>
                        <div className="text-xs text-gray-600">{alert.message}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <TabsList className="grid w-full grid-cols-4 legal-card shadow-md">
                <TabsTrigger value="overview" className="flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>Visão Geral</span>
                </TabsTrigger>
                <TabsTrigger value="calendar" className="flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Calendário</span>
                </TabsTrigger>
                <TabsTrigger value="financeiro" className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Financeiro</span>
                </TabsTrigger>
                <TabsTrigger value="atividades" className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Atividades</span>
                </TabsTrigger>
              </TabsList>
              {/* Aba Overview */}
              <TabsContent value="overview" className="space-y-6 mt-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-6">
                    <RevenueChart />
                    <QuickActions />
                  </div>
                  <div className="space-y-6">
                    <UpcomingEvents />
                    <RecentActivities />
                  </div>
                </div>
              </TabsContent>
              {/* Aba Calendário */}
              <TabsContent value="calendar" className="mt-6">
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <Calendar />
                  </div>
                  <div className="space-y-6">
                    <UpcomingEvents />
                    <Card className="legal-card shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <span>Estatísticas do Mês</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Audiências</span>
                            <Badge variant="outline">8</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Reuniões</span>
                            <Badge variant="outline">15</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Prazos</span>
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                              6
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Total de Compromissos</span>
                            <Badge className="bg-blue-100 text-blue-800">29</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              {/* Aba Financeiro */}
              <TabsContent value="financeiro" className="mt-6">
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <RevenueChart />
                  </div>
                  <div className="space-y-6">
                    <Card className="legal-card shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          <span>Resumo Financeiro</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Receita Mensal</span>
                            <span className="font-semibold text-green-600">
                              R$ {stats?.totalRevenue ? (stats.totalRevenue / 1000).toFixed(0) : '0'}k
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Contratos Ativos</span>
                            <span className="font-semibold">{stats?.activeContracts || 0}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Crescimento</span>
                            <Badge className="bg-green-100 text-green-800">
                              +{stats?.revenueGrowth || 0}%
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <QuickActions />
                  </div>
                </div>
              </TabsContent>
              {/* Aba Atividades */}
              <TabsContent value="atividades" className="mt-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <RecentActivities />
                  <div className="space-y-6">
                    <UpcomingEvents />
                    <Card className="legal-card shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Activity className="w-5 h-5 text-purple-600" />
                          <span>Produtividade</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Tarefas Concluídas</span>
                            <Badge className="bg-green-100 text-green-800">24</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Em Andamento</span>
                            <Badge className="bg-blue-100 text-blue-800">8</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Pendentes</span>
                            <Badge className="bg-yellow-100 text-yellow-800">
                              {stats?.pendingTasks || 0}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
