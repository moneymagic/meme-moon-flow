
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Wallet, History, Settings, Play, Pause } from "lucide-react";

const CopyTradePage = () => {
  const [isActive, setIsActive] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const stats = {
    totalProfit: 45.67,
    monthlyReturn: 12.3,
    totalTrades: 156,
    winRate: 68.2
  };

  const recentTrades = [
    { id: 1, pair: "SOL/USDC", type: "buy", amount: "2.5 SOL", profit: "+1.23 SOL", time: "2h ago" },
    { id: 2, pair: "ETH/USDC", type: "sell", amount: "0.1 ETH", profit: "+0.45 SOL", time: "4h ago" },
    { id: 3, pair: "BTC/USDC", type: "buy", amount: "0.01 BTC", profit: "-0.12 SOL", time: "6h ago" },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-light text-slate-900 mb-2 tracking-tight">Copy Trading</h1>
                <p className="text-slate-600 font-light">Automatize seus investimentos seguindo traders experientes</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`px-4 py-2 rounded-2xl text-sm font-medium ${
                  isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>
                  {isActive ? 'Ativo' : 'Pausado'}
                </div>
                <Button
                  onClick={() => setIsActive(!isActive)}
                  className={`rounded-2xl px-6 py-2.5 font-medium ${
                    isActive 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {isActive ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pausar
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Ativar
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-600 font-light text-sm">Lucro Total</p>
                    <p className="text-2xl font-light text-slate-900 tracking-tight">{stats.totalProfit} SOL</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-600 font-light text-sm">Retorno Mensal</p>
                    <p className="text-2xl font-light text-slate-900 tracking-tight">{stats.monthlyReturn}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
                    <History className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-600 font-light text-sm">Total Trades</p>
                    <p className="text-2xl font-light text-slate-900 tracking-tight">{stats.totalTrades}</p>
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
                    <p className="text-slate-600 font-light text-sm">Win Rate</p>
                    <p className="text-2xl font-light text-slate-900 tracking-tight">{stats.winRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-slate-900 font-medium tracking-tight">Gestão de Copy Trading</CardTitle>
              <CardDescription className="text-slate-600 font-light">
                Configure e monitore suas operações automatizadas
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
                    value="history" 
                    className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600"
                  >
                    Histórico
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings" 
                    className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600"
                  >
                    Configurações
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-slate-900 tracking-tight">Trades Recentes</h3>
                      <div className="space-y-3">
                        {recentTrades.map((trade) => (
                          <div key={trade.id} className="flex items-center justify-between p-4 bg-slate-50/80 rounded-2xl">
                            <div className="flex items-center space-x-3">
                              <div className={`w-2 h-2 rounded-full ${
                                trade.type === 'buy' ? 'bg-emerald-500' : 'bg-red-500'
                              }`}></div>
                              <div>
                                <p className="font-medium text-slate-900 text-sm">{trade.pair}</p>
                                <p className="text-slate-600 font-light text-xs">{trade.amount} • {trade.time}</p>
                              </div>
                            </div>
                            <div className={`text-sm font-medium ${
                              trade.profit.startsWith('+') ? 'text-emerald-600' : 'text-red-600'
                            }`}>
                              {trade.profit}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-slate-900 tracking-tight">Configuração Rápida</h3>
                      <div className="space-y-3">
                        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-2xl py-3 font-medium">
                          <Wallet className="w-4 h-4 mr-2" />
                          Conectar Wallet
                        </Button>
                        <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 rounded-2xl py-3 font-medium">
                          <Settings className="w-4 h-4 mr-2" />
                          Configurar Limites
                        </Button>
                        <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 rounded-2xl py-3 font-medium">
                          <History className="w-4 h-4 mr-2" />
                          Ver Relatório
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="history">
                  <div className="text-center py-12">
                    <History className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">Histórico Completo</h3>
                    <p className="text-slate-600 font-light">Funcionalidade em desenvolvimento</p>
                  </div>
                </TabsContent>

                <TabsContent value="settings">
                  <div className="text-center py-12">
                    <Settings className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">Configurações Avançadas</h3>
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

export default CopyTradePage;
