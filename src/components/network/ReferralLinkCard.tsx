
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Share, Users, TrendingUp } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useWallet } from '@/contexts/WalletContext';
import { useReferralSystem } from '@/hooks/useReferralSystem';
import { generateReferralLink, copyReferralLink } from '@/services/ReferralService';

const ReferralLinkCard: React.FC = () => {
  const { walletAddress } = useWallet();
  const { referralStats } = useReferralSystem();
  const { toast } = useToast();

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
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  if (!walletAddress) {
    return (
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-center text-slate-400 font-light">
            Conecte sua carteira para ver seu link de convite
          </div>
        </CardContent>
      </Card>
    );
  }

  const referralLink = generateReferralLink(walletAddress);

  return (
    <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-purple-500/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2 font-light">
          <Share className="h-5 w-5 text-purple-400" />
          Link de Convite
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Overview simplificadas */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-purple-500/10 rounded-xl border border-purple-400/20">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-blue-400" />
            </div>
            <p className="text-white font-light text-2xl">{referralStats.directReferrals}</p>
            <p className="text-slate-400 text-sm font-light">Diretos</p>
          </div>
          <div className="text-center p-4 bg-purple-500/10 rounded-xl border border-purple-400/20">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <p className="text-white font-light text-2xl">{referralStats.totalReferrals}</p>
            <p className="text-slate-400 text-sm font-light">Total</p>
          </div>
        </div>

        {/* Referral Link */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-light">Seu Link de Convite</h4>
            <Badge className="bg-purple-600/30 text-purple-300 border-purple-500/50 font-light">
              Ativo
            </Badge>
          </div>
          
          <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
            <p className="text-slate-300 text-sm font-mono break-all">
              {referralLink}
            </p>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={handleCopyLink}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white border-0 font-light"
              size="sm"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copiar Link
            </Button>
            <Button 
              onClick={handleShare}
              variant="outline"
              className="flex-1 border-purple-500/50 text-purple-300 hover:bg-purple-600/20 font-light"
              size="sm"
            >
              <Share className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/20">
          <p className="text-white text-sm font-medium mb-2">
            💡 Como funciona:
          </p>
          <ul className="text-slate-400 text-sm space-y-1 font-light">
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
