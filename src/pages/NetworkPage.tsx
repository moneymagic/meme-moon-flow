import React, { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, TrendingUp, DollarSign } from 'lucide-react';
import Layout from '@/components/Layout';
import { useWalletData } from '@/hooks/useWalletData';
import { useReferralSystem } from '@/hooks/useReferralSystem';
import ReferralLinkCard from '@/components/network/ReferralLinkCard';
import MLMCommissionTracker from '@/components/network/mlm/MLMCommissionTracker';

const NetworkPage = () => {
  const { walletAddress, isConnected } = useWallet();
  const { networkData, isLoading } = useWalletData();
  const { referralStats, loading: referralLoading } = useReferralSystem();

  if (!isConnected) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh] p-4">
          <Card className="bg-white/5 backdrop-blur-md border-white/10 text-white max-w-md w-full">
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
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-white text-xl">Carregando dados da rede...</div>
        </div>
      </Layout>
    );
  }

  const totalMembers = networkData?.totalMembers || 0;
  const totalVolume = networkData?.totalVolume || 0;
  const totalCommissions = networkData?.cumulativeProfit || 0;

  return (
    <Layout>
      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Minha Rede MLM</h1>
            <p className="text-gray-300">Sistema multinível com profundidade infinita</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Total de Membros</p>
                    <p className="text-2xl font-bold text-white">{totalMembers}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Volume Total</p>
                    <p className="text-2xl font-bold text-white">{totalVolume.toLocaleString()} SOL</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Comissões Totais</p>
                    <p className="text-2xl font-bold text-white">{totalCommissions.toLocaleString()} SOL</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-white/10 backdrop-blur-md border-white/10">
              <TabsTrigger value="overview" className="text-white">Visão Geral</TabsTrigger>
              <TabsTrigger value="referral" className="text-white">Sistema de Indicação</TabsTrigger>
              <TabsTrigger value="commissions" className="text-white">Comissões</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ReferralLinkCard />
                
                <Card className="bg-white/5 backdrop-blur-md border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <TrendingUp className="h-6 w-6" />
                      Estatísticas da Rede
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Indicados Diretos:</span>
                        <span className="text-white font-bold">{referralStats.directReferrals}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Total na Rede:</span>
                        <span className="text-white font-bold">{referralStats.totalReferrals}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Ganhos Totais:</span>
                        <span className="text-white font-bold">{referralStats.totalEarnings.toFixed(4)} SOL</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="referral" className="space-y-6">
              <ReferralLinkCard />
              
              <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Como Funciona o Sistema MLM</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">📈 Progressão de Ranking</h4>
                    <p className="text-sm">
                      Seu ranking aumenta baseado no lucro gerado pela sua rede e estrutura de sub-redes qualificadas.
                      Quanto maior o ranking, maior o percentual de comissões que você recebe.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-2">💰 Sistema de Comissões</h4>
                    <p className="text-sm">
                      20% do lucro de cada operação é distribuído na rede por diferença de ranking.
                      Você recebe a diferença entre seu percentual e o percentual do membro abaixo.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-2">🌐 Profundidade Infinita</h4>
                    <p className="text-sm">
                      A rede tem profundidade infinita, permitindo ganhos em todos os níveis da sua estrutura,
                      desde que você tenha o ranking adequado.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="commissions" className="space-y-6">
              {walletAddress && (
                <MLMCommissionTracker userId={walletAddress} />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default NetworkPage;
