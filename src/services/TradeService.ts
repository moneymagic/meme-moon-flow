
import { supabase } from "@/integrations/supabase/client";

// Define simplified trade types to avoid circular references
export interface TradeHistoryItem {
  id: string;
  token_symbol: string;
  profit_sol: number;
  timestamp: string;
  entry_price: number;
  exit_price: number;
  [key: string]: any; // Allow for additional properties without circular references
}

export interface OpenTradeItem {
  id: string;
  token_symbol: string;
  entry_price: number;
  timestamp: string;
  [key: string]: any; // Allow for additional properties without circular references
}

/**
 * Gets recent completed trade history for a user
 */
export async function getRecentTradeHistory(userId: string, limit: number = 5): Promise<TradeHistoryItem[]> {
  try {
    console.log(`Fetching recent trade history for user: ${userId}`);
    
    const response = await supabase
      .from('copy_trades')
      .select('*')
      .eq('user_id', userId)
      .eq('is_successful', true)
      .order('timestamp', { ascending: false })
      .limit(limit);
      
    if (response.error) {
      console.error("Error fetching trade history:", response.error);
      return [];
    }
    
    return response.data as TradeHistoryItem[];
  } catch (error) {
    console.error("Error in getRecentTradeHistory:", error);
    return [];
  }
}

/**
 * Gets open trades for a user
 */
export async function getOpenTrades(userId: string): Promise<OpenTradeItem[]> {
  try {
    console.log(`Fetching open trades for user: ${userId}`);
    
    try {
      const response = await supabase
        .from('copy_trades')
        .select('*')
        .eq('user_id', userId)
        .eq('is_open', true)
        .order('timestamp', { ascending: false });
        
      if (response.error) {
        // If the is_open field doesn't exist yet, handle gracefully
        if (response.error.message?.includes("column \"is_open\" does not exist")) {
          console.log("The 'is_open' field might not exist. Continuing with empty open trades array.");
        } else {
          console.error("Error fetching open trades:", response.error);
        }
        return [];
      }
      
      return response.data as OpenTradeItem[];
    } catch (error) {
      console.error("Error fetching open trades:", error);
      return [];
    }
  } catch (error) {
    console.error("Error in getOpenTrades:", error);
    return [];
  }
}

/**
 * Gets profit metrics for a user
 */
export async function getUserProfitMetrics(userId: string): Promise<{ profitTotal: number; profitToday: number }> {
  try {
    console.log(`Fetching profit metrics for user: ${userId}`);
    
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
      return { profitTotal: 0, profitToday: 0 };
    }
    
    // Calculate total profit
    const profitTotal = profitData?.reduce((sum, trade) => sum + (trade.profit_sol || 0), 0) || 0;
    
    // Calculate today's profit
    const profitToday = profitData
      ?.filter(trade => new Date(trade.timestamp) >= startOfDay)
      .reduce((sum, trade) => sum + (trade.profit_sol || 0), 0) || 0;
      
    console.log(`Profit - Today: ${profitToday} SOL, Total: ${profitTotal} SOL`);
    
    return { profitTotal, profitToday };
  } catch (error) {
    console.error("Error in getUserProfitMetrics:", error);
    return { profitTotal: 0, profitToday: 0 };
  }
}
