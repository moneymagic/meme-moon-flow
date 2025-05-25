
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star, RefreshCw } from "lucide-react";
import { useUserData } from "@/hooks/useUserData";

interface RankingProgressProps {
  className?: string;
}

const RankingProgress = ({ className }: RankingProgressProps) => {
  const { rankingStats, rankingUpgrade, loading, refreshData } = useUserData();

  if (loading) {
    return (
      <Card className={`${className} bg-white/95 backdrop-blur-sm border border-slate-200/60 rounded-3xl shadow-sm`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <RefreshCw className="w-6 h-6 animate-spin text-slate-500" />
            <span className="ml-2 text-slate-600">Carregando progresso...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentRank = rankingStats?.current_rank || 1;
  const totalProfit = rankingStats?.total_profit || 0;
  const directReferrals = rankingStats?.direct_referrals || 0;
  const networkSize = rankingStats?.network_size || 0;
  
  const nextRank = rankingUpgrade?.next_rank || currentRank + 1;
  const canUpgrade = rankingUpgrade?.can_upgrade || false;
  const requirementsOr = rankingUpgrade?.requirements_met || false;
  
  // Lógica de requisitos baseada no rank atual
  const getRequirements = (rank: number) => {
    const requirements = {
      volume: rank * 100,
      directs: rank >= 3 ? 2 : 0
    };
    return requirements;
  };

  const nextRankRequirements = getRequirements(nextRank);
  const volumeProgress = Math.min((totalProfit / nextRankRequirements.volume) * 100, 100);
  const directsProgress = nextRankRequirements.directs > 0 ? 
    Math.min((directReferrals / nextRankRequirements.directs) * 100, 100) : 100;
  
  const getNextLevelBenefits = () => {
    switch (nextRank) {
      case 2:
        return [
          { text: "+2% Bônus MLM", bgColor: "bg-purple-100", textColor: "text-purple-700" },
          { text: "Acesso a 2 níveis", bgColor: "bg-blue-100", textColor: "text-blue-700" }
        ];
      case 3:
        return [
          { text: "+4% Bônus MLM", bgColor: "bg-purple-100", textColor: "text-purple-700" },
          { text: "Acesso a 3 níveis", bgColor: "bg-blue-100", textColor: "text-blue-700" }
        ];
      default:
        return [
          { text: `+${nextRank * 2}% Bônus MLM`, bgColor: "bg-purple-100", textColor: "text-purple-700" },
          { text: `Acesso a ${nextRank} níveis`, bgColor: "bg-blue-100", textColor: "text-blue-700" }
        ];
    }
  };

  const nextLevelBenefits = getNextLevelBenefits();
  
  return (
    <Card className={`${className} bg-white/95 backdrop-blur-sm border border-slate-200/60 rounded-3xl shadow-sm`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-slate-900 font-medium tracking-tight">Status</CardTitle>
            <CardDescription className="text-slate-600 font-light">
              Progresso para o próximo nível
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={refreshData}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              title="Atualizar dados"
            >
              <RefreshCw className="w-4 h-4 text-slate-600" />
            </button>
            <div className={`flex items-center gap-1 px-4 py-2 rounded-full ${
              canUpgrade 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
            }`}>
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">V{currentRank}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-600 font-light">Volume da Rede</span>
            <span className="text-slate-900 font-medium">
              {totalProfit.toFixed(1)} / {nextRankRequirements.volume} SOL
            </span>
          </div>
          <div className="relative h-3 w-full bg-slate-200 rounded-full overflow-hidden">
            <Progress 
              value={volumeProgress} 
              className="h-3 bg-gradient-to-r from-emerald-500 to-teal-600"
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">
              Faltam {Math.max(0, nextRankRequirements.volume - totalProfit).toFixed(1)} SOL
            </span>
            <span className="text-slate-500">{volumeProgress.toFixed(1)}%</span>
          </div>
        </div>
        
        {nextRank >= 3 && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600 font-light">
                Diretos V{nextRank - 1}+
              </span>
              <span className="text-slate-900 font-medium">
                {directReferrals} / {nextRankRequirements.directs}
              </span>
            </div>
            <div className="relative h-3 w-full bg-slate-200 rounded-full overflow-hidden">
              <Progress 
                value={directsProgress} 
                className="h-3 bg-gradient-to-r from-purple-500 to-blue-600"
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">
                Faltam {Math.max(0, nextRankRequirements.directs - directReferrals)} diretos qualificados
              </span>
              <span className="text-slate-500">{directsProgress.toFixed(1)}%</span>
            </div>
          </div>
        )}

        <div className="text-center text-sm text-slate-600">
          <p>Rede total: {networkSize} membros</p>
        </div>
        
        {canUpgrade && (
          <div className="rounded-2xl border border-green-200 p-4 bg-green-50">
            <p className="text-green-900 text-sm font-medium mb-2">🎉 Parabéns! Você pode fazer upgrade!</p>
            <p className="text-green-700 text-xs">Você atendeu todos os requisitos para o nível V{nextRank}</p>
          </div>
        )}
        
        {!canUpgrade && nextRank <= 8 && (
          <div className="rounded-2xl border border-slate-200/60 p-4 bg-slate-50/80">
            <p className="text-slate-900 text-sm font-medium mb-3">Próximo nível: V{nextRank}</p>
            <div className="flex flex-wrap gap-2">
              {nextLevelBenefits.map((benefit, index) => (
                <span 
                  key={index}
                  className={`${benefit.bgColor} ${benefit.textColor} text-xs px-3 py-1 rounded-full font-medium`}
                >
                  {benefit.text}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RankingProgress;
