
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Settings, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const Master = () => {
  const [botActive, setBotActive] = useState(true);
  const [maxRisk, setMaxRisk] = useState('5');
  const [minProfit, setMinProfit] = useState('10');

  const tradingPairs = [
    { name: 'BONK/SOL', status: 'active', profit24h: '+12.5%' },
    { name: 'PEPE/SOL', status: 'active', profit24h: '+8.3%' },
    { name: 'DOGE/SOL', status: 'paused', profit24h: '-2.1%' },
    { name: 'SHIB/SOL', status: 'active', profit24h: '+15.7%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-white">Carteira Master</h1>
            </div>
            <Badge variant="outline" className="border-green-500 text-green-400">
              Ativa
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bot Configuration */}
            <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Configurações do Bot
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Configure os parâmetros de trading automático
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Bot Ativo</Label>
                    <p className="text-sm text-gray-400">Ativar/desativar trading automático</p>
                  </div>
                  <Switch checked={botActive} onCheckedChange={setBotActive} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Risco Máximo (%)</Label>
                    <Input 
                      value={maxRisk}
                      onChange={(e) => setMaxRisk(e.target.value)}
                      className="bg-white/5 border-white/20 text-white"
                      placeholder="5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Lucro Mínimo (%)</Label>
                    <Input 
                      value={minProfit}
                      onChange={(e) => setMinProfit(e.target.value)}
                      className="bg-white/5 border-white/20 text-white"
                      placeholder="10"
                    />
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0">
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>

            {/* Trading Pairs Management */}
            <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Pares de Trading</CardTitle>
                <CardDescription className="text-gray-400">
                  Gerencie os pares de meme coins que o bot irá operar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tradingPairs.map((pair, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-2 rounded-full">
                          <TrendingUp className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{pair.name}</p>
                          <Badge 
                            variant={pair.status === 'active' ? 'default' : 'secondary'}
                            className={pair.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}
                          >
                            {pair.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${pair.profit24h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {pair.profit24h}
                        </p>
                        <p className="text-gray-400 text-sm">24h</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics Sidebar */}
          <div className="space-y-6">
            {/* Master Wallet Stats */}
            <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Estatísticas Master</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-400" />
                    <span className="text-gray-400">Saldo Total</span>
                  </div>
                  <span className="text-white font-bold">₴ 45.2K</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    <span className="text-gray-400">Lucro 24h</span>
                  </div>
                  <span className="text-green-400 font-bold">+₴ 1.28K</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-purple-400" />
                    <span className="text-gray-400">Trades Ativos</span>
                  </div>
                  <span className="text-white font-bold">8</span>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Distribution */}
            <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Receita Master (10%)</CardTitle>
                <CardDescription className="text-gray-400">
                  Sua participação nos lucros
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">₴ 1,280</p>
                  <p className="text-green-400">+15.3% este mês</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Hoje</span>
                    <span className="text-white">₴ 128</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Esta semana</span>
                    <span className="text-white">₴ 456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Este mês</span>
                    <span className="text-white">₴ 1,280</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Smart Contract Info */}
            <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Smart Contract</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="text-gray-400">Endereço do Contrato:</p>
                  <p className="text-white font-mono break-all">7x8s...9mF2</p>
                </div>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  Ver no Explorer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Master;
