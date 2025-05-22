
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Dados de exemplo para o progresso de ranking
const rankingData = {
  currentRank: 2,
  nextRank: 3,
  currentVolume: 80,
  requiredVolume: 120,
  directReferrals: 1,
  requiredDirectReferrals: 2
};

interface RankingProgressProps {
  className?: string;
}

const RankingProgress = ({ className }: RankingProgressProps) => {
  const volumeProgress = Math.min((rankingData.currentVolume / rankingData.requiredVolume) * 100, 100);
  const referralsProgress = Math.min((rankingData.directReferrals / rankingData.requiredDirectReferrals) * 100, 100);
  
  return (
    <Card className={`${className} bg-black/30 border-white/10 backdrop-blur-sm`}>
      <CardHeader>
        <CardTitle className="text-white">Progresso de Ranking</CardTitle>
        <CardDescription className="text-gray-400">
          V{rankingData.currentRank} → V{rankingData.nextRank}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Volume</span>
            <span className="text-white font-medium">
              {rankingData.currentVolume} / {rankingData.requiredVolume} SOL
            </span>
          </div>
          <Progress 
            value={volumeProgress} 
            className="h-2 bg-gray-700"
            style={{
              background: volumeProgress === 100 ? 'linear-gradient(to right, #10b981, #059669)' : '#374151'
            }}
          />
        </div>
        
        {rankingData.nextRank >= 3 && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Diretos Qualificados</span>
              <span className="text-white font-medium">
                {rankingData.directReferrals} / {rankingData.requiredDirectReferrals}
              </span>
            </div>
            <Progress 
              value={referralsProgress} 
              className="h-2 bg-gray-700"
              style={{
                background: referralsProgress === 100 ? 'linear-gradient(to right, #8b5cf6, #6d28d9)' : '#374151'
              }}
            />
          </div>
        )}
        
        {/* Badges de benefícios do próximo nível */}
        <div className="mt-4">
          <p className="text-gray-400 mb-2">Benefícios no próximo nível:</p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">
              +3% Bônus MLM
            </span>
            <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full">
              Rede até 3 níveis
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RankingProgress;
