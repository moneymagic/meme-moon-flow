
import React from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, TrendingUp, DollarSign } from 'lucide-react';
import Layout from '@/components/Layout';
import { useReferralSystem } from '@/hooks/useReferralSystem';
import ReferralLinkCard from '@/components/network/ReferralLinkCard';
import MLMCommissionTracker from '@/components/network/mlm/MLMCommissionTracker';

const NetworkPage = () => {
  const { walletAddress, isConnected } = useWallet();
  const { referralStats, loading: referralLoading } = useReferralSystem();

  if (!isConnected) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh] p-4">
          <Card className="bg-slate-800/50 backdrop-blur-md border-slate-700/50 text-white max-w-md w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-light">Conectar Carteira</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-400 mb-4">
                Conecte sua carteira para acessar suas informações de rede
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (referralLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-white text-xl font-light">Carregando dados da rede...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-white mb-2 tracking-tight">Minha Rede MLM</h1>
            <p className="text-slate-400 font-light">Sistema multinível com profundidade infinita</p>
          </div>

          {/* Quick Stats - following the design pattern */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-light">Total de Membros</p>
                    <p className="text-3xl font-light text-white mt-1">{referralStats.totalReferrals}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-light">Volume Total</p>
                    <p className="text-3xl font-light text-white mt-1">0 SOL</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-light">Comissões Totais</p>
                    <p className="text-3xl font-light text-white mt-1">{referralStats.totalEarnings.toFixed(4)} SOL</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <TabsTrigger value="overview" className="text-slate-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white font-light">
                Visão Geral
              </TabsTrigger>
              <TabsTrigger value="referral" className="text-slate-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white font-light">
                Sistema de Indicação
              </TabsTrigger>
              <TabsTrigger value="commissions" className="text-slate-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white font-light">
                Comissões
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <ReferralLinkCard />
            </TabsContent>

            <TabsContent value="referral" className="space-y-6">
              <ReferralLinkCard />
              
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white font-light">Como Funciona o Sistema MLM</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-400 space-y-6">
                  <div>
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      📈 Progressão de Ranking
                    </h4>
                    <p className="text-sm leading-relaxed">
                      Seu ranking aumenta baseado no lucro gerado pela sua rede e estrutura de sub-redes qualificadas.
                      Quanto maior o ranking, maior o percentual de comissões que você recebe.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      💰 Sistema de Comissões
                    </h4>
                    <p className="text-sm leading-relaxed">
                      20% do lucro de cada operação é distribuído na rede por diferença de ranking.
                      Você recebe a diferença entre seu percentual e o percentual do membro abaixo.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      🌐 Profundidade Infinita
                    </h4>
                    <p className="text-sm leading-relaxed">
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
