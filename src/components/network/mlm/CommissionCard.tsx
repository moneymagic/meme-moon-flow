
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp } from 'lucide-react';

interface CommissionCardProps {
  monthlyCommissions?: number;
}

const CommissionCard: React.FC<CommissionCardProps> = ({ monthlyCommissions = 890 }) => {
  return (
    <Card className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/10"></div>
      <CardHeader className="relative">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-500/20 rounded-2xl">
            <TrendingUp className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <CardTitle className="text-white font-light text-xl tracking-tight">Suas Comissões</CardTitle>
            <p className="text-white/60 font-light">Ganhos da matriz unilevel</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-6">
        <div className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm">
          <p className="text-4xl font-light text-white tracking-tight">₴ {monthlyCommissions}</p>
          <p className="text-emerald-400 font-medium mt-2">este mês</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
            <span className="text-white/60 font-light">Hoje</span>
            <span className="text-white font-medium">₴ 67</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
            <span className="text-white/60 font-light">Esta semana</span>
            <span className="text-white font-medium">₴ 234</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
            <span className="text-white/60 font-light">Este mês</span>
            <span className="text-white font-medium">₴ 890</span>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h4 className="text-white font-medium mb-3 tracking-tight">Integração Solana</h4>
          <p className="text-white/70 text-sm font-light leading-relaxed">
            Todas as comissões são calculadas e distribuídas automaticamente na blockchain Solana,
            garantindo transparência, velocidade e taxas mínimas.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommissionCard;
