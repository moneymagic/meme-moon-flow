
import { CapitalGrowthData, ActiveOperation, RankingProgress } from "@/integrations/supabase/client";
import { getUserBalance, isUserActive } from './UserBalanceService';
import { getRecentTradeHistory, getOpenTrades, getUserProfitMetrics, TradeHistoryItem, OpenTradeItem } from './TradeService';
import { getUserAffiliateData, getUserRankingProgress } from './AffiliateService';
import { getUserCapitalGrowth, getUserActiveOperations } from './VisualizationService';

// Define the return type explicitly to avoid deep type instantiation
export interface DashboardData {
  balance: number;
  profitToday: number;
  profitTotal: number;
  currentRank: string;
  volumeToNextRank: number;
  qualifiedDirects: number;
  totalDirects: number;
  tradeHistory: TradeHistoryItem[];
  openTrades: OpenTradeItem[];
  isActive: boolean;
  capitalGrowth: CapitalGrowthData[];
  activeOperations: ActiveOperation[];
  rankingProgress: RankingProgress | null;
}

/**
 * Comprehensive function to fetch all data needed for the dashboard
 * Consolidates data from multiple sources into a single object
 */
export async function getDashboardData(userId: string): Promise<DashboardData> {
  try {
    console.log(`Fetching dashboard data for user: ${userId}`);
    
    // Get user balance
    const balance = await getUserBalance(userId);
    
    // Get profit metrics
    const { profitTotal, profitToday } = await getUserProfitMetrics(userId);
    
    // Get trade history
    const tradeHistory = await getRecentTradeHistory(userId);
    
    // Get open trades
    const openTrades = await getOpenTrades(userId);
    
    // Check if the user account is active
    const active = await isUserActive(userId);
    
    // Get affiliate data
    const { currentRank, volumeToNextRank, qualifiedDirects, totalDirects } = await getUserAffiliateData(userId);
    
    // Get supplementary visualization data
    const capitalGrowth = await getUserCapitalGrowth(userId);
    const activeOperations = await getUserActiveOperations(userId);
    const rankingProgress = await getUserRankingProgress(userId);
    
    console.log(`Dashboard data fetched successfully for user: ${userId}`);
    
    // Return consolidated dashboard data
    return {
      balance,
      profitToday,
      profitTotal,
      currentRank,
      volumeToNextRank,
      qualifiedDirects,
      totalDirects,
      tradeHistory,
      openTrades,
      isActive: active,
      capitalGrowth,
      activeOperations,
      rankingProgress
    };
  } catch (error) {
    console.error("Error in getDashboardData:", error);
    // Return default data structure with empty/zero values
    return {
      balance: 0,
      profitToday: 0,
      profitTotal: 0,
      currentRank: "V1",
      volumeToNextRank: 0,
      qualifiedDirects: 0,
      totalDirects: 0,
      tradeHistory: [],
      openTrades: [],
      isActive: false,
      capitalGrowth: [],
      activeOperations: [],
      rankingProgress: null
    };
  }
}
