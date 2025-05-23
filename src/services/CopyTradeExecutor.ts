import { supabase } from "@/integrations/supabase/client";
import { Rank, Upline, distributeCommission, rankToNumber, calculateCommissionAmounts, processTradeCommission } from "./CommissionService";
import { getUplines } from "./UplineService";

/**
 * Calculates the proportional amount for a follower's trade based on the master's trade
 */
export function calculateProportionalAmount(
  masterAmount: number,
  masterCapital: number,
  userCapital: number
): number {
  // If either capital is zero, return zero to avoid division by zero
  if (masterCapital <= 0 || userCapital <= 0) return 0;
  
  // Calculate the proportion
  const proportion = userCapital / masterCapital;
  
  // Return the proportional amount, rounded to 4 decimal places
  return Number((masterAmount * proportion).toFixed(4));
}

/**
 * Retrieves mock uplines for testing the commission distribution
 */
export function getMockUplines(userId: string): Upline[] {
  // Generate 8 mock uplines with different ranks for testing
  return [
    { id: "upline1", rank: "V3" as Rank },
    { id: "upline2", rank: "V1" as Rank },
    { id: "upline3", rank: "V5" as Rank },
    { id: "upline4", rank: "V2" as Rank },
    { id: "upline5", rank: "V8" as Rank },
    { id: "upline6", rank: null },
    { id: "upline7", rank: "V6" as Rank },
    { id: "upline8", rank: "V4" as Rank },
  ];
}

/**
 * Simulates getting real uplines from the user's network
 */
async function getUserUplines(userId: string): Promise<Upline[]> {
  try {
    // Get the real uplines from the database
    const uplines = await getUplines(userId);
    
    // If no uplines found, return empty array
    if (!uplines || uplines.length === 0) {
      console.log(`No uplines found for user ${userId}, using mock data`);
      return getMockUplines(userId);
    }
    
    return uplines;
  } catch (error) {
    console.error("Error retrieving user uplines:", error);
    return [];
  }
}

/**
 * Updates the user's wallet balance after a trade
 */
