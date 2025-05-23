
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Settings, Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GrowthChart from "@/components/GrowthChart";
import ActiveOperations from "@/components/ActiveOperations";
import RankingProgress from "@/components/RankingProgress";
import RevenueMetrics from "@/components/RevenueMetrics";
import Layout from "@/components/Layout";
import { getDashboardData } from "@/services/DashboardService";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    balance: 0,
    profitToday: 0,
    profitTotal: 0,
    currentRank: "V1",
    volumeToNextRank: 0,
    qualifiedDirects: 0,
    totalDirects: 0,
    tradeHistory: [],
    openTrades: [],
    isActive: false,
    capitalGrowth: [],
    activeOperations: [],
    rankingProgress: null
  });
  const { toast } = useToast();
  
  // For demo purposes, using a fixed user ID
  // In a real app, this would come from authentication
  const mockUserId = "d290f1ee-6c54-4b01-90e6-d701748f0851";
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const data = await getDashboardData(mockUserId);
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [toast]);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-4">
        <div className="container mx-auto px-6 py-8">
          {/* Saldo e métricas */}
          <Card className="mb-8 bg-black/30 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-gray-400">Saldo Disponível</p>
                  <p className="text-3xl font-bold text-white mt-1">{dashboardData.balance} SOL</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Coluna principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gráfico de crescimento */}
              <GrowthChart />
              
              {/* Operações ativas */}
              <ActiveOperations />
              
              {/* Métricas de faturamento */}
              <RevenueMetrics />
            </div>

            {/* Coluna lateral */}
            <div className="space-y-8">
              {/* Progresso de Ranking */}
              <RankingProgress />
              
              {/* Requisitos de Saldo */}
              <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Requisitos de Saldo</CardTitle>
                  <CardDescription className="text-gray-400">
                    Mantenha seu saldo para continuar ativo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Saldo para Ativação:</span>
                    <span className="text-green-400 font-medium">0.5 SOL</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Saldo de Manutenção:</span>
                    <span className="text-yellow-400 font-medium">0.1 SOL</span>
                  </div>
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg mt-2">
                    <p className="text-green-300 text-sm">
                      {dashboardData.isActive 
                        ? "Sua conta está ativa e funcionando corretamente" 
                        : "Sua conta está inativa. Adicione saldo para ativá-la."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
