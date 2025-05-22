
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Users, Wallet, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);

  const stats = [
    { label: 'Total de Seguidores', value: '1,247', icon: Users, change: '+12%' },
    { label: 'Volume Copiado (24h)', value: '₴ 45.2K', icon: TrendingUp, change: '+8.5%' },
    { label: 'Lucro Total', value: '₴ 12.8K', icon: ArrowUpRight, change: '+15.3%' },
    { label: 'Taxa de Sucesso', value: '87.2%', icon: TrendingUp, change: '+2.1%' },
  ];

  const recentTrades = [
    { coin: 'BONK', amount: '₴ 1,250', profit: '+₴ 340', status: 'profit', time: '2min' },
    { coin: 'PEPE', amount: '₴ 890', profit: '+₴ 156', status: 'profit', time: '15min' },
    { coin: 'DOGE', amount: '₴ 2,100', profit: '-₴ 98', status: 'loss', time: '1h' },
    { coin: 'SHIB', amount: '₴ 670', profit: '+₴ 234', status: 'profit', time: '2h' },
  ];

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
              <h1 className="text-2xl font-bold text-white">SolanaBot Pro</h1>
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
                    Conectado
                  </Badge>
                  <span className="text-gray-300">7x8s...9mF2</span>
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-black/30 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-green-400 text-sm">{stat.change}</span>
                      <ArrowUpRight className="h-3 w-3 text-green-400 ml-1" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-lg">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Copy Trading Controls */}
            <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Controles de Copy Trading</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure suas estratégias de cópia automática
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link to="/master">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0">
                      <Settings className="mr-2 h-4 w-4" />
                      Carteira Master
                    </Button>
                  </Link>
                  <Link to="/followers">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0">
                      <Users className="mr-2 h-4 w-4" />
                      Seguidores
                    </Button>
                  </Link>
                  <Link to="/mlm">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Rede MLM
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Trades */}
            <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Trades Recentes</CardTitle>
                <CardDescription className="text-gray-400">
                  Últimas operações executadas pelo bot
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTrades.map((trade, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-2 rounded-full">
                          <span className="text-white text-xs font-bold">{trade.coin}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{trade.coin}</p>
                          <p className="text-gray-400 text-sm">{trade.amount}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${trade.status === 'profit' ? 'text-green-400' : 'text-red-400'}`}>
                          {trade.profit}
                        </p>
                        <p className="text-gray-400 text-sm">{trade.time} atrás</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profit Distribution */}
            <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Distribuição de Lucros</CardTitle>
                <CardDescription className="text-gray-400">
                  Sistema 70/30 automático
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Seguidores (70%)</span>
                    <span className="text-green-400 font-bold">₴ 8.96K</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" style={{width: '70%'}}></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Rede MLM (20%)</span>
                    <span className="text-blue-400 font-bold">₴ 2.56K</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full" style={{width: '20%'}}></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Master (10%)</span>
                    <span className="text-purple-400 font-bold">₴ 1.28K</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full" style={{width: '10%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0">
                  Pausar Bot
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  Configurações
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  Relatórios
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
