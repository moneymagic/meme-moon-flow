
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Network, Download, UserPlus } from "lucide-react";

const NetworkPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const networkStats = {
    totalMembers: 234,
    activeMembers: 156,
    monthlyVolume: 12450.75,
    totalCommissions: 890.23
  };

  const recentMembers = [
    { id: 1, name: "user123.sol", joinDate: "2024-01-15", status: "active" },
    { id: 2, name: "crypto_whale.sol", joinDate: "2024-01-14", status: "active" },
    { id: 3, name: "blockchain_dev.sol", joinDate: "2024-01-13", status: "pending" },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <div className="mb-8">
            <div>
              <h1 className="text-4xl font-light text-slate-900 mb-2 tracking-tight">Network</h1>
              <p className="text-slate-600 font-light">Gerencie sua rede e acompanhe o crescimento</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-600 font-light text-sm">Total Membros</p>
                    <p className="text-2xl font-light text-slate-900 tracking-tight">{networkStats.totalMembers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-600 font-light text-sm">Membros Ativos</p>
                    <p className="text-2xl font-light text-slate-900 tracking-tight">{networkStats.activeMembers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
                    <Network className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-600 font-light text-sm">Volume Mensal</p>
                    <p className="text-2xl font-light text-slate-900 tracking-tight">{networkStats.monthlyVolume} SOL</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-600 font-light text-sm">Comissões</p>
                    <p className="text-2xl font-light text-slate-900 tracking-tight">{networkStats.totalCommissions} SOL</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-slate-900 font-medium tracking-tight">Gestão da Rede</CardTitle>
              <CardDescription className="text-slate-600 font-light">
                Acompanhe o desempenho e crescimento da sua rede
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
                    value="members" 
                    className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600"
                  >
                    Membros
                  </TabsTrigger>
                  <TabsTrigger 
                    value="analytics" 
                    className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600"
                  >
                    Analytics
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-slate-900 tracking-tight">Últimos Membros</h3>
                      <div className="space-y-3">
                        {recentMembers.map((member) => (
                          <div key={member.id} className="flex items-center justify-between p-4 bg-slate-50/80 rounded-2xl">
                            <div>
                              <p className="font-medium text-slate-900 font-mono text-sm">{member.name}</p>
                              <p className="text-slate-600 font-light text-xs">{member.joinDate}</p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              member.status === 'active' 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-amber-100 text-amber-700'
                            }`}>
                              {member.status === 'active' ? 'Ativo' : 'Pendente'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-slate-900 tracking-tight">Ações</h3>
                      <div className="space-y-3">
                        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-2xl py-3 font-medium">
                          <UserPlus className="w-4 h-4 mr-2" />
                          Convidar Membro
                        </Button>
                        <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 rounded-2xl py-3 font-medium">
                          <Download className="w-4 h-4 mr-2" />
                          Exportar Relatório
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="members">
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">Lista de Membros</h3>
                    <p className="text-slate-600 font-light">Funcionalidade em desenvolvimento</p>
                  </div>
                </TabsContent>

                <TabsContent value="analytics">
                  <div className="text-center py-12">
                    <TrendingUp className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">Analytics Avançado</h3>
                    <p className="text-slate-600 font-light">Funcionalidade em desenvolvimento</p>
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
