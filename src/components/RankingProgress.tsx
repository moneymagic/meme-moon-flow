
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getUserRankingProgress } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface RankingProgressProps {
  className?: string;
}

const RankingProgress = ({ className }: RankingProgressProps) => {
  const [rankingData, setRankingData] = useState({
    currentRank: 2,
    nextRank: 3,
    currentVolume: 80,
    requiredVolume: 120,
    directReferrals: 1,
    requiredDirectReferrals: 2
  });
  
  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const userId = "dummy-user-id"; // Em produção, seria o ID do usuário autenticado
        const data = await getUserRankingProgress(userId);
        if (data) {
          setRankingData(data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados de ranking:", error);
      }
    };
    
    fetchRankingData();
  }, []);
  
  const volumeProgress = Math.min((rankingData.currentVolume / rankingData.requiredVolume) * 100, 100);
  const referralsProgress = Math.min((rankingData.directReferrals / rankingData.requiredDirectReferrals) * 100, 100);
  
  // Determinar os benefícios do próximo nível com base no rank
  const getNextLevelBenefits = () => {
    switch (rankingData.nextRank) {
      case 3:
        return [
          { text: "+2% Bônus MLM", bgColor: "bg-purple-100", textColor: "text-purple-700" },
          { text: "Acesso a rede até 3 níveis", bgColor: "bg-blue-100", textColor: "text-blue-700" }
        ];
      case 4:
        return [
          { text: "+2% Bônus MLM", bgColor: "bg-purple-100", textColor: "text-purple-700" },
          { text: "Acesso a rede até 4 níveis", bgColor: "bg-blue-100", textColor: "text-blue-700" }
        ];
      case 5:
        return [
          { text: "+3% Bônus MLM", bgColor: "bg-purple-100", textColor: "text-purple-700" },
          { text: "Acesso a rede até 5 níveis", bgColor: "bg-blue-100", textColor: "text-blue-700" }
        ];
      default:
        return [
          { text: `+2% Bônus MLM`, bgColor: "bg-purple-100", textColor: "text-purple-700" },
          { text: `Acesso a rede até ${rankingData.nextRank} níveis`, bgColor: "bg-blue-100", textColor: "text-blue-700" }
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
          <div className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full">
            <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
            <span className="text-sm font-medium">V{rankingData.currentRank}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-600 font-light">Volume da Rede</span>
            <span className="text-slate-900 font-medium">
              {rankingData.currentVolume} / {rankingData.requiredVolume} SOL
            </span>
          </div>
          <div className="relative h-3 w-full bg-slate-200 rounded-full overflow-hidden">
            <Progress 
              value={volumeProgress} 
              className="h-3 bg-gradient-to-r from-emerald-500 to-teal-600"
            />
          </div>
          <div className="flex justify-end">
            <span className="text-slate-500 text-sm">
              Faltam {rankingData.requiredVolume - rankingData.currentVolume} SOL
            </span>
          </div>
        </div>
        
        {rankingData.nextRank >= 3 && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600 font-light">
                Diretos V{rankingData.nextRank - 1}
              </span>
              <span className="text-slate-900 font-medium">
                {rankingData.directReferrals} / {rankingData.requiredDirectReferrals}
              </span>
            </div>
            <div className="relative h-3 w-full bg-slate-200 rounded-full overflow-hidden">
              <Progress 
                value={referralsProgress} 
                className="h-3 bg-gradient-to-r from-purple-500 to-blue-600"
              />
            </div>
            <div className="flex justify-end">
              <span className="text-slate-500 text-sm">
                Faltam {rankingData.requiredDirectReferrals - rankingData.directReferrals} diretos V{rankingData.nextRank - 1}
              </span>
            </div>
          </div>
        )}
        
        {/* Próximo nível */}
        <div className="rounded-2xl border border-slate-200/60 p-4 bg-slate-50/80">
          <p className="text-slate-900 text-sm font-medium mb-3">Próximo nível: V{rankingData.nextRank}</p>
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
      </CardContent>
    </Card>
  );
};

export default RankingProgress;
