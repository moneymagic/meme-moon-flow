
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RefreshCw, Save } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

interface CopyTradeSettingsProps {
  walletData: {
    balance: number;
    depositAddress: string;
    isActive: boolean;
  };
  isLoading: boolean;
}

const CopyTradeSettings = ({ walletData, isLoading }: CopyTradeSettingsProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [settings, setSettings] = useState({
    isActive: walletData.isActive,
    allocatedCapital: '1'
  });
  
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Get bot trading settings
        const { data, error } = await supabase
          .from('copy_settings')
          .select('*')
          .maybeSingle();
          
        if (error) throw error;
        
        if (data) {
          setSettings({
            isActive: data.is_active,
            allocatedCapital: data.allocated_capital_sol.toString()
          });
        }
      } catch (error) {
        console.error("Error fetching bot trading settings:", error);
      }
    };
    
    fetchSettings();
  }, []);
  
  const handleSaveSettings = async () => {
    try {
      setIsProcessing(true);
      
      // Validate allocated capital
      const capitalValue = parseFloat(settings.allocatedCapital);
      if (isNaN(capitalValue) || capitalValue <= 0) {
        toast({
          title: "Valor inválido",
          description: "Por favor, insira um valor válido para o capital alocado",
          variant: "destructive"
        });
        return;
      }
      
      // Get current user ID
      const userId = (await supabase.auth.getUser()).data.user?.id;
      
      if (!userId) {
        toast({
          title: "Erro de autenticação",
          description: "Faça login para salvar as configurações",
          variant: "destructive"
        });
        return;
      }
      
      // Update or insert bot trading settings
      const { data: existingSettings } = await supabase
        .from('copy_settings')
        .select('id')
        .maybeSingle();
        
      if (existingSettings) {
        // Update existing settings
        const { error } = await supabase
          .from('copy_settings')
          .update({
            is_active: settings.isActive,
            allocated_capital_sol: capitalValue,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingSettings.id);
          
        if (error) throw error;
      } else {
        // Insert new settings with required trader_address
        const { error } = await supabase
          .from('copy_settings')
          .insert({
            user_id: userId,
            trader_address: 'smart_contract', // Fixed value for smart contract system
            is_active: settings.isActive,
            allocated_capital_sol: capitalValue
          });
          
        if (error) throw error;
      }
      
      toast({
        title: "Configurações salvas!",
        description: settings.isActive 
          ? "Seu bot trading está ativo" 
          : "Bot trading foi pausado"
      });
      
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Falha ao salvar configurações",
        description: "Tente novamente mais tarde",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (isLoading) {
    return (
      <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex justify-center">
            <RefreshCw className="animate-spin text-white h-8 w-8" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const lowBalanceWarning = walletData.balance < 0.05;
  
  return (
    <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Bot Trading Settings</CardTitle>
        <CardDescription className="text-gray-400">
          Configure your bot trading parameters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="copy-active" className="text-white text-lg">Trading Status</Label>
              <p className="text-gray-400 text-sm">Enable or disable bot trading</p>
            </div>
            <Switch 
              id="copy-active"
              checked={settings.isActive}
              onCheckedChange={(checked) => setSettings({...settings, isActive: checked})}
              disabled={lowBalanceWarning}
              className={lowBalanceWarning ? "cursor-not-allowed opacity-50" : ""}
            />
          </div>
          
          {lowBalanceWarning && (
            <div className="bg-red-900/30 border border-red-500/20 rounded-lg p-3 mt-2">
              <p className="text-red-300 text-sm">
                Insufficient balance! Add at least 0.05 SOL to enable bot trading.
              </p>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="allocated-capital" className="text-white">Allocated Capital (SOL)</Label>
          <Input 
            id="allocated-capital"
            type="number"
            placeholder="Enter capital amount"
            className="bg-black/40 border-gray-700 text-white"
            value={settings.allocatedCapital}
            onChange={(e) => setSettings({...settings, allocatedCapital: e.target.value})}
            step="0.1"
            min="0.1"
          />
          <p className="text-gray-400 text-xs">
            This determines the size of your bot trades
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="bg-blue-900/30 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-blue-300 font-medium mb-2">Performance Fee Structure</h4>
            <p className="text-gray-300 text-sm">30% of profit is deducted from your gas fee wallet:</p>
            <ul className="list-disc list-inside text-gray-300 text-sm pl-2 space-y-1 mt-1">
              <li>10% goes to Master Trader</li>
              <li>20% goes to the affiliate network</li>
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSaveSettings}
          disabled={isProcessing || lowBalanceWarning}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {isProcessing ? (
            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Settings
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CopyTradeSettings;
