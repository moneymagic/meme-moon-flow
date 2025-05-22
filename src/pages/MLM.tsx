
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, TrendingUp, Share2, Award, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const MLM = () => {
  const networkStats = {
    totalMembers: 1247,
    directReferrals: 23,
    totalCommissions: 4560,
    monthlyCommissions: 890,
    networkDepth: 7,
    activeMembers: 1089
  };

  const levels = [
    { level: 1, members: 23, commission: '5%', earnings: '₴ 345' },
    { level: 2, members: 89, commission: '3%', earnings: '₴ 234' },
    { level: 3, members: 156, commission: '2%', earnings: '₴ 187' },
    { level: 4, members: 234, commission: '1%', earnings: '₴ 98' },
    { level: 5, members: 345, commission: '0.5%', earnings: '₴ 67' },
  ];

  const topPerformers = [
    { name: '9mF2...7x8s', level: 1, earnings: '₴ 1,250', referrals: 45 },
    { name: '3kR1...9pL4', level: 1, earnings: '₴ 980', referrals: 38 },
    { name: '8nQ7...2mK9', level: 2, earnings: '₴ 750', referrals: 29 },
    { name: '5vB6...1dF3', level: 1, earnings: '₴ 690', referrals: 25 },
    { name: '2hW9...6tG5', level: 3, earnings: '₴ 540', referrals: 22 },
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
              <h1 className="text-2xl font-bold text-white">Rede Multinível</h1>
            </div>
            <Badge variant="outline" className="border-green-500 text-green-400">
              Sistema VastCopy
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Network Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total de Membros</p>
                  <p className="text-2xl font-bold text-white">{networkStats.totalMembers.toLocaleString()}</p>
                  <p className="text-green-400 text-sm">+12% este mês</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Comissões Totais</p>
                  <p className="text-2xl font-bold text-white">₴ {networkStats.totalCommissions.toLocaleString()}</p>
                  <p className="text-green-400 text-sm">+8.5% este mês</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Profundidade da Rede</p>
                  <p className="text-2xl font-bold text-white">{networkStats.networkDepth} níveis</p>
                  <p className="text-blue-400 text-sm">{networkStats.activeMembers} ativos</p>
                </div>
                <Share2 className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* MLM Levels */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Estrutura de Níveis</CardTitle>
                <CardDescription className="text-gray-400">
                  Distribuição de comissões por nível da rede (20% do lucro total)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {levels.map((level, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full">
                            <Award className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-bold">Nível {level.level}</p>
                            <p className="text-gray-400 text-sm">{level.members} membros</p>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <Badge className="bg-blue-500">
                            {level.commission}
                          </Badge>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-white font-medium">{level.members} pessoas</p>
                          <p className="text-gray-400 text-sm">neste nível</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-green-400 font-bold">{level.earnings}</p>
                          <p className="text-gray-400 text-sm">ganhos mensais</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Top Performers</CardTitle>
                <CardDescription className="text-gray-400">
                  Membros que mais geram comissões na sua rede
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-gold via-yellow-400 to-orange-500 p-2 rounded-full">
                          <span className="text-white text-xs font-bold">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium font-mono">{performer.name}</p>
                          <p className="text-gray-400 text-sm">Nível {performer.level} • {performer.referrals} referrals</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-bold">{performer.earnings}</p>
                        <p className="text-gray-400 text-sm">este mês</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Commission Calculator */}
            <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Suas Comissões</CardTitle>
                <CardDescription className="text-gray-400">
                  Ganhos da rede multinível
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">₴ {networkStats.monthlyCommissions}</p>
                  <p className="text-green-400">este mês</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Hoje</span>
                    <span className="text-white">₴ 67</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Esta semana</span>
                    <span className="text-white">₴ 234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Este mês</span>
                    <span className="text-white">₴ 890</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Referral Program */}
            <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Programa de Indicação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">Seu código de indicação:</p>
                  <div className="bg-white/5 p-3 rounded border border-white/20">
                    <p className="text-white font-mono">MASTER2024</p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0">
                  Copiar Link
                </Button>
                <div className="text-center">
                  <p className="text-sm text-gray-400">
                    Você tem <span className="text-white font-bold">{networkStats.directReferrals}</span> indicações diretas
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Network Visualization */}
            <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Visualização da Rede</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-full inline-block mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-white font-bold">Você</p>
                  <p className="text-gray-400 text-sm">Master Account</p>
                </div>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  Ver Árvore Completa
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLM;
