
import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center py-8">
        <div className="max-w-md mx-auto px-8 text-center">
          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-sm">
            <CardContent className="p-12">
              <div className="mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-900 to-slate-700 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-light text-white">404</span>
                </div>
                <h1 className="text-2xl font-light text-slate-900 mb-3 tracking-tight">Página não encontrada</h1>
                <p className="text-slate-600 font-light leading-relaxed">
                  A página que você está procurando não existe ou foi movida.
                </p>
              </div>
              
              <div className="space-y-3">
                <Link to="/">
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-2xl py-3 font-medium">
                    <Home className="w-4 h-4 mr-2" />
                    Voltar ao Início
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => window.history.back()}
                  className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 rounded-2xl py-3 font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Página Anterior
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
