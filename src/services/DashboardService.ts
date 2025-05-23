
import { supabase } from "@/integrations/supabase/client";

// Import types explicitly with type keyword to avoid deep type instantiation
import type { CapitalGrowthData, ActiveOperation, RankingProgress } from "@/integrations/supabase/client";

// Define simplified trade types to avoid circular references
interface TradeHistoryItem {
  id: string;
  token_symbol: string;
  profit_sol: number;
  timestamp: string;
  entry_price: number;
  exit_price: number;
  [key: string]: any; // Allow for additional properties without circular references
}

interface OpenTradeItem {
  id: string;
  token_symbol: string;
  entry_price: number;
  timestamp: string;
  [key: string]: any; // Allow for additional properties without circular references
}

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
    
    // Get wallet balance
    const { data: wallet, error: walletError } = await supabase
      .from('wallets')
      .select('balance_sol')
      .eq('user_id', userId)
      .single();
      
    if (walletError) {
      console.error("Error fetching wallet:", walletError);
      throw new Error("Failed to fetch wallet data");
    }

    const balance = wallet?.balance_sol || 0;
    console.log(`User balance: ${balance} SOL`);
    
    // Get the current date for today's profit calculation
    const today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);
    
    // Get profit metrics
    const { data: profitData, error: profitError } = await supabase
      .from('copy_trades')
      .select('profit_sol, timestamp')
      .eq('user_id', userId);
      
    if (profitError) {
      console.error("Error fetching profit data:", profitError);
      throw new Error("Failed to fetch profit data");
    }
    
    // Calculate total profit
    const profitTotal = profitData?.reduce((sum, trade) => sum + (trade.profit_sol || 0), 0) || 0;
    
    // Calculate today's profit
    const profitToday = profitData
      ?.filter(trade => new Date(trade.timestamp) >= startOfDay)
      .reduce((sum, trade) => sum + (trade.profit_sol || 0), 0) || 0;
      
    console.log(`Profit - Today: ${profitToday} SOL, Total: ${profitTotal} SOL`);
    
    // Get recent trade history - use explicit typing to break recursive type references
    const { data: tradeHistory, error: historyError } = await supabase
      .from('copy_trades')
      .select('*')
      .eq('user_id', userId)
      .eq('is_successful', true)
      .order('timestamp', { ascending: false })
      .limit(5);
      
    if (historyError) {
      console.error("Error fetching trade history:", historyError);
      throw new Error("Failed to fetch trade history");
    }
    
    // Get open trades - we'll assume there's an is_open field
    const { data: openTrades, error: openError } = await supabase
      .from('copy_trades')
      .select('*')
      .eq('user_id', userId)
      .eq('is_open', true)
      .order('timestamp', { ascending: false });
      
    if (openError) {
      console.error("Error fetching open trades:", openError);
      // If the is_open field doesn't exist yet, handle gracefully
      console.log("The 'is_open' field might not exist. Continuing with empty open trades array.");
    }
    
    // Get copy settings status
    const { data: copySettings, error: copyError } = await supabase
      .from('copy_settings')
      .select('is_active')
      .eq('user_id', userId)
      .single();
      
    if (copyError && copyError.code !== 'PGRST116') {  // PGRST116 is "no rows returned"
      console.error("Error fetching copy settings:", copyError);
      throw new Error("Failed to fetch copy settings");
    }
    
    // Check if the user account is active
    const active = await isUserActive(userId);
    
    // Get affiliates data for rank and network
    const { data: affiliateData, error: affiliateError } = await supabase
      .from('affiliates')
      .select('rank, volume_personal, volume_network, direct_referrals_count, total_referrals')
      .eq('user_id', userId)
      .single();
      
    if (affiliateError) {
      console.error("Error fetching affiliate data:", affiliateError);
      throw new Error("Failed to fetch affiliate data");
    }
    
    // Get rank requirements for next rank
    const currentRankNumber = affiliateData?.rank || 1;
    const currentRank = `V${currentRankNumber}`;
    const nextRankNumber = currentRankNumber + 1;
    
    console.log(`Current rank: ${currentRank} (${currentRankNumber})`);
    
    const { data: nextRankReqs, error: rankError } = await supabase
      .from('rank_requirements')
      .select('volume_required, direct_referrals_required')
      .eq('rank', nextRankNumber)
      .single();
      
    if (rankError && rankError.code !== 'PGRST116') {
      console.error("Error fetching rank requirements:", rankError);
      throw new Error("Failed to fetch rank requirements");
    }
    
    // Calculate volume needed for next rank
    const currentVolume = affiliateData?.volume_network || 0;
    const volumeRequired = nextRankReqs?.volume_required || 0;
    const volumeToNextRank = Math.max(0, volumeRequired - currentVolume);
    
    console.log(`Volume - Current: ${currentVolume}, Required: ${volumeRequired}, To next rank: ${volumeToNextRank}`);
    
    // Count qualified directs (same rank)
    const { data: qualifiedDirectsData, error: qualifiedError } = await supabase
      .from('affiliates')
      .select('count')
      .eq('sponsor_id', userId)
      .gte('rank', currentRankNumber)
      .single();
      
    if (qualifiedError && qualifiedError.code !== 'PGRST116') {
      console.error("Error fetching qualified directs:", qualifiedError);
      throw new Error("Failed to fetch qualified directs");
    }
    
    const qualifiedDirects = qualifiedDirectsData?.count || 0;
    const totalDirects = affiliateData?.direct_referrals_count || 0;
    
    console.log(`Directs - Qualified: ${qualifiedDirects}, Total: ${totalDirects}`);
    
    // Get supplementary visualization data using helper functions with explicit return types
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
      tradeHistory: tradeHistory || [],
      openTrades: openTrades || [],
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

