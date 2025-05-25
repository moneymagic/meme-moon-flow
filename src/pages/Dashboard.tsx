
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WalletConnect from "@/components/WalletConnect";
import { useUserData } from "@/hooks/useUserData";
import { useWallet } from "@/contexts/WalletContext";

const Dashboard = () => {
  const { isConnected } = useWallet();
  const { loading: dataLoading } = useUserData();
  const { toast } = useToast();

  // Se a carteira não está conectada, mostrar tela de conexão com estilo aprimorado
  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-blue-900/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light text-white mb-4">
              Conecte sua carteira
            </h2>
            <p className="text-purple-200 font-extralight">
              Para acessar o dashboard, conecte sua Phantom Wallet
            </p>
          </div>
          <WalletConnect />
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout 
      isActive={true}
      isLoading={dataLoading}
    />
  );
};

export default Dashboard;
