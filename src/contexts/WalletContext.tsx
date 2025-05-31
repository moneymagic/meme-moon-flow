import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WalletContextType {
  walletAddress: string | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  signMessage: (message: string) => Promise<string | null>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verificar se já existe uma carteira conectada
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setWalletAddress(savedAddress);
      setIsConnected(true);
    }
  }, []);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      if (!window.solana || !window.solana.isPhantom) {
        throw new Error('Phantom wallet not found');
      }

      const response = await window.solana.connect();
      const publicKey = response.publicKey.toString();
      
      setWalletAddress(publicKey);
      setIsConnected(true);
      
      // Processar referral automaticamente quando conectar
      const { processNewUserWithReferral } = await import('@/services/ReferralService');
      await processNewUserWithReferral(publicKey);

      toast({
        title: "Carteira conectada",
        description: `Conectado com ${publicKey.slice(0, 8)}...${publicKey.slice(-8)}`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect wallet';
      setError(errorMessage);
      
      toast({
        title: "Erro ao conectar",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setIsConnected(false);
    localStorage.removeItem('walletAddress');
    console.log('Carteira desconectada');
  };

  const signMessage = async (message: string): Promise<string | null> => {
    try {
      if (typeof window !== 'undefined' && 'solana' in window) {
        const solana = (window as any).solana;
        const encodedMessage = new TextEncoder().encode(message);
        const signedMessage = await solana.signMessage(encodedMessage);
        return signedMessage.signature.toString();
      }
      return null;
    } catch (error) {
      console.error('Erro ao assinar mensagem:', error);
      return null;
    }
  };

  return (
    <WalletContext.Provider value={{
      walletAddress,
      isConnected,
      connectWallet,
      disconnectWallet,
      signMessage
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet deve ser usado dentro de um WalletProvider');
  }
  return context;
};
