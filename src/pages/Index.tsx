
import React from "react";
import Layout from "@/components/Layout";
import WalletConnect from "@/components/WalletConnect";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bot, Network, Shield, Zap, Infinity, Play } from "lucide-react";

const Index = () => {
  const { isConnected } = useWallet();

  const features = [
    {
      icon: Bot,
      title: "IA Trading Automatizado",
      description: "Estratégias otimizadas por inteligência artificial para maximizar seus lucros 24/7."
    },
    {
      icon: Network,
      title: "Sistema Multinível V1-V8",
      description: "Construa sua rede e receba comissões escaláveis de forma transparente."
    },
    {
      icon: Shield,
      title: "Transparência Blockchain",
      description: "Todas as operações registradas na Solana para total auditabilidade."
    },
    {
      icon: Zap,
      title: "Login Web3 Instantâneo",
      description: "Conecte sua Phantom e comece imediatamente. Sem cadastros complexos."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Conecte sua carteira",
      description: "Use Phantom ou qualquer carteira Solana compatível"
    },
    {
      number: "02", 
      title: "Configure estratégias de IA",
      description: "Personalize o bot conforme seu perfil de risco"
    },
    {
      number: "03",
      title: "Monitore resultados",
      description: "Acompanhe lucros e comissões em tempo real"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-8 py-32">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-6 py-3 mb-8">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-600">Powered by Solana Blockchain</span>
              </div>
              
              <h1 className="text-7xl font-light text-slate-900 mb-6 tracking-tight leading-[0.9]">
                MemeMoon<br />
                <span className="font-medium">Flow</span>
              </h1>
              
              <p className="text-2xl text-slate-600 mb-12 font-light max-w-3xl mx-auto leading-relaxed">
                A primeira plataforma de trading com IA e marketing multinível<br />
                completamente descentralizada na blockchain Solana.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
                <div className="w-full sm:w-auto">
                  <WalletConnect />
                </div>
                
                {isConnected && (
                  <a href="/dashboard">
                    <Button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 rounded-2xl font-medium text-lg flex items-center gap-3">
                      Acessar Dashboard
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Video Demo Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-5xl mx-auto px-8">
            <div className="relative bg-slate-900 rounded-3xl overflow-hidden aspect-video flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
              <Button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 w-20 h-20 rounded-full">
                <Play className="w-8 h-8 ml-1" />
              </Button>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm opacity-80">Veja como funciona</p>
                <h3 className="text-xl font-medium">Trading automatizado em ação</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32">
          <div className="max-w-6xl mx-auto px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-light text-slate-900 mb-6">
                Tecnologia que<br />
                <span className="font-medium">funciona para você</span>
              </h2>
              <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto">
                Combine inteligência artificial com transparência blockchain
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-none bg-slate-50/50 rounded-3xl hover:bg-slate-100/50 transition-all duration-500 group">
                  <CardContent className="p-12">
                    <div className="mb-8">
                      <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-medium text-slate-900 mb-4">{feature.title}</h3>
                      <p className="text-slate-600 text-lg font-light leading-relaxed">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-32 bg-slate-50">
          <div className="max-w-6xl mx-auto px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-light text-slate-900 mb-6">
                Simples.<br />
                <span className="font-medium">Poderoso.</span>
              </h2>
              <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto">
                Três passos para começar a ganhar com IA
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-16">
              {steps.map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="mb-8">
                    <div className="text-6xl font-light text-slate-300 mb-6 group-hover:text-slate-400 transition-colors duration-500">
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-medium text-slate-900 mb-4">{step.title}</h3>
                    <p className="text-slate-600 text-lg font-light">{step.description}</p>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 right-0 transform translate-x-8">
                      <ArrowRight className="w-6 h-6 text-slate-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-5xl font-light text-slate-900 mb-6">
              Pronto para<br />
              <span className="font-medium">revolucionar</span><br />
              seu trading?
            </h2>
            <p className="text-xl text-slate-600 font-light mb-12 max-w-2xl mx-auto">
              Junte-se aos traders que escolheram a descentralização e a inteligência artificial
            </p>
            
            <div className="inline-flex flex-col sm:flex-row gap-6">
              <WalletConnect />
              <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 rounded-2xl font-medium text-lg">
                Saiba mais
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-6 sm:mb-0">
                <div className="w-8 h-8 bg-slate-900 rounded-2xl flex items-center justify-center">
                  <Infinity className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-light text-slate-900">MemeMoon Flow</span>
              </div>
              
              <p className="text-slate-500 text-sm">
                © 2024 MemeMoon Flow. Powered by Solana blockchain.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default Index;