async function updateUserWalletBalance(userId: string, feeAmount: number): Promise<{success: boolean, message: string}> {
  try {
    // For test users, simulate a successful wallet update
    if (userId.startsWith('test-')) {
      console.log(`Test user detected: ${userId}. Simulating wallet update.`);
      return { success: true, message: "Wallet balance updated successfully (simulated)" };
    }
    
    // Get current wallet balance
    const { data: wallet, error: walletError } = await supabase
      .from('wallets')
      .select('balance_sol')
      .eq('user_id', userId)
      .single();
      
    if (walletError) {
      console.error("Error fetching wallet:", walletError);
      return { success: false, message: "Failed to fetch wallet" };
    }
    
    if (wallet.balance_sol < feeAmount) {
      // Insufficient balance - disable copy trading
      await supabase
        .from('copy_settings')
        .update({ is_active: false })
        .eq('user_id', userId);
        
      return { 
        success: false, 
        message: `Insufficient balance (${wallet.balance_sol} SOL) to pay fee (${feeAmount} SOL)` 
      };
    }
    
    // Deduct fee from wallet balance
    const { error: updateError } = await supabase
      .from('wallets')
      .update({ 
        balance_sol: wallet.balance_sol - feeAmount,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);
      
    if (updateError) {
      console.error("Error updating wallet balance:", updateError);
      return { success: false, message: "Failed to update wallet balance" };
    }
    
    // Record the transaction
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        type: 'fee',
        amount_sol: feeAmount,
        description: 'Performance fee for copy trading'
      });
      
    if (transactionError) {
      console.error("Error recording transaction:", transactionError);
    }
    
    return { success: true, message: "Wallet balance updated successfully" };
  } catch (error) {
    console.error("Error in updateUserWalletBalance:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}

/**
 * Records a copy trade in the database
 */
async function recordCopyTrade(
  userId: string, 
  traderAddress: string,
  token: string,
  entryPrice: number,
  exitPrice: number,
  profit: number,
  feePaid: number,
  isSuccessful: boolean
): Promise<string | null> {
  try {
    // For test users, simulate a successful record creation
    if (userId.startsWith('test-')) {
      console.log(`Test user detected: ${userId}. Simulating trade record.`);
      const mockId = `test-trade-${Date.now()}`;
      return mockId;
    }
    
    const { data, error } = await supabase
      .from('copy_trades')
      .insert({
        user_id: userId,
        trader_address: traderAddress,
        token_symbol: token,
        entry_price: entryPrice,
        exit_price: exitPrice,
        profit_sol: profit,
        fee_paid_sol: feePaid,
        is_successful: isSuccessful
      })
      .select('id')
      .single();
      
    if (error) {
      console.error("Error recording copy trade:", error);
      return null;
    }
    
    return data.id;
  } catch (error) {
    console.error("Error in recordCopyTrade:", error);
    return null;
  }
}

/**
 * Replicates a trade from a master trader to all active followers
 */
export async function replicateTrade(masterTrade: {
  token: string;
  operation: 'buy' | 'sell';
  amount: number; // in SOL
  entryPrice: number;
  exitPrice: number;
  masterTotalCapital: number;
}): Promise<void> {
  try {
    console.log(`Replicating ${masterTrade.operation} trade for ${masterTrade.token} at ${masterTrade.entryPrice}...`);
    
    // Calculate profit per unit
    const profitPerUnit = masterTrade.exitPrice - masterTrade.entryPrice;
    console.log(`Profit per unit: ${profitPerUnit.toFixed(4)}`);
    
    // Get all active copy trade settings
    const { data: copySettings, error: settingsError } = await supabase
      .from('copy_settings')
      .select('user_id, trader_address, allocated_capital_sol')
      .eq('is_active', true);
      
    if (settingsError) {
      console.error("Error fetching copy settings:", settingsError);
      return;
    }
    
    console.log(`Found ${copySettings?.length || 0} active copy settings`);
    
    if (!copySettings || copySettings.length === 0) {
      console.log("No active copy settings found. Creating a test follower for demonstration.");
      
      // Create a test follower for demonstration purposes
      const testFollowers = [
        { user_id: "test-user-1", trader_address: "test-trader", allocated_capital_sol: 2.5 },
        { user_id: "test-user-2", trader_address: "test-trader", allocated_capital_sol: 5.0 }
      ];
      
      console.log(`Created ${testFollowers.length} test followers for demonstration`);
      
      // Process each test follower
      for (const testFollower of testFollowers) {
        await processFollowerTrade(testFollower, masterTrade, profitPerUnit);
      }
      
      return;
    }
    
    // Process each follower
    for (const settings of copySettings) {
      await processFollowerTrade(settings, masterTrade, profitPerUnit);
    }
    
    console.log("Trade replication complete");
  } catch (error) {
    console.error("Error in replicateTrade:", error);
    throw error; // Re-throw to allow UI to handle it
  }
}

/**
 * Process a follower's trade - extracted for better organization
 */
async function processFollowerTrade(
  follower: { user_id: string, trader_address: string, allocated_capital_sol: number },
  masterTrade: {
    token: string;
    operation: 'buy' | 'sell';
    amount: number;
    entryPrice: number;
    exitPrice: number;
    masterTotalCapital: number;
  },
  profitPerUnit: number
) {
  console.log(`Processing follower ${follower.user_id} with ${follower.allocated_capital_sol} SOL allocated`);
  
  // Calculate proportional amount for this follower
  const userAmount = calculateProportionalAmount(
    masterTrade.amount,
    masterTrade.masterTotalCapital,
    follower.allocated_capital_sol
  );
  
  console.log(`Proportional trade amount: ${userAmount.toFixed(4)} SOL`);
  
  // Simulate trade execution - In a real implementation, this would call Jupiter API
  // START JUPITER INTEGRATION POINT
  // Here we would add the actual Jupiter swap integration:
  // const jupiterResult = await jupiterSwap({
  //   inputToken: ...,
  //   outputToken: ...,
  //   amount: userAmount,
  //   slippage: 1, // 1%
  // });
  // END JUPITER INTEGRATION POINT
  
  // Calculate profit (for now, just using the master's profit ratio)
  const userProfit = userAmount * (profitPerUnit / masterTrade.entryPrice);
  console.log(`Calculated profit: ${userProfit.toFixed(4)} SOL`);
  
  // If profit is negative or zero, skip fee calculation
  if (userProfit <= 0) {
    console.log(`No profit for user ${follower.user_id}, skipping fee calculation`);
    
    // Still record the trade with zero fee
    await recordCopyTrade(
      follower.user_id,
      follower.trader_address,
      masterTrade.token,
      masterTrade.entryPrice,
      masterTrade.exitPrice,
      userProfit,
      0,
      true
    );
    return;
  }
  
  // Calculate performance fee (30% of profit)
  const performanceFee = userProfit * 0.3;
  const masterFee = userProfit * 0.1; // 10% to master trader
  const networkFee = userProfit * 0.2; // 20% to network
  
  console.log(`Performance fee: ${performanceFee.toFixed(4)} SOL (Master: ${masterFee.toFixed(4)} SOL, Network: ${networkFee.toFixed(4)} SOL)`);
  
  // Get user's uplines for commission distribution
  const uplines = await getUserUplines(follower.user_id);
  console.log(`Retrieved ${uplines.length} uplines for user ${follower.user_id}`);
  
  // Calculate commission distribution with compression
  const distribution = distributeCommission(uplines);
  console.log("Commission distribution:", distribution);
  
  // Calculate actual SOL amounts
  const commissionAmounts = calculateCommissionAmounts(distribution, userProfit);
  console.log("Commission amounts (SOL):", commissionAmounts);
  
  // Add a summary of commission distribution
  const totalCommission = Object.values(commissionAmounts).reduce((sum, val) => sum + val, 0);
  console.log(`Total commission distributed: ${totalCommission.toFixed(4)} SOL`);
  
  try {
    // Update user's wallet balance
    const walletUpdate = await updateUserWalletBalance(follower.user_id, performanceFee);
  
    if (!walletUpdate.success) {
      console.log(walletUpdate.message);
    
      // Record the failed trade
      await recordCopyTrade(
        follower.user_id,
        follower.trader_address,
        masterTrade.token,
        masterTrade.entryPrice,
        masterTrade.exitPrice,
        userProfit,
        0, // No fee paid
        false // Not successful
      );
      return;
    }
  
    // Record the successful trade
    const tradeId = await recordCopyTrade(
      follower.user_id,
      follower.trader_address,
      masterTrade.token,
      masterTrade.entryPrice,
      masterTrade.exitPrice,
      userProfit,
      performanceFee, // Full fee paid
      true // Successful
    );
  
    console.log(`Trade recorded with ID: ${tradeId || 'unknown'}`);
  
    // In a real implementation, we would distribute the commissions to the uplines
    // This would involve updating their wallet balances
  
    console.log(`Processed trade copy for user ${follower.user_id} successfully`);
    return { success: true, tradeId };
  } catch (error) {
    console.error(`Error processing trade for user ${follower.user_id}:`, error);
    return { success: false, error };
  }
}
