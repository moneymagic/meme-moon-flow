
import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { 
  saveReferralFromUrl, 
  processNewUserWithReferral, 
  getUserReferralStats 
} from '@/services/ReferralService';

export interface ReferralStats {
  directReferrals: number;
  totalReferrals: number;
  totalEarnings: number;
}

export const useReferralSystem = () => {
  const { walletAddress, isConnected } = useWallet();
  const [referralStats, setReferralStats] = useState<ReferralStats>({
    directReferrals: 0,
    totalReferrals: 0,
    totalEarnings: 0
  });
  const [loading, setLoading] = useState(false);
  const [hasProcessedReferral, setHasProcessedReferral] = useState(false);

  // Salva referral da URL quando componente monta
  useEffect(() => {
    saveReferralFromUrl();
  }, []);

  // Processa novo usuário quando carteira conecta
  useEffect(() => {
    const handleNewUser = async () => {
      if (isConnected && walletAddress && !hasProcessedReferral) {
        try {
          setLoading(true);
          await processNewUserWithReferral(walletAddress);
          setHasProcessedReferral(true);
        } catch (error) {
          console.error('Erro ao processar referral:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    handleNewUser();
  }, [isConnected, walletAddress, hasProcessedReferral]);

  // Busca estatísticas do usuário
  const fetchReferralStats = useCallback(async () => {
    if (!walletAddress) return;

    try {
      setLoading(true);
      const stats = await getUserReferralStats(walletAddress);
      setReferralStats(stats);
    } catch (error) {
      console.error('Erro ao buscar estatísticas de referral:', error);
    } finally {
      setLoading(false);
    }
  }, [walletAddress]);

  // Busca estatísticas quando carteira conecta
  useEffect(() => {
    if (isConnected && walletAddress) {
      fetchReferralStats();
    }
  }, [isConnected, walletAddress, fetchReferralStats]);

  return {
    referralStats,
    loading,
    refreshStats: fetchReferralStats
  };
};
