
import React from "react";
import NetworkStats from "./NetworkStats";
import DownlineStats from "./DownlineStats";

interface TabComponentsProps {
  activeTab: string;
  stats: {
    totalMembers: number;
    totalVolume: number;
    directReferrals: number;
    totalCommissions: number;
    monthlyCommissions: number;
    networkDepth: string;
    activeMembers: number;
  };
  downlineStats: {
    totalMembers: number;
    activeMembers: number;
    inactiveMembers: number;
    directDownlines: number;
    currentDownlines: number;
    currentDirect: number;
  };
  teamMembers: {
    id: string;
    username: string;
    joinDate: string;
    teamSize: number;
    rank?: number;
  }[];
}

const TabComponents: React.FC<TabComponentsProps> = ({
  activeTab,
  stats,
  downlineStats,
  teamMembers,
}) => {
  switch (activeTab) {
    case "downline":
      return (
        <>
          <NetworkStats
            totalMembers={stats.totalMembers}
            totalVolume={stats.totalVolume}
          />
          <DownlineStats stats={downlineStats} teamMembers={teamMembers} />
        </>
      );
    case "trading":
      return (
        <>
          <NetworkStats
            totalMembers={stats.totalMembers}
            totalVolume={stats.totalVolume}
          />
          <div className="text-center py-12">
            <p className="text-gray-400">Trading analytics coming soon...</p>
          </div>
        </>
      );
    case "commissions":
      return (
        <>
          <NetworkStats
            totalMembers={stats.totalMembers}
            totalVolume={stats.totalVolume}
          />
          <div className="text-center py-12">
            <p className="text-gray-400">Commission details coming soon...</p>
          </div>
        </>
      );
    default:
      return (
        <>
          <NetworkStats
            totalMembers={stats.totalMembers}
            totalVolume={stats.totalVolume}
          />
          <DownlineStats stats={downlineStats} teamMembers={teamMembers} />
        </>
      );
  }
};

export default TabComponents;
