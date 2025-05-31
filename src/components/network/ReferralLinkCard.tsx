
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Share, Users, TrendingUp } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useWallet } from '@/contexts/WalletContext';
import { generateReferralLink, copyReferralLink, getUserReferralStats } from '@/services/ReferralService';

const ReferralLinkCard: React.FC = () => {
  const { walletAddress } = useWallet();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    directReferrals: 0,
    totalReferrals: 0,
    totalEarnings: 0
  });
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const fetchStats = async () => {
      if (walletAddress) {
        setLoading(true);
        try {
          const referralStats = await getUserReferralStats(walletAddress);
          setStats(referralStats);
        } catch (error) {
          console.error('Erro ao buscar estatísticas:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStats();
  }, [walletAddress]);

  const handleCopyLink = async () => {
    if (!walletAddress) return;

    const success = await copyReferralLink(walletAddress);
    if (success) {
      toast({
        title: "Link copiado!",
        description: "O link de convite foi copiado para a área de transferência.",
        variant: "default"
      });
    } else {
      toast({
        title: "Erro",
        description: "Não foi possível copiar o link.",
        variant: "destructive"
      });
    }
  };

  const handleShare = async () => {
    if (!walletAddress) return;

    const link = generateReferralLink(walletAddress);
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MemeMoon Flow - Copy Trading Automatizado',
          text: 'Junte-se ao MemeMoon Flow e ganhe comissões automaticamente!',
          url: link
        });
      } catch (error) {
        // Se o share falhar, copia o link
        handleCopyLink();
      }
    } else {
      // Fallback para copiar
      handleCopyLink();
    }
  };

  if (!walletAddress) {
    return (
      <Card className="bg-slate-700/50 border-slate-600/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-center text-slate-300">
            Conecte sua carteira para ver seu link de convite
          </div>
        </CardContent>
      </Card>
    );
  }

  const referralLink = generateReferralLink(walletAddress);

  return (
    <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Share className="h-5 w-5 text-purple-400" />
          Link de Convite
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-black/20 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Users className="h-4 w-4 text-blue-400" />
            </div>
            <p className="text-white font-bold text-lg">{stats.directReferrals}</p>
            <p className="text-slate-300 text-xs">Diretos</p>
          </div>
          <div className="text-center p-3 bg-black/20 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="h-4 w-4 text-green-400" />
            </div>
            <p className="text-white font-bold text-lg">{stats.totalReferrals}</p>
            <p className="text-slate-300 text-xs">Total</p>
          </div>
          <div className="text-center p-3 bg-black/20 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="h-4 w-4 text-yellow-400" />
            </div>
            <p className="text-white font-bold text-lg">{stats.totalEarnings.toFixed(2)}</p>
            <p className="text-slate-300 text-xs">SOL Ganhos</p>
          </div>
        </div>

        {/* Referral Link */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-medium">Seu Link de Convite</h4>
            <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
              Ativo
            </Badge>
          </div>
          
          <div className="p-3 bg-black/30 rounded-lg border border-slate-600/50">
            <p className="text-slate-300 text-sm font-mono break-all">
              {referralLink}
            </p>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleCopyLink}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
              size="sm"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copiar Link
            </Button>
            <Button 
              onClick={handleShare}
              variant="outline"
              className="flex-1 border-purple-500/50 text-purple-300 hover:bg-purple-600/20"
              size="sm"
            >
              <Share className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg border border-purple-500/30">
          <p className="text-slate-200 text-sm">
            💡 <strong>Como funciona:</strong>
          </p>
          <ul className="text-slate-300 text-xs mt-2 space-y-1">
            <li>• Compartilhe esse link para expandir sua rede</li>
            <li>• Ganhe comissões sobre o lucro dos seus indicados</li>
            <li>• Quanto maior sua rede, maior seu ranking e comissões</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralLinkCard;
