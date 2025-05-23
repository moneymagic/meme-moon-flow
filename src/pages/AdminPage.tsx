
import React from 'react';
import Layout from '@/components/Layout';
import { CopyTradeTestPanel } from '@/components/admin/CopyTradeTestPanel';
import { Toaster } from "sonner";

export default function AdminPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Painel de Teste de Cópia</h1>
        <CopyTradeTestPanel />
      </div>
      <Toaster />
    </Layout>
  );
}
