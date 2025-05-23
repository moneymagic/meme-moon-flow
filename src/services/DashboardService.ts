
import { getUserNetworkStatistics } from './AffiliateService';
import { getUserBalanceData } from './UserBalanceService';
import { getTradeHistory } from './TradeService';
import { getReferralPercentages, getNetworkGrowth, getRevenueChartData } from './VisualizationService';

/**
 * Retrieves all dashboard data for a user
 * @param userId The user ID to fetch dashboard data for
 * @returns Promise containing all dashboard data
 */
export async function getDashboardData(userId: string) {
  const [
    tradeHistory,
    networkStats,
    balanceData,
    referralData,
    networkGrowth,
    revenueData
  ] = await Promise.all([
    getTradeHistory(userId),
    getUserNetworkStatistics(userId),
    getUserBalanceData(userId),
    getReferralPercentages(),
    getNetworkGrowth(),
    getRevenueChartData()
  ]);

  return {
    tradeHistory,
    networkStats,
    balanceData,
    referralData,
    networkGrowth,
    revenueData
  };
}
