
import React from "react";
import Layout from "@/components/Layout";
import WalletConnect from "@/components/WalletConnect";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bot, Network, Shield, Zap, Infinity } from "lucide-react";

const Index = () => {
  const { isConnected } = useWallet();

  const features = [
    {
      icon: Bot,
      title: "IA Trading Automatizado",
      description: "Estratégias otimizadas por inteligência artificial, sem esforço manual."
    },
    {
      icon: Network,
      title: "Sistema de comissões multinível (V1 a V8)",
      description: "Ganhe comissões com base no crescimento e performance da sua rede."
    },
    {
      icon: Shield,
      title: "Transparência total",
      description: "Toda movimentação é registrada na blockchain Solana."
    },
    {
      icon: Zap,
      title: "Web3 Login com Carteira",
      description: "Sem senha. Sem e-mail. Só conectar a Phantom."
    },
    {
      icon: Infinity,
      title: "Performance Fee Inteligente",
      description: "Taxa cobrada apenas quando há lucro. Tudo distribuído de forma automática."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Conecte sua carteira Solana",
      description: "Instale a Phantom e conecte em segundos"
    },
    {
      number: "2", 
      title: "Ative o IA Trading",
      description: "Configure suas estratégias automatizadas"
    },
    {
      number: "3",
      title: "Receba lucros e comissões da rede em tempo real",
      description: "Acompanhe seus ganhos no dashboard"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800 text-white">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-8 py-16">
          {/* Header Principal */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">100% Web3 · Blockchain Solana</span>
            </div>
            
            <h1 className="text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              🚀 MemeMoon Flow
            </h1>
            
            <h2 className="text-2xl text-slate-300 mb-8 font-light max-w-4xl mx-auto leading-relaxed">
              A primeira plataforma 100% Web3 de <span className="text-white font-semibold">IA Trading com Marketing de Rede</span> na Solana
            </h2>

            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-xl text-slate-400 font-light leading-relaxed">
                🧠 <strong className="text-white">Inteligência Artificial + Comissões em Rede</strong><br/>
                Conecte sua carteira Solana e ative um sistema de trading automatizado por IA.<br/>
                Ganhe comissões através de um modelo de marketing multinível transparente e on-chain.
              </p>
            </div>
          </div>

          {/* Grid Principal - Wallet Connect + Info */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Coluna da esquerda - Wallet Connect */}
            <div className="order-2 lg:order-1">
              <WalletConnect />
              
              {isConnected && (
                <div className="mt-6 text-center">
                  <a href="/dashboard">
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg flex items-center gap-3 mx-auto">
                      Acessar Dashboard
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </a>
                </div>
              )}
            </div>

            {/* Coluna da direita - Destaque */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-3xl font-bold mb-6 text-white">
                  🎯 Lucros com IA.<br/>
                  Crescimento com rede.<br/>
                  Controle com Web3.
                </h3>
                
                <div className="space-y-4 text-slate-300">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Trading 24/7 automatizado</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Comissões de rede V1 → V8</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Contratos verificáveis on-chain</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seção Por que usar */}
          <div className="mb-20">
            <h3 className="text-4xl font-bold text-center mb-4 text-white">
              🔥 Por que usar o MemeMoon Flow?
            </h3>
            <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
              Tecnologia de ponta combinada com um modelo de negócios inovador
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Seção Como começar */}
          <div className="text-center">
            <h3 className="text-4xl font-bold mb-4 text-white">
              🌐 Comece em 3 passos simples
            </h3>
            <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
              Do zero ao lucro em poucos minutos
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                      {step.number}
                    </div>
                    <h4 className="font-semibold text-white mb-3 text-lg">{step.title}</h4>
                    <p className="text-slate-400 text-sm">{step.description}</p>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-slate-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
