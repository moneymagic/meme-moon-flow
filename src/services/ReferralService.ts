
import { supabase } from "@/integrations/supabase/client";

/**
 * Service para gerenciar sistema de indicação por link
 */

export interface ReferralData {
  referrerWallet: string;
  referredWallet: string;
  timestamp: Date;
}

/**
 * Salva referral no localStorage quando usuário acessa via link
 */
export function saveReferralFromUrl(): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  const referralCode = urlParams.get('ref');
  
  if (referralCode && !localStorage.getItem('mememoon_referral')) {
    localStorage.setItem('mememoon_referral', referralCode);
    console.log('Referral salvo:', referralCode);
    return referralCode;
  }
  
  return localStorage.getItem('mememoon_referral');
}

/**
 * Obtém o referral salvo no localStorage
 */
export function getSavedReferral(): string | null {
  return localStorage.getItem('mememoon_referral');
}

/**
 * Processa o registro de um novo usuário com referral
 */
export async function processNewUserWithReferral(walletAddress: string): Promise<boolean> {
  try {
    const referralCode = getSavedReferral();
    
    // Verifica se usuário já existe
    const { data: existingUser, error: userError } = await supabase
      .from('affiliates')
      .select('user_id')
      .eq('user_id', walletAddress)
      .single();

    if (existingUser) {
      console.log('Usuário já existe, não processando referral');
      return false;
    }

    // Cria novo usuário afiliado
    const { error: createError } = await supabase
      .from('affiliates')
      .insert({
        user_id: walletAddress,
        referral_code: walletAddress,
        sponsor_id: referralCode || null,
        rank: 1,
        current_ranking: 1,
        total_network_profit: 0,
        total_earnings: 0,
        direct_referrals_count: 0
      });

    if (createError) {
      console.error('Erro ao criar usuário afiliado:', createError);
      return false;
    }

    // Se tem referral, cria a relação de upline
    if (referralCode) {
      await createUplineRelationship(walletAddress, referralCode);
      await updateReferrerStats(referralCode);
    }

    // Limpa o referral do localStorage após uso
    localStorage.removeItem('mememoon_referral');
    
    return true;
  } catch (error) {
    console.error('Erro ao processar novo usuário com referral:', error);
    return false;
  }
}

/**
 * Cria a relação de upline entre usuários
 */
async function createUplineRelationship(userId: string, uplineId: string): Promise<void> {
  try {
    // Busca a cadeia de uplines do sponsor para construir a nova cadeia
    const { data: sponsorUplines, error: uplineError } = await supabase
      .from('uplines')
      .select('upline_id, upline_position')
      .eq('user_id', uplineId)
      .order('upline_position', { ascending: true });

    if (uplineError) {
      console.error('Erro ao buscar uplines do sponsor:', uplineError);
    }

    // Cria a cadeia de uplines para o novo usuário
    const uplinesToInsert = [
      { user_id: userId, upline_id: uplineId, upline_position: 1 }
    ];

    // Adiciona os uplines do sponsor (máximo 7 para não passar de 8 níveis)
    if (sponsorUplines) {
      sponsorUplines.slice(0, 7).forEach((upline, index) => {
        uplinesToInsert.push({
          user_id: userId,
          upline_id: upline.upline_id,
          upline_position: index + 2
        });
      });
    }

    const { error: insertError } = await supabase
      .from('uplines')
      .insert(uplinesToInsert);

    if (insertError) {
      console.error('Erro ao criar relação de upline:', insertError);
    }
  } catch (error) {
    console.error('Erro inesperado ao criar upline:', error);
  }
}

/**
 * Atualiza estatísticas do indicador
 */
async function updateReferrerStats(referrerId: string): Promise<void> {
  try {
    const { error } = await supabase.rpc('increment', {
      table_name: 'affiliates',
      row_id: referrerId,
      column_name: 'direct_referrals_count'
    });

    if (error) {
      // Fallback: atualizar manualmente
      const { data: referrer } = await supabase
        .from('affiliates')
        .select('direct_referrals_count')
        .eq('user_id', referrerId)
        .single();

      if (referrer) {
        await supabase
          .from('affiliates')
          .update({ 
            direct_referrals_count: (referrer.direct_referrals_count || 0) + 1,
            total_referrals: (referrer.direct_referrals_count || 0) + 1 
          })
          .eq('user_id', referrerId);
      }
    }
  } catch (error) {
    console.error('Erro ao atualizar estatísticas do referrer:', error);
  }
}

/**
 * Gera o link de convite para um usuário
 */
export function generateReferralLink(walletAddress: string): string {
  const baseUrl = window.location.origin;
  return `${baseUrl}/?ref=${walletAddress}`;
}

/**
 * Copia o link de convite para o clipboard
 */
export async function copyReferralLink(walletAddress: string): Promise<boolean> {
  try {
    const link = generateReferralLink(walletAddress);
    await navigator.clipboard.writeText(link);
    return true;
  } catch (error) {
    console.error('Erro ao copiar link:', error);
    return false;
  }
}

/**
 * Obtém estatísticas de indicação de um usuário
 */
export async function getUserReferralStats(userId: string) {
  try {
    const { data: affiliate, error } = await supabase
      .from('affiliates')
      .select('direct_referrals_count, total_referrals, total_earnings')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Erro ao buscar estatísticas de indicação:', error);
      return {
        directReferrals: 0,
        totalReferrals: 0,
        totalEarnings: 0
      };
    }

    return {
      directReferrals: affiliate?.direct_referrals_count || 0,
      totalReferrals: affiliate?.total_referrals || 0,
      totalEarnings: affiliate?.total_earnings || 0
    };
  } catch (error) {
    console.error('Erro inesperado:', error);
    return {
      directReferrals: 0,
      totalReferrals: 0,
      totalEarnings: 0
    };
  }
}
