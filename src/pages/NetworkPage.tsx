
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Network, Download, UserPlus, Copy, Crown, Star, Infinity, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NetworkPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [referralCode] = useState("MEME2024VQ");
  
  const networkStats = {
    totalMembers: 121965,
    activeMembers: 4,
    inactiveMembers: 95,
    cumulativeProfit: 183986,
    todayProfit: 0,
    currentRank: "V3",
    directReferrals: 4,
    teamSize: 621,
    teamProgress: 2
  };

  const teamMembers = [
    { id: 1, name: "3gu***7u*", joinDate: "2024-09-30", teamSize: 1, rank: "V1", isActive: true },
    { id: 2, name: "lea***sar", joinDate: "2024-02-04", teamSize: 14, rank: "V2", isActive: true },
    { id: 3, name: "Fab***der", joinDate: "2024-01-16", teamSize: 1, rank: "V1", isActive: false },
    { id: 4, name: "dud***val", joinDate: "2024-01-11", teamSize: 1, rank: "V1", isActive: false },
    { id: 5, name: "Vip***ho", joinDate: "2024-01-11", teamSize: 11, rank: "V2", isActive: true },
  ];

  const rankRequirements = [
    { rank: "V1", profitRequired: 10, directsRequired: 0, description: "Rank inicial" },
    { rank: "V2", profitRequired: 30, directsRequired: 2, description: "2 diretos V1" },
    { rank: "V3", profitRequired: 100, directsRequired: 2, description: "2 diretos V2" },
    { rank: "V4", profitRequired: 300, directsRequired: 2, description: "2 diretos V3" },
    { rank: "V5", profitRequired: 1000, directsRequired: 2, description: "2 diretos V4" },
    { rank: "V6", profitRequired: 3000, directsRequired: 2, description: "2 diretos V5" },
    { rank: "V7", profitRequired: 10000, directsRequired: 2, description: "2 diretos V6" },
    { rank: "V8", profitRequired: 30000, directsRequired: 2, description: "2 diretos V7" },
  ];

  const copyReferralLink = () => {
    const link = `https://memeflow.com/ref/${referralCode}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copiado!",
      description: "Seu link de indicação foi copiado para a área de transferência.",
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-light text-slate-900 mb-2 tracking-tight">Matriz Unilevel</h1>
                <p className="text-slate-600 font-light">Sistema de comissões com corte por diferença de ranking</p>
              </div>
            </div>
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200/50 rounded-3xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 font-medium text-sm mb-1">Número de equipe</p>
                    <p className="text-3xl font-light text-blue-900 tracking-tight">{networkStats.totalMembers.toLocaleString()}</p>
                    <p className="text-blue-600 text-sm font-light">pessoas</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200/50 rounded-3xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-600 font-medium text-sm mb-1">Lucro cumulativo</p>
                    <p className="text-3xl font-light text-emerald-900 tracking-tight">{networkStats.cumulativeProfit.toLocaleString()}</p>
                    <p className="text-emerald-600 text-sm font-light">SOL</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200/50 rounded-3xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 font-medium text-sm mb-1">Meu Rank</p>
                    <p className="text-3xl font-light text-purple-900 tracking-tight">{networkStats.currentRank}</p>
                    <p className="text-purple-600 text-sm font-light">atual</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200/50 rounded-3xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-600 font-medium text-sm mb-1">Lucro para hoje</p>
                    <p className="text-3xl font-light text-amber-900 tracking-tight">{networkStats.todayProfit}</p>
                    <p className="text-amber-600 text-sm font-light">SOL</p>
                  </div>
                  <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Referral Link Card */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 rounded-3xl shadow-lg mb-8">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <h3 className="text-xl font-medium mb-2">Seu Link de Indicação</h3>
                  <p className="text-blue-100 mb-4">Compartilhe e ganhe comissões por cada pessoa que entrar</p>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 font-mono text-white">
                    https://memeflow.com/ref/{referralCode}
                  </div>
                </div>
                <Button 
                  onClick={copyReferralLink}
                  className="bg-white text-blue-600 hover:bg-blue-50 rounded-2xl px-6 py-3 font-medium"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Link
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-slate-900 font-medium tracking-tight">Gestão da Rede</CardTitle>
              <CardDescription className="text-slate-600 font-light">
                Acompanhe o desempenho e crescimento da sua rede unilevel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-slate-100/80 rounded-2xl p-1 mb-6">
                  <TabsTrigger 
                    value="overview" 
                    className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600"
                  >
                    Visão Geral
                  </TabsTrigger>
                  <TabsTrigger 
                    value="team" 
                    className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600"
                  >
                    Equipe
                  </TabsTrigger>
                  <TabsTrigger 
                    value="rankings" 
                    className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600"
                  >
                    Rankings
                  </TabsTrigger>
                  <TabsTrigger 
                    value="commissions" 
                    className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600"
                  >
                    Comissões
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Team Progress */}
                    <Card className="bg-slate-50/80 border-slate-200/50 rounded-2xl">
                      <CardHeader>
                        <CardTitle className="text-lg font-medium text-slate-900">Equipe Global</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Indicados diretos</span>
                          <span className="font-medium text-slate-900">{networkStats.directReferrals} pessoas</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Total da equipe</span>
                          <span className="font-medium text-slate-900">{networkStats.teamSize.toLocaleString()} pessoas</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Profundidade</span>
                          <span className="font-medium text-slate-900 flex items-center">
                            <Infinity className="w-4 h-4 mr-1" />
                            Ilimitada
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Active/Inactive Members */}
                    <Card className="bg-slate-50/80 border-slate-200/50 rounded-2xl">
                      <CardHeader>
                        <CardTitle className="text-lg font-medium text-slate-900">Linha Descendente Direta</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <p className="text-2xl font-light text-emerald-600">{networkStats.activeMembers}</p>
                            <p className="text-sm text-slate-600">Ativos</p>
                          </div>
                          <div>
                            <p className="text-2xl font-light text-slate-500">{networkStats.inactiveMembers}</p>
                            <p className="text-sm text-slate-600">Inativos</p>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-slate-200">
                          <p className="text-center text-slate-600 text-sm">
                            Total: {networkStats.activeMembers + networkStats.inactiveMembers} indicados diretos
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="team" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-slate-900">Detalhe direto da linha descendente</h3>
                      <div className="text-sm text-slate-600">
                        {teamMembers.length} de {networkStats.activeMembers + networkStats.inactiveMembers} indicados
                      </div>
                    </div>
                    <div className="space-y-3">
                      {teamMembers.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-4 bg-slate-50/80 rounded-2xl border border-slate-200/50">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {member.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">{member.name}</p>
                              <p className="text-slate-600 text-sm">{member.joinDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="text-sm text-slate-600">Equipe</p>
                              <p className="font-medium">{member.teamSize} pessoas</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge 
                                variant={member.isActive ? "default" : "secondary"}
                                className={`${
                                  member.isActive 
                                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                                    : 'bg-slate-100 text-slate-600'
                                } rounded-full px-3 py-1`}
                              >
                                {member.rank}
                              </Badge>
                              <div className={`w-2 h-2 rounded-full ${member.isActive ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="rankings" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-slate-900">Estrutura de Rankings</h3>
                    <div className="grid gap-4">
                      {rankRequirements.map((rank, index) => (
                        <div key={rank.rank} className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                                networkStats.currentRank === rank.rank 
                                  ? 'bg-gradient-to-br from-purple-500 to-purple-600' 
                                  : 'bg-gradient-to-br from-slate-400 to-slate-500'
                              }`}>
                                <Award className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-slate-900">{rank.rank}</p>
                                <p className="text-slate-600 text-sm">{rank.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-slate-600 text-sm">Lucro da rede necessário</p>
                              <p className="font-medium">{rank.profitRequired.toLocaleString()} SOL</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="commissions" className="space-y-6">
                  <div className="space-y-6">
                    <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200/50 rounded-2xl">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium text-emerald-900 mb-4">Sistema de Comissões</h3>
                        <div className="space-y-3 text-emerald-800">
                          <p><strong>Performance Fee:</strong> 30% sobre o lucro total</p>
                          <p><strong>Master Trader:</strong> 10% (vai direto para o trader)</p>
                          <p><strong>Rede Unilevel:</strong> 20% (distribuído com corte por ranking)</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-slate-50/80 border-slate-200/50 rounded-2xl">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium text-slate-900 mb-4">Lógica de Funcionamento</h3>
                        <div className="space-y-3 text-slate-700">
                          <p>• Carteira Master é seguida pelas Carteiras Seguidoras</p>
                          <p>• Toda vez que o Master encerra um trade positivo:</p>
                          <p className="ml-4">- Sistema calcula 30% do lucro da seguidora</p>
                          <p className="ml-4">- Valor é descontado automaticamente do saldo pré-pago em SOL</p>
                          <p>• A taxa de performance é dividida assim:</p>
                          <p className="ml-4">- 10% para a carteira do Master Trader</p>
                          <p className="ml-4">- 20% distribuídos na rede Unilevel, com compressão por ranking</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-50/80 border-slate-200/50 rounded-2xl">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium text-slate-900 mb-4">Como Funciona o Corte</h3>
                        <div className="space-y-3 text-slate-700">
                          <p>• A distribuição dos 20% é feita de baixo para cima na linha</p>
                          <p>• Quando encontra alguém com rank igual ou superior, o pagamento para</p>
                          <p>• Isso incentiva o crescimento de rank de toda a equipe</p>
                          <p>• A profundidade é infinita até encontrar o corte</p>
                          <p>• <strong>Não há limite</strong> para o número de indicados diretos</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default NetworkPage;
