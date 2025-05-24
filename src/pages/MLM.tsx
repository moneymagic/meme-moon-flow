
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MLMHeader from "@/components/network/mlm/MLMHeader";
import MLMStatsCards from "@/components/network/mlm/MLMStatsCards";
import MLMMainContent from "@/components/network/mlm/MLMMainContent";
import ReferralCard from "@/components/network/mlm/ReferralCard";
import NetworkVisualizationCard from "@/components/network/mlm/NetworkVisualizationCard";
import CommissionCard from "@/components/network/mlm/CommissionCard";
import TopPerformers from "@/components/network/mlm/TopPerformers";
import { useToast } from "@/components/ui/use-toast";
import { rankCommissionPercentages } from "@/services/RankService";

const MLM = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("overview");
  
  const [networkStats, setNetworkStats] = useState({
    totalMembers: 165,
    activeMembers: 98,
    totalVolume: 1289.5,
    averageRank: 2.3,
    directReferrals: 8
  });

  const topPerformers = [
    {
      name: "user123.sol",
      level: 2,
      earnings: "5.23 SOL",
      referrals: 12
    },
    {
      name: "crypto_whale.sol",
      level: 1,
      earnings: "4.87 SOL",
      referrals: 8
    },
    {
      name: "blockchain_dev.sol",
      level: 3,
      earnings: "3.61 SOL",
      referrals: 6
    }
  ];

  const handleTabChange = (value: string) => {
    setTab(value);
  };

  const levels = [
    { level: 1, members: 8, commission: "10%", earnings: "1.25 SOL" },
    { level: 2, members: 23, commission: "8%", earnings: "2.18 SOL" },
    { level: 3, members: 47, commission: "6%", earnings: "3.64 SOL" },
    { level: 4, members: 87, commission: "4%", earnings: "5.12 SOL" }
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setNetworkStats({
        totalMembers: 212,
        activeMembers: 150,
        totalVolume: 2100.75,
        averageRank: 2.8,
        directReferrals: 15
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch network data. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
      <MLMHeader />
      <div className="container mx-auto px-8 py-12">
        <MLMStatsCards stats={networkStats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
              <Tabs value={tab} onValueChange={handleTabChange}>
                <TabsList className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-1">
                  <TabsTrigger 
                    value="overview" 
                    className="rounded-xl font-medium data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
                  >
                    Visão Geral
                  </TabsTrigger>
                  <TabsTrigger 
                    value="commission" 
                    className="rounded-xl font-medium data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
                  >
                    Comissões
                  </TabsTrigger>
                  <TabsTrigger 
                    value="compression" 
                    className="rounded-xl font-medium data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
                  >
                    Compressão
                  </TabsTrigger>
                </TabsList>
                <MLMMainContent 
                  tab={tab} 
                  rankPercentages={rankCommissionPercentages} 
                  levels={levels}
                />
              </Tabs>
            </div>
            
            <TopPerformers topPerformers={topPerformers} />
          </div>
          
          <div className="space-y-8">
            <ReferralCard directReferrals={networkStats.directReferrals} />
            <NetworkVisualizationCard />
            <CommissionCard monthlyCommissions={890} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLM;
