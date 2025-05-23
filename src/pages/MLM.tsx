
import { useState } from 'react';
import { TopPerformers } from '@/components/network/mlm/TopPerformers';
import { Rank } from '@/components/network/TabComponents';
import { Upline } from '@/services/CommissionTypes';
import MLMHeader from '@/components/network/mlm/MLMHeader';
import MLMStatsCards from '@/components/network/mlm/MLMStatsCards';
import MLMMainContent from '@/components/network/mlm/MLMMainContent';
import ReferralCard from '@/components/network/mlm/ReferralCard';
import NetworkVisualizationCard from '@/components/network/mlm/NetworkVisualizationCard';
import CommissionCard from '@/components/network/mlm/CommissionCard';

const MLM = () => {
  const networkStats = {
    totalMembers: 1247,
    directReferrals: 23,
    totalCommissions: 4560,
    monthlyCommissions: 890,
    networkDepth: "∞", // Changed to infinity symbol
    activeMembers: 1089
  };

  const levels = [
    { level: 1, members: 23, commission: '5%', earnings: '₴ 345' },
    { level: 2, members: 89, commission: '3%', earnings: '₴ 234' },
    { level: 3, members: 156, commission: '2%', earnings: '₴ 187' },
    { level: 4, members: 234, commission: '1%', earnings: '₴ 98' },
    { level: 5, members: 345, commission: '0.5%', earnings: '₴ 67' },
  ];

  const topPerformers = [
    { name: '9mF2...7x8s', level: 1, earnings: '₴ 1,250', referrals: 45 },
    { name: '3kR1...9pL4', level: 1, earnings: '₴ 980', referrals: 38 },
    { name: '8nQ7...2mK9', level: 2, earnings: '₴ 750', referrals: 29 },
    { name: '5vB6...1dF3', level: 1, earnings: '₴ 690', referrals: 25 },
    { name: '2hW9...6tG5', level: 3, earnings: '₴ 540', referrals: 22 },
  ];
  
  // Example upline for demonstration - fixed the typing issue here
  const sampleUpline: Upline[] = [
    { id: "user1", rank: "V1" as Rank },
    { id: "user2", rank: "V3" as Rank },
    { id: "user3", rank: null },  // No rank
    { id: "user4", rank: "V2" as Rank },
    { id: "user5", rank: "V5" as Rank }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <MLMHeader />

      <div className="container mx-auto px-6 py-8">
        {/* Network Overview */}
        <MLMStatsCards networkStats={networkStats} />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* MLM Levels */}
          <div className="lg:col-span-2 space-y-6">
            <MLMMainContent levels={levels} sampleUpline={sampleUpline} />

            {/* Top Performers */}
            <TopPerformers topPerformers={topPerformers} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Commission Calculator */}
            <CommissionCard monthlyCommissions={networkStats.monthlyCommissions} />

            {/* Referral Program */}
            <ReferralCard directReferrals={networkStats.directReferrals} />

            {/* Network Visualization */}
            <NetworkVisualizationCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLM;
