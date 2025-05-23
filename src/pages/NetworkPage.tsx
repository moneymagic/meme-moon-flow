
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from '@/components/ui/progress';
import { ArrowUpRight, Users, TrendingUp, Network, Share2, Award, DollarSign, Infinity, ChevronDown } from 'lucide-react';
import Layout from "@/components/Layout";

type Rank = 'V1' | 'V2' | 'V3' | 'V4' | 'V5' | 'V6' | 'V7' | 'V8';

const NetworkPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Network overview data
  const networkStats = {
    totalMembers: 1247,
    totalVolume: 398,
    averageRank: 2.1,
    directReferrals: 23,
    totalCommissions: 4560,
    monthlyCommissions: 890,
    networkDepth: "∞",
    activeMembers: 1089
  };

  // Downline stats
  const downlineStats = {
    totalMembers: 121965,
    activeMembers: 4,
    inactiveMembers: 95,
    beginnerTeam: 583,
    intermediateTeam: 20,
    directDownlines: 4,
    maxTeamRequirement: 20,
    currentTeam: 2,
    maxDownlinesRequirement: 1500,
    currentDownlines: 621,
    maxDirectRequirement: 20,
    currentDirect: 4
  };

  // Network members data
  const networkData = [
    { 
      user: "Alex M.", 
      level: 1, 
      volume: 32,
      rank: "V2",
      referrals: 3
    },
    { 
      user: "Sarah K.", 
      level: 1, 
      volume: 105,
      rank: "V3", 
      referrals: 4
    },
    { 
      user: "Marcus T.", 
      level: 2, 
      volume: 25,
      rank: "V2",
      referrals: 1
    },
    { 
      user: "Lisa P.", 
      level: 2, 
      volume: 46,
      rank: "V2",
      referrals: 2
    },
    { 
      user: "John D.", 
      level: 3, 
      volume: 12,
      rank: "V1",
      referrals: 0
    }
  ];

  // MLM ranks and commission structure
  const rankPercents: Record<Rank, number> = {
    V1: 2,
    V2: 2,
    V3: 2,
    V4: 2,
    V5: 2,
    V6: 2,
    V7: 2,
    V8: 6,
  };

  const rankRequirements: Record<Rank, { sol: number, linesWithRank: Rank | null }> = {
    V1: { sol: 0, linesWithRank: null },
    V2: { sol: 34, linesWithRank: null },
    V3: { sol: 120, linesWithRank: 'V2' },
    V4: { sol: 200, linesWithRank: 'V3' },
    V5: { sol: 400, linesWithRank: 'V4' },
    V6: { sol: 800, linesWithRank: 'V5' },
    V7: { sol: 1600, linesWithRank: 'V6' },
    V8: { sol: 3200, linesWithRank: 'V7' },
  };

  // Team members downline data
  const teamMembers = [
    { 
      id: '1', 
      username: '3gu***7u*', 
      joinDate: '2024-09-30', 
      teamSize: 1 
    },
    { 
      id: '2', 
      username: 'lea***sar', 
      joinDate: '2024-02-04', 
      teamSize: 14,
      rank: 2
    },
    { 
      id: '3', 
      username: 'Fab***der', 
      joinDate: '2024-01-16', 
      teamSize: 1,
      rank: 1
    },
    { 
      id: '4', 
      username: 'dud***yal', 
      joinDate: '2024-01-11', 
      teamSize: 1,
      rank: 1
    },
    { 
      id: '5', 
      username: 'Vip***ho', 
      joinDate: '2024-01-11', 
      teamSize: 11,
      rank: 1
    },
  ];

  // Top performing networkers
  const topPerformers = [
    { name: '9mF2...7x8s', level: 1, earnings: '₴ 1,250', referrals: 45 },
    { name: '3kR1...9pL4', level: 1, earnings: '₴ 980', referrals: 38 },
    { name: '8nQ7...2mK9', level: 2, earnings: '₴ 750', referrals: 29 },
    { name: '5vB6...1dF3', level: 1, earnings: '₴ 690', referrals: 25 },
    { name: '2hW9...6tG5', level: 3, earnings: '₴ 540', referrals: 22 },
  ];

  // Sample ranks for the rank table
  const levels = [
    { level: 1, members: 23, commission: '5%', earnings: '₴ 345' },
    { level: 2, members: 89, commission: '3%', earnings: '₴ 234' },
    { level: 3, members: 156, commission: '2%', earnings: '₴ 187' },
    { level: 4, members: 234, commission: '1%', earnings: '₴ 98' },
    { level: 5, members: 345, commission: '0.5%', earnings: '₴ 67' },
  ];

  // Utility function to calculate progress percentage
  const calculateProgress = (current: number, max: number): number => {
    return Math.min((current / max) * 100, 100);
  };

  // Utility function to format numbers
  const formatNumber = (num: number): string => {
    return num.toLocaleString('pt-BR');
  };

  // Rank icon component
  const RankIcon = ({ rank }: { rank?: number }) => {
    if (!rank) return null;
    
    return (
      <span className="inline-flex items-center justify-center ml-1">
        <Award className="h-4 w-4 text-blue-400" />
      </span>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-8">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-white mb-6">Network</h1>

          <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-8 bg-black/30">
              <TabsTrigger value="overview" className="text-white data-[state=active]:bg-blue-600">Overview</TabsTrigger>
              <TabsTrigger value="downline" className="text-white data-[state=active]:bg-blue-600">Downline</TabsTrigger>
              <TabsTrigger value="mlm" className="text-white data-[state=active]:bg-blue-600">MLM Structure</TabsTrigger>
            </TabsList>
            
            {/* Network Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Network Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Total Members</p>
                        <p className="text-2xl font-bold text-white mt-1">{networkStats.totalMembers}</p>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-lg">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Total Volume</p>
                        <p className="text-2xl font-bold text-white mt-1">{networkStats.totalVolume} SOL</p>
                      </div>
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Average Rank</p>
                        <p className="text-2xl font-bold text-white mt-1">V{networkStats.averageRank}</p>
                      </div>
                      <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-3 rounded-lg">
                        <ArrowUpRight className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Network Members Table */}
              <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Network Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left text-gray-400 py-3 px-4">User</th>
                          <th className="text-left text-gray-400 py-3 px-4">Level</th>
                          <th className="text-left text-gray-400 py-3 px-4">Rank</th>
                          <th className="text-left text-gray-400 py-3 px-4">Volume</th>
                          <th className="text-left text-gray-400 py-3 px-4">Referrals</th>
                        </tr>
                      </thead>
                      <tbody>
                        {networkData.map((member, index) => (
                          <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                            <td className="py-3 px-4">
                              <span className="text-white">{member.user}</span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full w-fit">
                                Level {member.level}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full w-fit">
                                {member.rank}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-white">{member.volume} SOL</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-white">{member.referrals}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Downline Details Tab */}
            <TabsContent value="downline" className="space-y-6">
              {/* Main Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card className="bg-blue-600/30 border-white/10 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-lg">Team Count</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col">
                      <p className="text-3xl font-bold text-white">{formatNumber(downlineStats.totalMembers)} <span className="text-sm font-normal text-white/70">people</span></p>
                      <div className="text-sm text-white/70 mt-4">
                        <p>Activated yesterday</p>
                        <p>0 people</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-600/30 border-white/10 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-lg">Cumulative Profit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col">
                      <p className="text-3xl font-bold text-white">183986 <span className="text-sm font-normal text-white/70">SOL</span></p>
                      <div className="text-sm text-white/70 mt-4">
                        <p>Profit for today</p>
                        <p>0 SOL</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Global Team Progress */}
              <Card className="bg-black/30 border-white/10 backdrop-blur-sm mb-6">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span>Global Team</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Direct downline count</span>
                        <span className="text-gray-300">({downlineStats.currentDirect}/{downlineStats.maxDirectRequirement})</span>
                      </div>
                      <Progress value={calculateProgress(downlineStats.currentDirect, downlineStats.maxDirectRequirement)} className="h-2 bg-gray-700" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Team count</span>
                        <span className="text-gray-300">({formatNumber(downlineStats.currentDownlines)}/{formatNumber(downlineStats.maxDownlinesRequirement)})</span>
                      </div>
                      <Progress value={calculateProgress(downlineStats.currentDownlines, downlineStats.maxDownlinesRequirement)} className="h-2 bg-gray-700" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Team</span>
                        <span className="text-gray-300">({downlineStats.currentTeam}/{downlineStats.maxTeamRequirement})</span>
                      </div>
                      <Progress value={calculateProgress(downlineStats.currentTeam, downlineStats.maxTeamRequirement)} className="h-2 bg-gray-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Direct Downline */}
              <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center">
                    <span>Direct Downline</span>
                    <ChevronDown className="ml-2 h-5 w-5" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-amber-50/10 rounded-lg p-4 mb-6">
                    <p className="text-gray-300 text-sm">
                      Data is counted once per hour and is counted daily
                      according to Singapore time (UTC + 8).
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="text-center">
                        <p className="text-white font-bold text-xl">{downlineStats.activeMembers} people</p>
                        <p className="text-gray-300">Activated</p>
                      </div>
                      <div className="text-center">
                        <p className="text-white font-bold text-xl">{downlineStats.inactiveMembers} people</p>
                        <p className="text-gray-300">Deactivated</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-white text-lg font-medium mb-4">Team (Activated)</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-lg text-center">
                        <p className="text-gray-300 mb-1">Beginner</p>
                        <p className="text-white font-bold text-2xl">{downlineStats.beginnerTeam} <span className="text-sm font-normal">people</span></p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg text-center">
                        <p className="text-gray-300 mb-1">Intermediate</p>
                        <p className="text-white font-bold text-2xl">{downlineStats.intermediateTeam} <span className="text-sm font-normal">people</span></p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-8 mb-4">
                      <h3 className="text-white text-lg font-medium">Direct downline details</h3>
                      <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                        All
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {teamMembers.map((member) => (
                        <div key={member.id} className="border-b border-white/10 pb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="bg-gray-700 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                                <Users className="h-5 w-5 text-gray-300" />
                              </div>
                              <div>
                                <p className="text-white font-medium">
                                  {member.username}
                                  <RankIcon rank={member.rank} />
                                </p>
                                <p className="text-gray-400 text-sm">{member.joinDate}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-gray-300">Team count:</p>
                              <p className="text-white">{member.teamSize}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* MLM Structure Tab */}
            <TabsContent value="mlm" className="space-y-6">
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
              <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
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
              <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default NetworkPage;
