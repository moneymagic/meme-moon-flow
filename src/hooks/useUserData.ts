
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { 
  getUserRankingStats, 
  getWalletBalance, 
  getNetworkTree, 
  getCommissionsHistory,
  checkRankingUpgrade,
  type UserRankingStats,
  type WalletBalance,
  type NetworkMember,
  type CommissionHistory,
  type RankingUpgrade
} from '@/services/SupabaseDataService';

export const useUserData = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [rankingStats, setRankingStats] = useState<UserRankingStats | null>(null);
  const [walletBalance, setWalletBalance] = useState<WalletBalance | null>(null);
  const [networkMembers, setNetworkMembers] = useState<NetworkMember[]>([]);
  const [commissionsHistory, setCommissionsHistory] = useState<CommissionHistory[]>([]);
  const [rankingUpgrade, setRankingUpgrade] = useState<RankingUpgrade | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário logado
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
      } else {
        setLoading(false);
      }
    };

    checkUser();

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUserId(session.user.id);
        } else {
          setUserId(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      setLoading(true);
      
      try {
        const [
          rankingData,
          balanceData,
          networkData,
          commissionsData,
          upgradeData
        ] = await Promise.all([
          getUserRankingStats(userId),
          getWalletBalance(userId),
          getNetworkTree(userId),
          getCommissionsHistory(userId),
          checkRankingUpgrade(userId)
        ]);

        setRankingStats(rankingData);
        setWalletBalance(balanceData);
        setNetworkMembers(networkData);
        setCommissionsHistory(commissionsData);
        setRankingUpgrade(upgradeData);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const refreshData = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const [
        rankingData,
        balanceData,
        networkData,
        commissionsData,
        upgradeData
      ] = await Promise.all([
        getUserRankingStats(userId),
        getWalletBalance(userId),
        getNetworkTree(userId),
        getCommissionsHistory(userId),
        checkRankingUpgrade(userId)
      ]);

      setRankingStats(rankingData);
      setWalletBalance(balanceData);
      setNetworkMembers(networkData);
      setCommissionsHistory(commissionsData);
      setRankingUpgrade(upgradeData);
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    userId,
    rankingStats,
    walletBalance,
    networkMembers,
    commissionsHistory,
    rankingUpgrade,
    loading,
    refreshData
  };
};
