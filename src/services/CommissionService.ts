
import { Rank } from "@/components/network/TabComponents";

export interface Upline {
  id: string;
  rank: Rank | null;
}

export interface CommissionDistribution {
  [userId: string]: number;
}

/**
 * Maps rank to commission percentage based on the system configuration
 */
export const rankCommissionPercentages: Record<Rank, number> = {
  'V1': 2,
  'V2': 2,
  'V3': 3,
  'V4': 2,
  'V5': 3,
  'V6': 3,
  'V7': 2,
  'V8': 3,
};

/**
 * Returns the minimum rank required to receive a specific rank's commission
 */
export function getMinimumRankRequired(rank: Rank): Rank {
  return rank;
}

/**
 * Convert string rank to numeric value for comparison
 */
export function rankToNumber(rank: Rank | null): number {
  if (!rank) return 0;
  return parseInt(rank.substring(1), 10);
}

/**
 * Check if a rank qualifies for a specific commission level
 */
export function isRankQualified(userRank: Rank | null, requiredRank: Rank): boolean {
  if (!userRank) return false;
  return rankToNumber(userRank) >= rankToNumber(requiredRank);
}

/**
 * Distributes commission across a chain of uplines based on their ranks
 * Uses compression: if an upline doesn't have the required rank for a level,
 * the commission flows up to the next qualified upline.
 * 
 * @param uplines Array of upline members sorted from closest to furthest
 * @returns Object mapping user IDs to their commission percentages
 */
export function distributeCommission(uplines: Upline[]): CommissionDistribution {
  const distribution: CommissionDistribution = {};
  const rankLevels: Rank[] = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8'];
  
  // Initialize all uplines with 0% commission
  uplines.forEach(upline => {
    distribution[upline.id] = 0;
  });

  // Process each rank level
  rankLevels.forEach(rankLevel => {
    const requiredRank = getMinimumRankRequired(rankLevel);
    const commissionPercentage = rankCommissionPercentages[rankLevel];
    
    // Find the first upline that qualifies for this rank level
    for (let i = 0; i < uplines.length; i++) {
      const upline = uplines[i];
      if (isRankQualified(upline.rank, requiredRank)) {
        // Assign commission to this upline
        distribution[upline.id] = (distribution[upline.id] || 0) + commissionPercentage;
        break;
      }
    }
  });

  return distribution;
}

/**
 * Calculates the actual SOL amount each upline receives based on the distribution percentages
 * @param distribution Commission distribution percentages
 * @param totalProfit Total profit amount in SOL
 * @returns Object mapping user IDs to their commission amounts in SOL
 */
export function calculateCommissionAmounts(distribution: CommissionDistribution, totalProfit: number): Record<string, number> {
  const result: Record<string, number> = {};
  
  // Calculate the network fee (20% of total profit)
  const networkFee = totalProfit * 0.2;
  
  Object.entries(distribution).forEach(([userId, percentage]) => {
    // Convert percentage to decimal and multiply by network fee
    result[userId] = (percentage / 100) * totalProfit;
  });
  
  return result;
}

/**
 * Process commission distribution for a specific trade profit
 * @param uplines Chain of upline members
 * @param profitAmount Total profit amount
 * @returns Detailed distribution information 
 */
export function processTradeCommission(uplines: Upline[], profitAmount: number) {
  // Calculate performance fee (30% of profit)
  const performanceFee = profitAmount * 0.3;
  
  // Calculate master trader fee (10% of profit) 
  const masterTraderFee = profitAmount * 0.1;
  
  // Calculate network fee (20% of profit)
  const networkFee = profitAmount * 0.2;
  
  // Calculate remaining profit after fees (70% of profit)
  const remainingProfit = profitAmount - performanceFee;
  
  // Calculate distribution percentages
  const distribution = distributeCommission(uplines);
  
  // Calculate actual SOL amounts
  const commissionAmounts = calculateCommissionAmounts(distribution, profitAmount);
  
  // Calculate total distributed (should equal networkFee if all ranks present)
  const totalDistributed = Object.values(commissionAmounts).reduce((sum, amount) => sum + amount, 0);
  
  return {
    profitAmount,
    performanceFee,
    masterTraderFee,
    networkFee,
    remainingProfit,
    distribution,
    commissionAmounts,
    totalDistributed
  };
}
