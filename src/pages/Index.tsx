
import React from "react";
import Layout from "@/components/Layout";
import WalletConnect from "@/components/WalletConnect";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const { isConnected } = useWallet();

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light text-slate-900 mb-6 tracking-tight">
              MemeMoon Flow
            </h1>
            <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
              Plataforma descentralizada de copy trading e network marketing em Solana
            </p>
          </div>

          {/* Grid principal */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Coluna da esquerda - Informações */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-light text-slate-900 tracking-tight">
                  Trading Automatizado Web3
                </h2>
                <p className="text-slate-600 font-light leading-relaxed">
                  Conecte sua carteira Solana e comece a acompanhar os melhores traders da rede. 
                  Ganhe comissões através do nosso sistema de network marketing descentralizado.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-700 font-light">Copy trading automatizado</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-700 font-light">Sistema de comissões por níveis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-slate-700 font-light">Transparência total on-chain</span>
                </div>
              </div>

              {isConnected && (
                <div className="pt-4">
                  <a href="/dashboard">
                    <Button className="flex items-center gap-2 px-6 py-3">
                      Acessar Dashboard
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              )}
            </div>

            {/* Coluna da direita - Conexão da carteira */}
            <div>
              <WalletConnect />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
