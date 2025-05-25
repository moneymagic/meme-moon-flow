
import React from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NetworkStats from "@/components/network/NetworkStats";
import DownlineStats from "@/components/network/DownlineStats";
import NetworkMembersTable from "@/components/network/NetworkMembersTable";
import MLMContent from "@/components/network/MLMContent";
import { useWallet } from "@/contexts/WalletContext";
import WalletConnect from "@/components/WalletConnect";
import { Network, Users, TrendingUp, Target } from "lucide-react";

const NetworkPage = () => {
  const { isConnected } = useWallet();

  // Mock data for the components
  const networkStats = {
    totalMembers: 1247,
    totalVolume: 25800,
    averageRank: 2.5,
    directReferrals: 15,
    totalCommissions: 5.4,
    monthlyCommissions: 1.2,
    networkDepth: "8",
    activeMembers: 892
  };

  const networkMembers = [
    { user: "Alex M.", level: 1, volume: 32, rank: "V2", referrals: 3 },
    { user: "Sarah K.", level: 1, volume: 105, rank: "V3", referrals: 4 },
    { user: "Marcus T.", level: 2, volume: 25, rank: "V2", referrals: 1 },
    { user: "Lisa P.", level: 2, volume: 46, rank: "V2", referrals: 2 },
    { user: "John D.", level: 3, volume: 12, rank: "V1", referrals: 0 }
  ];

  const downlineStats = {
    totalMembers: 1247,
    activeMembers: 892,
    inactiveMembers: 355,
    beginnerTeam: 583,
    intermediateTeam: 20,
    directDownlines: 15,
    maxTeamRequirement: 20,
    currentTeam: 2,
    maxDownlinesRequirement: 1500,
    currentDownlines: 621,
    maxDirectRequirement: 20,
    currentDirect: 15
  };

  const teamMembers = [
    { id: '1', username: 'Alex***23', joinDate: '2024-01-15', teamSize: 45, rank: 2 },
    { id: '2', username: 'Sarah***89', joinDate: '2024-02-20', teamSize: 32, rank: 3 },
    { id: '3', username: 'Marcus***56', joinDate: '2024-03-10', teamSize: 18, rank: 1 },
    { id: '4', username: 'Lisa***34', joinDate: '2024-03-25', teamSize: 27, rank: 2 }
  ];

  const rankPercents = {
    V1: 15,
    V2: 10,
    V3: 8,
    V4: 6,
    V5: 5,
    V6: 4,
    V7: 3,
    V8: 2
  };

  const rankRequirements = {
    V1: { sol: 100, linesWithRank: null },
    V2: { sol: 500, linesWithRank: 'V1' as const },
    V3: { sol: 1000, linesWithRank: 'V2' as const },
    V4: { sol: 2500, linesWithRank: 'V3' as const },
    V5: { sol: 5000, linesWithRank: 'V4' as const },
    V6: { sol: 10000, linesWithRank: 'V5' as const },
    V7: { sol: 25000, linesWithRank: 'V6' as const },
    V8: { sol: 50000, linesWithRank: 'V7' as const }
  };

  const topPerformers = [
    { name: "Alex M.", level: 1, earnings: "2.4 SOL", referrals: 12 },
    { name: "Sarah K.", level: 2, earnings: "1.8 SOL", referrals: 8 },
    { name: "Marcus T.", level: 1, earnings: "1.2 SOL", referrals: 6 }
  ];

  const levels = [
    { level: 1, members: 15, commission: "2%", earnings: "0.8 SOL" },
    { level: 2, members: 45, commission: "2%", earnings: "1.2 SOL" },
    { level: 3, members: 89, commission: "2%", earnings: "1.8 SOL" },
    { level: 4, members: 156, commission: "2%", earnings: "2.1 SOL" }
  ];

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-8 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 via-transparent to-gray-900/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-600/10 via-transparent to-transparent"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gray-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative w-full max-w-md">
          <div className="text-center mb-8">
            <div className="relative group mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 to-gray-700 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-gradient-to-r from-gray-500 to-gray-700 p-3 rounded-2xl shadow-lg mx-auto w-fit">
                <Network className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-light text-white mb-4">
              Acesse sua Rede
            </h2>
            <p className="text-gray-300 font-extralight">
              Para visualizar sua rede e estatísticas, conecte sua Phantom Wallet
            </p>
          </div>
          <WalletConnect />
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8">
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 to-gray-700 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-gradient-to-r from-gray-500 to-gray-700 p-3 rounded-2xl shadow-lg">
                  <Network className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-light text-white mb-2 tracking-tight">Sua Rede</h1>
                <p className="text-gray-300 font-light">Gerencie e monitore sua rede de afiliados</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-black/80 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-700/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">Total</span>
              </div>
              <h3 className="text-2xl font-light text-white mb-1">1,247</h3>
              <p className="text-gray-400 text-sm font-light">Membros na Rede</p>
            </div>

            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-black/80 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">Ativos</span>
              </div>
              <h3 className="text-2xl font-light text-white mb-1">892</h3>
              <p className="text-gray-400 text-sm font-light">Membros Ativos</p>
            </div>

            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-black/80 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-700/20 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-yellow-400" />
                </div>
                <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">Volume</span>
              </div>
              <h3 className="text-2xl font-light text-white mb-1">25.8K</h3>
              <p className="text-gray-400 text-sm font-light">SOL Volume</p>
            </div>

            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-black/80 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-700/20 rounded-xl flex items-center justify-center">
                  <Network className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">Níveis</span>
              </div>
              <h3 className="text-2xl font-light text-white mb-1">8</h3>
              <p className="text-gray-400 text-sm font-light">Níveis Ativos</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
            <Tabs defaultValue="overview" className="w-full">
              <div className="border-b border-white/10 px-8 pt-6 pb-0">
                <TabsList className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-1">
                  <TabsTrigger 
                    value="overview" 
                    className="rounded-xl font-medium data-[state=active]:bg-gray-700 data-[state=active]:text-white data-[state=active]:shadow-sm text-gray-300"
                  >
                    Visão Geral
                  </TabsTrigger>
                  <TabsTrigger 
                    value="members" 
                    className="rounded-xl font-medium data-[state=active]:bg-gray-700 data-[state=active]:text-white data-[state=active]:shadow-sm text-gray-300"
                  >
                    Membros
                  </TabsTrigger>
                  <TabsTrigger 
                    value="mlm" 
                    className="rounded-xl font-medium data-[state=active]:bg-gray-700 data-[state=active]:text-white data-[state=active]:shadow-sm text-gray-300"
                  >
                    Sistema MLM
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="p-8">
                <TabsContent value="overview" className="mt-0 space-y-8">
                  <NetworkStats 
                    totalMembers={networkStats.totalMembers}
                    totalVolume={networkStats.totalVolume}
                    averageRank={networkStats.averageRank}
                  />
                  <DownlineStats 
                    stats={downlineStats}
                    teamMembers={teamMembers}
                  />
                </TabsContent>
                
                <TabsContent value="members" className="mt-0">
                  <NetworkMembersTable members={networkMembers} />
                </TabsContent>
                
                <TabsContent value="mlm" className="mt-0">
                  <MLMContent 
                    networkStats={networkStats}
                    rankPercents={rankPercents}
                    rankRequirements={rankRequirements}
                    topPerformers={topPerformers}
                    levels={levels}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NetworkPage;
