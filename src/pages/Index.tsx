
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, TrendingUp, Wallet, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);

  const stats = [
    { label: 'Total de Usuários', value: '1,247', icon: Users, change: '+12%' },
    { label: 'Volume Negociado (24h)', value: '₴ 45.2K', icon: TrendingUp, change: '+8.5%' },
    { label: 'Lucro Total', value: '₴ 12.8K', icon: ArrowUpRight, change: '+15.3%' },
    { label: 'Crescimento', value: '87.2%', icon: TrendingUp, change: '+2.1%' },
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
              <h1 className="text-2xl font-bold text-white">MemeFlow</h1>
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
                <Link to="/dashboard">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0">
                    Acessar Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Robô Automatizado para <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">Meme Coins</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Maximize seus lucros com o sistema de trading automático de meme coins na blockchain Solana.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => setIsConnected(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 px-8 py-6 text-lg"
            >
              <Wallet className="mr-2 h-5 w-5" />
              Começar Agora
            </Button>
            <Button 
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
            >
              Como Funciona
            </Button>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Robô Automatizado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Nosso robô monitora continuamente o mercado e executa operações automaticamente com base em análises avançadas de meme coins.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Programa MLM</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Convide amigos e ganhe comissões em 8 níveis diferentes com nosso sistema de marketing multinível exclusivo.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Crescimento Exponencial</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Acompanhe em tempo real o crescimento do seu capital com nosso sistema de análise de desempenho e visualização de dados.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Ranking System */}
        <Card className="bg-black/30 border-white/10 backdrop-blur-sm mb-12">
          <CardHeader>
            <CardTitle className="text-white">Sistema de Status</CardTitle>
            <CardDescription className="text-gray-400">
              Evolua no sistema e ganhe mais benefícios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-gray-400 py-3 px-4">Nível</th>
                    <th className="text-left text-gray-400 py-3 px-4">Volume</th>
                    <th className="text-left text-gray-400 py-3 px-4">Requisito</th>
                    <th className="text-left text-gray-400 py-3 px-4">Bônus MLM</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4">
                      <Badge className="bg-gray-700 hover:bg-gray-600">V1</Badge>
                    </td>
                    <td className="py-3 px-4 text-white">0 SOL</td>
                    <td className="py-3 px-4 text-white">Entrada</td>
                    <td className="py-3 px-4 text-white">2%</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4">
                      <Badge className="bg-blue-700 hover:bg-blue-600">V2</Badge>
                    </td>
                    <td className="py-3 px-4 text-white">34 SOL</td>
                    <td className="py-3 px-4 text-white">—</td>
                    <td className="py-3 px-4 text-white">4%</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4">
                      <Badge className="bg-purple-700 hover:bg-purple-600">V3</Badge>
                    </td>
                    <td className="py-3 px-4 text-white">120 SOL</td>
                    <td className="py-3 px-4 text-white">2 diretos V2</td>
                    <td className="py-3 px-4 text-white">6%</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4">
                      <Badge className="bg-indigo-700 hover:bg-indigo-600">V4</Badge>
                    </td>
                    <td className="py-3 px-4 text-white">200 SOL</td>
                    <td className="py-3 px-4 text-white">2 diretos V3</td>
                    <td className="py-3 px-4 text-white">8%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Ver todos os níveis
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-xl p-8 text-center border border-white/10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Comece a negociar hoje mesmo
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Junte-se a mais de 1.200 usuários que confiam no MemeFlow para maximizar seus ganhos com meme coins na blockchain Solana.
          </p>
          <Button 
            onClick={() => setIsConnected(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 px-8 py-6 text-lg"
          >
            <Wallet className="mr-2 h-5 w-5" />
            Conectar Carteira
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-16 border-t border-white/10 bg-black/20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-bold">MemeFlow</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 MemeFlow. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
