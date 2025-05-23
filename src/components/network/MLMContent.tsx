
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, Infinity } from 'lucide-react';
import { Rank } from './TabComponents';

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
  // Calculate commission distribution example for 100 SOL profit
  const profitExample = 100;
  const performanceFee = profitExample * 0.3;
  const masterTraderFee = profitExample * 0.1;
  const networkFee = profitExample * 0.2;

  return (
    <>
      {/* MLM Stats Cards */}
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
      
      {/* MLM Structure Card */}
      <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Unilevel Matrix with Rank Compression</CardTitle>
          <p className="text-gray-400">20% of performance fee distributed via rank-based top-down compression</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Distribution table */}
            <div className="w-full md:w-1/2">
              <h3 className="text-white font-semibold mb-3">Bonus Distribution by Rank</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-gray-400 py-3 px-4">Rank</th>
                      <th className="text-right text-gray-400 py-3 px-4">Percentage</th>
                      <th className="text-right text-gray-400 py-3 px-4">Example (100 SOL profit)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(rankPercents).map(([rank, percent]) => (
                      <tr key={rank} className="border-b border-white/10 hover:bg-white/5">
                        <td className="py-3 px-4">
                          <div className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full w-fit">
                            {rank}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-white text-right">
                          {percent}%
                        </td>
                        <td className="py-3 px-4 text-green-400 text-right font-medium">
                          {(percent * profitExample / 100).toFixed(2)} SOL
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Example card */}
            <div className="w-full md:w-1/2">
              <h3 className="text-white font-semibold mb-3">Commission Distribution Example</h3>
              <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                <p className="text-gray-300 mb-3">For a trade profit of <span className="text-white font-bold">100 SOL</span>:</p>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total performance fee (30%)</span>
                    <span className="text-white font-medium">{performanceFee.toFixed(2)} SOL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Master trader (10%)</span>
                    <span className="text-white font-medium">{masterTraderFee.toFixed(2)} SOL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Network distribution (20%)</span>
                    <span className="text-white font-medium">{networkFee.toFixed(2)} SOL</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 text-sm">
                    <p className="text-white mb-2">In a typical upline structure:</p>
                    <ul className="space-y-2 text-gray-300">
                      <li>V1 receives 2 SOL (2%)</li>
                      <li>V3 receives 6 SOL (6%)</li>
                      <li>V5 receives 11 SOL (11%)</li>
                      <li>V8 receives the remaining 1 SOL (20% total)</li>
                    </ul>
                    <p className="mt-4 text-blue-400">The system ensures all 20% is distributed efficiently</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-white font-semibold mb-3">Rank Requirements</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-gray-400 py-3 px-4">Rank</th>
                    <th className="text-left text-gray-400 py-3 px-4">Profit Volume (SOL)</th>
                    <th className="text-left text-gray-400 py-3 px-4">Required Lines</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(rankRequirements).map(([rank, req]) => (
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg mt-6 border border-white/10">
            <p className="text-white text-center">
              Network depth is unlimited: commissions flow up line by line until reaching qualified ranks
            </p>
          </div>
          
          <div className="mt-6">
            <h3 className="text-white font-semibold mb-3">How Top-Down Compression Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                <h4 className="text-white font-medium mb-2">Complete Distribution</h4>
                <p className="text-gray-300 text-sm">
                  The system always distributes the full 20% commission, starting from the lowest ranks (V1)
                  and working upward. If a qualified rank is not found, the commission flows up until it finds
                  a qualified recipient.
                </p>
              </div>
              <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                <h4 className="text-white font-medium mb-2">Rank Benefits</h4>
                <p className="text-gray-300 text-sm">
                  Higher ranks receive substantially higher percentages. If all ranks aren't present in an upline,
                  any remaining commission that wasn't distributed goes to the highest qualified rank found.
                </p>
              </div>
            </div>
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
          
          <div className="bg-black/40 rounded-lg p-4 border border-white/10 mt-4">
            <h4 className="text-white font-medium mb-2">Solana Integration</h4>
            <p className="text-gray-300 text-sm">
              All commissions are calculated and distributed automatically on the Solana blockchain,
              ensuring transparency, speed, and minimal fees.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default MLMContent;
