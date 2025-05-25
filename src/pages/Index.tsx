
import React from "react";
import Layout from "@/components/Layout";
import WalletConnect from "@/components/WalletConnect";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bot, Network, Shield, Zap, Infinity, Play, Sparkles, TrendingUp } from "lucide-react";

const Index = () => {
  const { isConnected } = useWallet();

  const features = [
    {
      icon: Bot,
      title: "IA Trading Automatizado",
      description: "Algoritmos avançados de machine learning que operam 24/7 para maximizar seus retornos no mercado de criptomoedas.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Network,
      title: "Sistema Multinível V1-V8",
      description: "Construa sua rede e escale seus ganhos com um sistema de comissões transparente e verificável on-chain.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Transparência Blockchain",
      description: "Cada transação e comissão registrada permanentemente na Solana para auditabilidade completa.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: Zap,
      title: "Acesso Instantâneo Web3",
      description: "Conecte sua Phantom Wallet e comece imediatamente. Zero burocracia, máxima segurança.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Conecte sua carteira",
      description: "Use Phantom ou qualquer carteira Solana compatível",
      icon: "🔗"
    },
    {
      number: "02", 
      title: "Configure estratégias de IA",
      description: "Personalize o bot conforme seu perfil de risco",
      icon: "🧠"
    },
    {
      number: "03",
      title: "Monitore resultados",
      description: "Acompanhe lucros e comissões em tempo real",
      icon: "📊"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
        {/* Hero Section with Enhanced Visual Impact */}
        <section className="relative">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/20 via-transparent to-transparent"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div className="relative max-w-7xl mx-auto px-8 py-40">
            <div className="text-center">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-3 bg-gray-100/80 backdrop-blur-xl border border-gray-200 rounded-full px-8 py-4 mb-12">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                <span className="text-sm font-medium text-gray-700">Powered by Solana Blockchain</span>
                <Sparkles className="w-4 h-4 text-purple-500" />
              </div>
              
              {/* Main Title */}
              <h1 className="text-8xl md:text-9xl font-extralight text-gray-900 mb-8 tracking-tighter leading-[0.85]">
                <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 bg-clip-text text-transparent">
                  MemeMoon
                </span>
                <br />
                <span className="font-light bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                  Flow
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-2xl md:text-3xl text-gray-600 mb-6 font-extralight max-w-4xl mx-auto leading-relaxed">
                A primeira plataforma de trading com IA
              </p>
              <p className="text-xl md:text-2xl text-gray-500 mb-16 font-extralight max-w-3xl mx-auto">
                e marketing multinível completamente descentralizada
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-24">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative">
                    <WalletConnect />
                  </div>
                </div>
                
                {isConnected && (
                  <a href="/dashboard">
                    <Button className="bg-gray-100 backdrop-blur-xl hover:bg-gray-200 text-gray-900 border border-gray-200 px-10 py-6 rounded-3xl font-light text-lg flex items-center gap-3 transition-all duration-300">
                      Acessar Dashboard
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </a>
                )}
              </div>

              {/* Stats Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl font-light text-purple-600 mb-2">24/7</div>
                  <div className="text-gray-500 text-sm">Trading Automatizado</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-blue-600 mb-2">V1-V8</div>
                  <div className="text-gray-500 text-sm">Níveis de Comissão</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-emerald-600 mb-2">100%</div>
                  <div className="text-gray-500 text-sm">Transparente</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Demo Section with Enhanced Styling */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white"></div>
          <div className="relative max-w-6xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-extralight text-gray-900 mb-6">
                Veja o poder da
                <br />
                <span className="font-light bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  IA em ação
                </span>
              </h2>
              <p className="text-xl text-gray-600 font-light">
                Trading automatizado gerando resultados reais
              </p>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-100/50 via-blue-100/50 to-purple-100/50 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-100/80 to-gray-200/80 backdrop-blur-xl rounded-3xl overflow-hidden aspect-video flex items-center justify-center border border-gray-200">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 via-transparent to-blue-200/20"></div>
                
                {/* Play Button */}
                <div className="relative group/play">
                  <div className="absolute -inset-4 bg-gray-300/50 rounded-full blur-xl opacity-0 group-hover/play:opacity-100 transition duration-300"></div>
                  <Button className="relative bg-gray-100/90 backdrop-blur-xl hover:bg-gray-200/90 text-gray-900 border border-gray-300 w-24 h-24 rounded-full transition-all duration-300 group-hover/play:scale-110">
                    <Play className="w-10 h-10 ml-1" />
                  </Button>
                </div>
                
                {/* Video Info */}
                <div className="absolute bottom-8 left-8 text-gray-900">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">Demo em tempo real</span>
                  </div>
                  <h3 className="text-2xl font-light">IA executando trades automaticamente</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section with Enhanced Cards */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white"></div>
          <div className="relative max-w-7xl mx-auto px-8">
            <div className="text-center mb-20">
              <h2 className="text-6xl md:text-7xl font-extralight text-gray-900 mb-8">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Tecnologia que
                </span>
                <br />
                <span className="font-light bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  revoluciona
                </span>
              </h2>
              <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
                A convergência perfeita entre inteligência artificial e blockchain
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="group bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl hover:bg-white/90 hover:shadow-xl transition-all duration-500 overflow-hidden">
                  <CardContent className="p-10 relative">
                    {/* Background Gradient */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${feature.gradient} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className="mb-8">
                        <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                          <feature.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-light text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-lg font-extralight leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/20 to-white"></div>
          <div className="relative max-w-7xl mx-auto px-8">
            <div className="text-center mb-20">
              <h2 className="text-6xl md:text-7xl font-extralight text-gray-900 mb-8">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Simples.
                </span>
                <br />
                <span className="font-light bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Revolucionário.
                </span>
              </h2>
              <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
                Três passos para transformar sua carteira em uma máquina de lucros
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-16">
              {steps.map((step, index) => (
                <div key={index} className="text-center group relative">
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 right-0 transform translate-x-8 z-0">
                      <div className="w-16 h-px bg-gradient-to-r from-purple-300/50 to-transparent"></div>
                    </div>
                  )}
                  
                  <div className="relative z-10">
                    <div className="mb-8">
                      {/* Step Number with Enhanced Styling */}
                      <div className="text-8xl font-extralight text-transparent bg-gradient-to-br from-purple-200/60 to-blue-200/60 bg-clip-text mb-4 group-hover:from-purple-300/80 group-hover:to-blue-300/80 transition-all duration-500">
                        {step.number}
                      </div>
                      
                      {/* Step Icon */}
                      <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        {step.icon}
                      </div>
                      
                      <h3 className="text-2xl font-light text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-lg font-extralight group-hover:text-gray-700 transition-colors duration-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/10 via-transparent to-transparent"></div>
          
          <div className="relative max-w-5xl mx-auto px-8 text-center">
            <h2 className="text-6xl md:text-7xl font-extralight text-gray-900 mb-8 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Pronto para
              </span>
              <br />
              <span className="font-light bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                transformar
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                seu futuro?
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 font-light mb-16 max-w-3xl mx-auto leading-relaxed">
              Junte-se aos traders que escolheram a descentralização,<br />
              a inteligência artificial e o crescimento exponencial
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative">
                  <WalletConnect />
                </div>
              </div>
              
              <Button variant="outline" className="border-gray-300 bg-gray-100/50 backdrop-blur-xl text-gray-900 hover:bg-gray-200/50 hover:border-gray-400 px-10 py-6 rounded-3xl font-light text-lg transition-all duration-300">
                Explorar Documentação
              </Button>
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="py-20 border-t border-gray-200 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-gray-50/50 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center space-x-4 mb-8 sm:mb-0">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-lg">
                  <Infinity className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-extralight text-gray-900">MemeMoon Flow</span>
              </div>
              
              <div className="text-center sm:text-right">
                <p className="text-gray-500 text-sm mb-2">
                  © 2024 MemeMoon Flow. Powered by Solana blockchain.
                </p>
                <p className="text-gray-400 text-xs">
                  Construído para o futuro descentralizado
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default Index;
