
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface DashboardBalanceProps {
  balance: number;
}

const DashboardBalance: React.FC<DashboardBalanceProps> = ({ balance }) => {
  return (
    <Card className="mb-8 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-sm">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-slate-600 font-light text-sm">Saldo Disponível</p>
              <p className="text-3xl font-light text-slate-900 tracking-tight">{balance} SOL</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200/50 rounded-2xl px-4 py-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-sm font-medium text-emerald-700">Ativo</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardBalance;
