
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Wallet, Users, BarChart3, ChevronRight, Gem, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { motion } from 'framer-motion';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);

  const projectMetrics = [
    { 
      label: 'Volume Total Negociado', 
      value: '₴ 12.8M', 
      icon: BarChart3, 
      change: '+15.3%',
      gradient: 'from-blue-500/20 to-indigo-600/20',
      iconColor: 'text-blue-400'
    },
    { 
      label: 'Lucro Total Gerado', 
      value: '₴ 3.2M', 
      icon: TrendingUp, 
      change: '+21.7%',
      gradient: 'from-emerald-500/20 to-teal-600/20',
      iconColor: 'text-emerald-400'
    },
    { 
      label: 'Usuários Ativos', 
      value: '8,547', 
      icon: Users, 
      change: '+32.4%',
      gradient: 'from-amber-500/20 to-orange-600/20',
      iconColor: 'text-amber-400'
    },
    { 
      label: 'Rentabilidade Média', 
      value: '26.4%', 
      icon: Gem, 
      change: '+8.2%',
      gradient: 'from-purple-500/20 to-violet-600/20',
      iconColor: 'text-purple-400'
    },
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/5 backdrop-blur-xl bg-white/5">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-2xl blur opacity-75"></div>
                <div className="relative bg-gradient-to-r from-emerald-400 to-blue-500 p-3 rounded-2xl">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-light text-white tracking-tight">MemeFlow</h1>
            </div>
            
            <div className="flex items-center space-x-6">
              <NavigationMenu className="hidden md:block">
                <NavigationMenuList className="gap-1">
                  <NavigationMenuItem>
                    <Link to="/">
                      <NavigationMenuLink className={navigationMenuTriggerStyle() + " text-white/80 bg-transparent hover:bg-white/10 hover:text-white font-medium rounded-2xl"}>
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <Link to="/dashboard">
                      <NavigationMenuLink className={navigationMenuTriggerStyle() + " text-white/80 bg-transparent hover:bg-white/10 hover:text-white font-medium rounded-2xl"}>
                        Dashboard
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <Link to="/network">
                      <NavigationMenuLink className={navigationMenuTriggerStyle() + " text-white/80 bg-transparent hover:bg-white/10 hover:text-white font-medium rounded-2xl"}>
                        Network
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              {!isConnected ? (
                <Button 
                  onClick={() => setIsConnected(true)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 rounded-2xl px-6 py-3 font-medium shadow-lg shadow-emerald-500/25"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Conectar Carteira
                </Button>
              ) : (
                <Link to="/dashboard">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 rounded-2xl px-6 py-3 font-medium shadow-lg shadow-blue-500/25">
                    Acessar Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-8 py-20">
        {/* Hero Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto mb-24"
        >
          <motion.div
            variants={fadeInUpVariants}
            custom={0}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-3xl blur-2xl opacity-20 scale-110"></div>
              <div className="relative bg-white/10 backdrop-blur-xl p-4 rounded-3xl border border-white/10">
                <Sparkles className="h-8 w-8 text-emerald-400" />
              </div>
            </div>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUpVariants}
            custom={1}
            className="text-6xl md:text-7xl font-extralight text-white mb-6 tracking-tight"
          >
            Potencialize seus{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500 font-light">
              Investimentos
            </span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUpVariants}
            custom={2}
            className="text-white/70 text-xl font-light mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            A plataforma definitiva para maximizar seus lucros com Meme Coins na blockchain Solana
          </motion.p>
          
          <motion.div 
            variants={fadeInUpVariants}
            custom={3}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button 
              onClick={() => setIsConnected(true)}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 px-10 py-4 text-lg font-medium rounded-2xl shadow-2xl shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
            >
              <Wallet className="mr-3 h-5 w-5" />
              Começar Agora
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {projectMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <Card className="relative overflow-hidden backdrop-blur-xl border-0 shadow-2xl rounded-3xl bg-white/5 hover:bg-white/10 transition-all duration-500 group">
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient}`}></div>
                <CardContent className="relative p-8">
                  <div className="flex items-start justify-between">
                    <div className="space-y-4">
                      <p className="text-white/60 text-sm font-medium tracking-wide uppercase">{metric.label}</p>
                      <p className="text-4xl font-light text-white tracking-tight">{metric.value}</p>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <span className="text-emerald-400 text-sm font-medium">{metric.change}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <metric.icon className={`h-7 w-7 ${metric.iconColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Features Section */}
        <div className="mb-32">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-light text-white text-center mb-16 tracking-tight"
          >
            Potencialize seus Resultados com Nossa Tecnologia
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
              <div className="relative p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-500">
                <div className="mb-8">
                  <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl inline-block">
                    <BarChart3 className="h-8 w-8 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-light text-white mb-6 tracking-tight">Trading Automatizado</h3>
                <p className="text-white/70 leading-relaxed font-light">
                  Nossos algoritmos avançados identificam as melhores oportunidades de negociação de meme coins em tempo real.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl"></div>
              <div className="relative p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-500">
                <div className="mb-8">
                  <div className="p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl inline-block">
                    <Users className="h-8 w-8 text-emerald-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-light text-white mb-6 tracking-tight">Sistema MLM Exclusivo</h3>
                <p className="text-white/70 leading-relaxed font-light">
                  Ganhe comissões ao convidar novos usuários para a plataforma, com até 8 níveis de profundidade.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-3xl"></div>
              <div className="relative p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-500">
                <div className="mb-8">
                  <div className="p-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl inline-block">
                    <TrendingUp className="h-8 w-8 text-amber-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-light text-white mb-6 tracking-tight">Análise de Desempenho</h3>
                <p className="text-white/70 leading-relaxed font-light">
                  Acompanhe o crescimento do seu capital e o desempenho da sua rede em tempo real.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="relative rounded-3xl p-16 text-center border border-white/10 overflow-hidden bg-white/5 backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-8 tracking-tight">
              Entre para a revolução dos Meme Coins
            </h2>
            <p className="text-white/70 mb-12 text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Junte-se a milhares de usuários que já estão aproveitando o potencial dos meme coins na blockchain Solana.
            </p>
            <Link to="/dashboard">
              <Button 
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 px-10 py-4 text-lg font-medium rounded-2xl shadow-2xl shadow-emerald-500/25 transition-all duration-300 hover:scale-105 group"
              >
                Comece Agora 
                <ChevronRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <footer className="mt-24 border-t border-white/5 bg-white/5 backdrop-blur-xl">
        <div className="container mx-auto px-8 py-12">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-2xl blur opacity-75"></div>
                <div className="relative bg-gradient-to-r from-emerald-400 to-blue-500 p-2 rounded-2xl">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
              </div>
              <span className="text-white font-light text-lg tracking-tight">MemeFlow</span>
            </div>
            <p className="text-white/60 text-sm font-light">
              © 2025 MemeFlow. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