/**
 * Helper function to format a rank number as a string (e.g., 1 -> "V1")
 */
export function formatRank(rankNumber: number | null): string {
  if (rankNumber === null || rankNumber <= 0) {
    return "V1";
  }
  return `V${rankNumber}`;
}

// Helper functions implementations
async function isUserActive(userId: string): Promise<boolean> {
  try {
    // Here we would call the Supabase function to check if the user is active
    // For now, we'll return true as a placeholder
    const { data, error } = await supabase.rpc('is_user_active', { user_id_param: userId });
    if (error) throw error;
    return data || false;
  } catch (error) {
    console.error("Error checking user active status:", error);
    return false;
  }
}

async function getUserCapitalGrowth(userId: string): Promise<CapitalGrowthData[]> {
  try {
    // Mock implementation for now
    const result: CapitalGrowthData[] = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      result.unshift({
        date: `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`,
        value: Math.random() * 5 + 1
      });
    }
    
    return result;
  } catch (error) {
    console.error("Error fetching capital growth data:", error);
    return [];
  }
}

async function getUserActiveOperations(userId: string): Promise<ActiveOperation[]> {
  try {
    // Mock implementation for now
    return [
      {
        id: '1',
        coin: 'PEPE',
        entryPrice: 0.00000125,
        currentPrice: 0.00000135,
        percentChange: 8,
        direction: 'buy',
        amount: 0.15,
        timestamp: new Date()
      },
      {
        id: '2',
        coin: 'BONK',
        entryPrice: 0.00000135,
        currentPrice: 0.00000145,
        percentChange: 7.4,
        direction: 'buy',
        amount: 0.2,
        timestamp: new Date()
      }
    ];
  } catch (error) {
    console.error("Error fetching active operations:", error);
    return [];
  }
}

async function getUserRankingProgress(userId: string): Promise<RankingProgress | null> {
  try {
    // Mock implementation for now
    return {
      currentRank: 2,
      nextRank: 3,
      currentVolume: 80,
      requiredVolume: 120,
      directReferrals: 1,
      requiredDirectReferrals: 2
    };
  } catch (error) {
    console.error("Error fetching ranking progress:", error);
    return null;
  }
}
