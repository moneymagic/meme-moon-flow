
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Settings, Wallet } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import GrowthChart from "@/components/GrowthChart";
import ActiveOperations from "@/components/ActiveOperations";
import RankingProgress from "@/components/RankingProgress";
import RevenueMetrics from "@/components/RevenueMetrics";

const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(false);
  
  const userInfo = {
    balance: 3.85,
    rank: "V2",
    walletAddress: "7x8s...9mF2"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">MemeFlow</h1>
            </div>
            <div className="flex items-center space-x-4">
              {!isConnected ? (
                <Button 
                  onClick={() => setIsConnected(true)}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Conectar Carteira
                </Button>
              ) : (
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="border-green-500 text-green-400">
                    {userInfo.rank}
                  </Badge>
                  <span className="text-gray-300">{userInfo.walletAddress}</span>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Saldo e métricas */}
        <Card className="mb-8 bg-black/30 border-white/10 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-gray-400">Saldo Disponível</p>
                <p className="text-3xl font-bold text-white mt-1">{userInfo.balance} SOL</p>
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
                    Sua conta está ativa e funcionando corretamente
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
