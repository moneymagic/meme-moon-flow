
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { useUserData } from "@/hooks/useUserData";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const { walletBalance, loading: dataLoading } = useUserData();
  const { toast } = useToast();
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Erro ao verificar sessão:", error);
          toast({
            title: "Erro de autenticação",
            description: "Não foi possível verificar sua sessão. Faça login novamente.",
            variant: "destructive"
          });
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(!!session);
        }
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
        toast({
          title: "Erro",
          description: "Falha ao carregar dados do dashboard. Tente novamente.",
          variant: "destructive"
        });
        setIsAuthenticated(false);
      } finally {
        setAuthLoading(false);
      }
    };
    
    checkAuth();

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
        if (!session && !authLoading) {
          toast({
            title: "Sessão expirada",
            description: "Faça login novamente para continuar.",
          });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [toast, authLoading]);

  // Mostrar loading enquanto verifica autenticação
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Redirecionar para login se não autenticado
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Acesso Restrito</h1>
          <p className="text-slate-600 mb-6">Você precisa estar logado para acessar o dashboard.</p>
          <a 
            href="/auth" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Fazer Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout 
      balance={walletBalance?.total_profit || 0}
      isActive={true}
      isLoading={dataLoading}
    />
  );
};

export default Dashboard;
