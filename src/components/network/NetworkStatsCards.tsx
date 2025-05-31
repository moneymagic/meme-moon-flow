
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, DollarSign } from 'lucide-react';
import { useReferralSystem } from '@/hooks/useReferralSystem';

const NetworkStatsCards: React.FC = () => {
  const { referralStats, loading } = useReferralSystem();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-slate-600 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-slate-600 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: "Total de Membros",
      value: referralStats.totalReferrals,
      icon: Users,
      iconColor: "text-blue-400"
    },
    {
      title: "Volume Total",
      value: "0 SOL",
      icon: TrendingUp,
      iconColor: "text-green-400"
    },
    {
      title: "Comissões Ganhas",
      value: `${referralStats.totalEarnings.toFixed(4)} SOL`,
      icon: DollarSign,
      iconColor: "text-yellow-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-light">{stat.title}</p>
                  <p className="text-3xl font-light text-white mt-1">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.iconColor}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default NetworkStatsCards;
