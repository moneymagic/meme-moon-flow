
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, DollarSign, Infinity } from 'lucide-react';

type Rank = 'V1' | 'V2' | 'V3' | 'V4' | 'V5' | 'V6' | 'V7' | 'V8';

interface MLMContentProps {
  networkStats: {
    totalMembers: number;
    totalVolume: number;
    averageRank: number;
    directReferrals: number;
    totalCommissions: number;
    monthlyCommissions: number;
    networkDepth: string;
    activeMembers: number;
  };
  rankPercents: Record<Rank, number>;
  rankRequirements: Record<Rank, { sol: number, linesWithRank: Rank | null }>;
  topPerformers: { name: string; level: number; earnings: string; referrals: number; }[];
  levels: { level: number; members: number; commission: string; earnings: string; }[];
}

const MLMContent: React.FC<MLMContentProps> = ({ 
  networkStats,
  rankPercents,
  rankRequirements,
  topPerformers,
  levels
}) => {
  return (
    <>
      {/* MLM Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Members</p>
                <p className="text-2xl font-bold text-white">{networkStats.totalMembers.toLocaleString()}</p>
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
                <p className="text-gray-400 text-sm">Total Commissions</p>
                <p className="text-2xl font-bold text-white">₴ {networkStats.totalCommissions.toLocaleString()}</p>
                <p className="text-green-400 text-sm">+8.5% this month</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Network Depth</p>
                <p className="text-2xl font-bold text-white">{networkStats.networkDepth} levels</p>
                <p className="text-blue-400 text-sm">{networkStats.activeMembers} active</p>
              </div>
              <Infinity className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Rank Requirements */}
      <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Rank Requirements</CardTitle>
          <p className="text-gray-400">Volume and qualified line requirements for each rank</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-gray-400 py-3 px-4">Rank</th>
                  <th className="text-left text-gray-400 py-3 px-4">Volume (SOL)</th>
                  <th className="text-left text-gray-400 py-3 px-4">Required Lines</th>
                  <th className="text-left text-gray-400 py-3 px-4">Commission %</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(rankRequirements).map(([rank, req], index) => (
                  <tr key={rank} className="border-b border-white/10 hover:bg-white/5">
                    <td className="py-3 px-4">
                      <div className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full w-fit">
                        {rank}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-white">{req.sol} SOL</td>
                    <td className="py-3 px-4 text-white">
                      {req.linesWithRank ? `2 lines with ${req.linesWithRank}` : 'None'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full w-fit">
                        {rankPercents[rank as Rank]}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg mt-4 border border-white/10">
            <p className="text-white text-center">
              Network depth is unlimited: commissions flow up line by line until reaching qualified ranks
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Top Performers */}
      <Card className="bg-black/30 border-white/10 backdrop-blur-sm mt-6">
        <CardHeader>
          <CardTitle className="text-white">Top Performers</CardTitle>
          <p className="text-gray-400">Members generating the most commissions in your network</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-orange-500 p-2 rounded-full">
                    <span className="text-white text-xs font-bold">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium font-mono">{performer.name}</p>
                    <p className="text-gray-400 text-sm">Level {performer.level} • {performer.referrals} referrals</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-bold">{performer.earnings}</p>
                  <p className="text-gray-400 text-sm">this month</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Your Commissions */}
      <Card className="bg-black/30 border-white/10 backdrop-blur-sm mt-6">
        <CardHeader>
          <CardTitle className="text-white">Your Commissions</CardTitle>
          <p className="text-gray-400">Earnings from the unilevel matrix</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">₴ {networkStats.monthlyCommissions}</p>
            <p className="text-green-400">this month</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Today</span>
              <span className="text-white">₴ 67</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">This week</span>
              <span className="text-white">₴ 234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">This month</span>
              <span className="text-white">₴ 890</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default MLMContent;
