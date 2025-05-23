
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, Infinity } from 'lucide-react';

interface MLMStatsCardsProps {
  stats: {
    totalMembers: number;
    activeMembers: number;
    totalVolume: number;
    averageRank: number;
    directReferrals: number;
  };
}

const MLMStatsCards: React.FC<MLMStatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Members</p>
              <p className="text-2xl font-bold text-white">{stats.totalMembers.toLocaleString()}</p>
              <p className="text-green-400 text-sm">+12% this month</p>
            </div>
            <Users className="h-8 w-8 text-blue-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Volume</p>
              <p className="text-2xl font-bold text-white">{stats.totalVolume.toLocaleString()} SOL</p>
              <p className="text-green-400 text-sm">+8.5% this month</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Network Depth</p>
              <p className="text-2xl font-bold text-white">∞ levels</p>
              <p className="text-blue-400 text-sm">{stats.activeMembers} active</p>
            </div>
            <Infinity className="h-8 w-8 text-purple-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MLMStatsCards;
