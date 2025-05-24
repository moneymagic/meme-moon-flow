
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Wallet, Activity, Shield, Play, Pause, ArrowUpRight, Zap } from "lucide-react";

const CopyTradePage = () => {
  const [isActive, setIsActive] = useState(true);

  const stats = {
    totalProfit: 45.67,
    monthlyReturn: 12.3,
    totalTrades: 156,
    winRate: 68.2
  };

  const recentTrades = [
    { id: 1, pair: "SOL/USDC", type: "buy", amount: "2.5 SOL", profit: "+1.23 SOL", time: "2h ago", status: "completed" },
    { id: 2, pair: "ETH/USDC", type: "sell", amount: "0.1 ETH", profit: "+0.45 SOL", time: "4h ago", status: "completed" },
    { id: 3, pair: "BTC/USDC", type: "buy", amount: "0.01 BTC", profit: "-0.12 SOL", time: "6h ago", status: "completed" },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/30 to-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">AI-Powered Trading</span>
            </div>
            
            <h1 className="text-5xl font-thin text-gray-900 mb-4 tracking-tight">
              Copy Trading
            </h1>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto mb-8">
              Automatize seus investimentos seguindo os melhores traders do mercado
            </p>
            
            <div className="flex items-center justify-center space-x-4">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                isActive ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`text-sm font-medium ${isActive ? 'text-green-700' : 'text-red-700'}`}>
                  {isActive ? 'Ativo' : 'Pausado'}
                </span>
              </div>
              
              <Button
                onClick={() => setIsActive(!isActive)}
                className={`rounded-full px-6 py-2 font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/25' 
                    : 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/25'
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

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="border-0 bg-white/70 backdrop-blur-xl shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-gray-500 font-medium mb-1">Lucro Total</p>
                <p className="text-2xl font-light text-gray-900">{stats.totalProfit} SOL</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-xl shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-gray-500 font-medium mb-1">Retorno Mensal</p>
                <p className="text-2xl font-light text-gray-900">{stats.monthlyReturn}%</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-xl shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-gray-500 font-medium mb-1">Total Trades</p>
                <p className="text-2xl font-light text-gray-900">{stats.totalTrades}</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-xl shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-gray-500 font-medium mb-1">Win Rate</p>
                <p className="text-2xl font-light text-gray-900">{stats.winRate}%</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Trades Section */}
            <div className="lg:col-span-2">
              <Card className="border-0 bg-white/70 backdrop-blur-xl shadow-sm">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-light text-gray-900">Atividade Recente</h2>
                    <Button variant="ghost" className="text-gray-500 hover:text-gray-700">
                      Ver Todos
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {recentTrades.map((trade) => (
                      <div key={trade.id} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${
                            trade.type === 'buy' ? 'bg-green-500' : 'bg-blue-500'
                          }`}></div>
                          <div>
                            <p className="font-medium text-gray-900">{trade.pair}</p>
                            <p className="text-sm text-gray-500">{trade.amount} • {trade.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                            {trade.status}
                          </Badge>
                          <span className={`font-medium ${
                            trade.profit.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {trade.profit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions Sidebar */}
            <div className="space-y-6">
              <Card className="border-0 bg-white/70 backdrop-blur-xl shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Ações Rápidas</h3>
                  <div className="space-y-3">
                    <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl py-3 font-medium">
                      <Wallet className="w-4 h-4 mr-2" />
                      Conectar Wallet
                    </Button>
                    <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl py-3 font-medium">
                      Configurar Limites
                    </Button>
                    <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl py-3 font-medium">
                      Ver Relatórios
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-blue-50 to-purple-50 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Segurança</h3>
                      <p className="text-sm text-gray-600">Protegido por Solana</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Seus fundos estão seguros na blockchain Solana com contratos inteligentes auditados.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CopyTradePage;
