import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Sparkles, TrendingUp, Users, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'IA Trading',
      description: 'Algoritmos inteligentes que operam automaticamente no mercado',
    },
    {
      icon: Users,
      title: 'Rede MLM',
      description: 'Construa sua rede e ganhe comissões recorrentes',
    },
    {
      icon: Shield,
      title: 'Blockchain Solana',
      description: 'Transparência e segurança garantidas pela tecnologia',
    },
  ];

  return (
    <Layout>
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative py-24 px-8">
          <div className="max-w-6xl mx-auto text-center">
            {/* Hero Content */}
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full px-6 py-3 mb-8">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Powered by Solana Blockchain</span>
              </div>
              
              <h1 className="text-6xl font-extralight text-slate-900 mb-6 tracking-tight leading-tight">
                O futuro dos
                <span className="block font-light bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  investimentos inteligentes
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
                Combine copy trading automatizado com uma poderosa rede de afiliados. 
                Ganhe enquanto outros ganham, tudo transparente na blockchain Solana.
              </p>
              
              <div className="flex items-center justify-center space-x-4">
                <Link to="/dashboard">
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-2xl px-8 py-3 text-base font-medium shadow-lg shadow-slate-900/25 transition-all duration-200">
                    Começar Agora
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/network">
                  <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 rounded-2xl px-8 py-3 text-base font-medium">
                    Explorar Rede
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-8 bg-gradient-to-b from-slate-50/50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-slate-900 mb-4 tracking-tight">
                Tecnologia que funciona
              </h2>
              <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
                Construído para ser simples, poderoso e transparente
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-medium text-slate-900 mb-3 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 font-light leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-0 rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                <h2 className="text-4xl font-light text-white mb-4 tracking-tight">
                  Pronto para começar?
                </h2>
                <p className="text-xl text-slate-300 font-light mb-8 max-w-2xl mx-auto">
                  Junte-se à nossa comunidade e comece a construir seu futuro financeiro hoje.
                </p>
                <Link to="/dashboard">
                  <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-2xl px-8 py-3 text-base font-medium shadow-lg transition-all duration-200">
                    Acessar Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
