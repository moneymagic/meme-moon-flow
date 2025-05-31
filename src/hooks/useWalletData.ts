
import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { 
  getWalletUserData, 
  getCopyTradeData, 
  getNetworkData,
  WalletUserData,
  CopyTradeData,
  NetworkData
} from '@/services/WalletDataService';
import { getUserBalance } from '@/services/UserBalanceService';

export interface UseWalletDataReturn {
  userData: WalletUserData | null;
  copyTradeData: CopyTradeData | null;
  networkData: NetworkData | null;
  phantomBalance: number;
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

export const useWalletData = (): UseWalletDataReturn => {
  const { walletAddress, isConnected } = useWallet();
  const [userData, setUserData] = useState<WalletUserData | null>(null);
  const [copyTradeData, setCopyTradeData] = useState<CopyTradeData | null>(null);
  const [networkData, setNetworkData] = useState<NetworkData | null>(null);
  const [phantomBalance, setPhantomBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllData = useCallback(async () => {
    if (!walletAddress || !isConnected) {
      setUserData(null);
      setCopyTradeData(null);
      setNetworkData(null);
      setPhantomBalance(0);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      // Buscar dados em paralelo
      const [userDataResult, copyTradeResult, networkDataResult, balanceResult] = await Promise.all([
        getWalletUserData(walletAddress),
        getCopyTradeData(walletAddress),
        getNetworkData(walletAddress),
        getUserBalance(walletAddress)
      ]);

      setUserData(userDataResult);
      setCopyTradeData(copyTradeResult);
      setNetworkData(networkDataResult);
      setPhantomBalance(balanceResult);

    } catch (error) {
      console.error('Erro ao buscar dados da carteira:', error);
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress, isConnected]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const refreshData = useCallback(async () => {
    await fetchAllData();
  }, [fetchAllData]);

  return {
    userData,
    copyTradeData,
    networkData,
    phantomBalance,
    isLoading,
    refreshData
  };
};
