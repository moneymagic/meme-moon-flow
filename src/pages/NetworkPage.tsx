
import React, { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, DollarSign } from 'lucide-react';
import TabComponents from '@/components/network/TabComponents';

const NetworkPage = () => {
  const { walletAddress, isConnected } = useWallet();
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  const stats = {
    totalMembers: 156,
    totalVolume: 45678.90,
    directReferrals: 12,
    totalCommissions: 2345.67,
    monthlyCommissions: 567.89,
    activeMembers: 89
  };

  const downlineStats = {
    totalMembers: 156,
    activeMembers: 89,
    inactiveMembers: 67,
    directDownlines: 12,
    currentDownlines: 144,
    currentDirect: 12
  };

  const teamMembers = [
    {
      id: "1",
      username: "trader_pro",
      joinDate: "2024-01-15",
      teamSize: 23,
      rank: 3
    },
    {
      id: "2", 
      username: "crypto_master",
      joinDate: "2024-02-01",
      teamSize: 45,
      rank: 5
    },
    {
      id: "3",
      username: "sol_investor", 
      joinDate: "2024-02-15",
      teamSize: 12,
      rank: 2
    }
  ];

  const [activeTab, setActiveTab] = useState("downline");

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Conectar Carteira</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-300 mb-4">
              Conecte sua carteira para acessar suas informações de rede
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Carregando dados da rede...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Minha Rede</h1>
          <p className="text-gray-300">Gerencie e visualize sua rede de afiliados</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total de Membros</p>
                  <p className="text-2xl font-bold text-white">{stats.totalMembers}</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Volume Total</p>
                  <p className="text-2xl font-bold text-white">{stats.totalVolume.toLocaleString()} SOL</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Comissões Totais</p>
                  <p className="text-2xl font-bold text-white">{stats.totalCommissions.toLocaleString()} SOL</p>
                </div>
                <DollarSign className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-6 w-6" />
              Análise da Rede
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-black/30">
                <TabsTrigger 
                  value="downline" 
                  className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Downline
                </TabsTrigger>
                <TabsTrigger 
                  value="trading" 
                  className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Trading
                </TabsTrigger>
                <TabsTrigger 
                  value="commissions" 
                  className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Comissões
                </TabsTrigger>
              </TabsList>

              <TabsContent value="downline" className="mt-6">
                <TabComponents
                  activeTab={activeTab}
                  stats={stats}
                  downlineStats={downlineStats}
                  teamMembers={teamMembers}
                />
              </TabsContent>

              <TabsContent value="trading" className="mt-6">
                <TabComponents
                  activeTab={activeTab}
                  stats={stats}
                  downlineStats={downlineStats}
                  teamMembers={teamMembers}
                />
              </TabsContent>

              <TabsContent value="commissions" className="mt-6">
                <TabComponents
                  activeTab={activeTab}
                  stats={stats}
                  downlineStats={downlineStats}
                  teamMembers={teamMembers}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NetworkPage;
