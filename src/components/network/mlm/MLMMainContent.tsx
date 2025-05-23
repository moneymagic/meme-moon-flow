
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';
import { Upline, Rank } from '@/services/CommissionTypes';
import { distributeCommission } from '@/services/CommissionService';

interface MLMMainContentProps {
  levels: { level: number; members: number; commission: string; earnings: string }[];
  sampleUpline: Upline[];
}

const MLMMainContent: React.FC<MLMMainContentProps> = ({ levels, sampleUpline }) => {
  // Calculate distribution using the service
  const distribution = distributeCommission(sampleUpline);
  
  // Format distribution for display
  const formattedDistribution = Object.entries(distribution)
    .filter(([_, percentage]) => percentage > 0)
    .map(([userId, percentage]) => {
      const upline = sampleUpline.find(u => u.id === userId);
      return `${upline?.rank || "Unknown"}: ${percentage}%`;
    })
    .join(", ");

  return (
    <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Estrutura Unilevel com Compressão por Ranking</CardTitle>
        <CardDescription className="text-gray-400">
          Distribuição de comissões por nível da rede (20% do lucro total)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {levels.map((level, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Nível {level.level}</p>
                    <p className="text-gray-400 text-sm">{level.members} membros</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <Badge className="bg-blue-500">
                    {level.commission}
                  </Badge>
                </div>
                
                <div className="text-center">
                  <p className="text-white font-medium">{level.members} pessoas</p>
                  <p className="text-gray-400 text-sm">neste nível</p>
                </div>
                
                <div className="text-center">
                  <p className="text-green-400 font-bold">{level.earnings}</p>
                  <p className="text-gray-400 text-sm">ganhos mensais</p>
                </div>
              </div>
            </div>
          ))}
          <div className="p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg mt-4 border border-white/10">
            <p className="text-white text-center">
              A profundidade da rede é ilimitada: as comissões sobem linha por linha até encontrar os ranks qualificados
            </p>
            <p className="text-sm text-center text-blue-300 mt-2">
              Exemplo: {formattedDistribution}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MLMMainContent;
