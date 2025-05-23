
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Upline {
  id: string;
  rank: string | null;
}

interface CommissionDistribution {
  [userId: string]: number;
}

// Maps rank to commission percentage based on the system configuration
const rankCommissionPercentages: Record<string, number> = {
  'V1': 2,
  'V2': 2,
  'V3': 3,
  'V4': 2,
  'V5': 3,
  'V6': 3,
  'V7': 2,
  'V8': 3,
};

// Convert rank string to number for comparison
function rankToNumber(rank: string | null): number {
  if (!rank) return 0;
  return parseInt(rank.substring(1), 10);
}

// Check if a rank qualifies for a specific commission level
function isRankQualified(userRank: string | null, requiredRank: string): boolean {
  if (!userRank) return false;
  return rankToNumber(userRank) >= rankToNumber(requiredRank);
}

// Distributes commission across uplines based on rank compression
function distributeCommission(uplines: Upline[]): CommissionDistribution {
  const distribution: CommissionDistribution = {};
  const rankLevels = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8'];
  
  // Initialize all uplines with 0% commission
  uplines.forEach(upline => {
    distribution[upline.id] = 0;
  });

  // Process each rank level
  rankLevels.forEach(rankLevel => {
    const commissionPercentage = rankCommissionPercentages[rankLevel];
    
    // Find the first upline that qualifies for this rank level
    for (let i = 0; i < uplines.length; i++) {
      const upline = uplines[i];
      if (isRankQualified(upline.rank, rankLevel)) {
        // Assign commission to this upline
        distribution[upline.id] = (distribution[upline.id] || 0) + commissionPercentage;
        break;
      }
    }
  });

  return distribution;
}

// Main handler for the edge function
Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Only accept POST requests
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      })
    }
    
    // Parse the request body
    const { trade_id, profit_amount, user_id } = await req.json()
    
    if (!trade_id || !profit_amount || !user_id) {
      return new Response(JSON.stringify({ error: 'Missing required parameters' }), { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      })
    }
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Get user's upline chain
    const { data: affiliateData, error: affiliateError } = await supabase
      .from('affiliates')
      .select('user_id, rank, sponsor_id')
      .eq('user_id', user_id)
      .single()
      
    if (affiliateError || !affiliateData) {
      return new Response(JSON.stringify({ error: 'Could not find user affiliate data' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
    
    // Build upline chain by traversing sponsors
    let currentSponserId = affiliateData.sponsor_id;
    const uplines: Upline[] = [];
    
    // Safety limit to prevent infinite loops
    const MAX_UPLINE_DEPTH = 20;
    
    for (let i = 0; i < MAX_UPLINE_DEPTH && currentSponserId; i++) {
      const { data: sponsorData, error: sponsorError } = await supabase
        .from('affiliates')
        .select('user_id, rank, sponsor_id')
        .eq('user_id', currentSponserId)
        .single()
      
      if (sponsorError || !sponsorData) {
        break;
      }
      
      uplines.push({
        id: sponsorData.user_id,
        rank: sponsorData.rank ? `V${sponsorData.rank}` : null
      });
      
      currentSponserId = sponsorData.sponsor_id;
    }
    
    // Calculate commission distribution
    const distribution = distributeCommission(uplines);
    
    // Calculate the network fee (20% of total profit)
    const networkFee = profit_amount * 0.2;
    
    // Create commission records
    for (const [userId, percentage] of Object.entries(distribution)) {
      if (percentage > 0) {
        const commissionAmount = (percentage / 100) * profit_amount;
        
        await supabase
          .from('affiliate_commissions')
          .insert({
            affiliate_id: userId,
            copied_trade_id: trade_id,
            level: uplines.findIndex(u => u.id === userId) + 1,
            percentage: percentage,
            amount: commissionAmount
          })
        
        // Update affiliate's total earnings
        await supabase
          .rpc('update_affiliate_metrics')
      }
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      distribution,
      trade_id,
      network_fee: networkFee
    }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    })
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
