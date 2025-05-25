
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

  // Se a carteira não está conectada, mostrar tela de conexão
  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8">
        <div className="w-full max-w-md">
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
