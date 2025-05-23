import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from '@/pages';
import Dashboard from '@/pages/Dashboard';
import NetworkExplorer from '@/pages/NetworkExplorer';
import MLM from '@/pages/MLM';
import Master from '@/pages/Master';
import Followers from '@/pages/Followers';
import NotFound from '@/pages/NotFound';
import NetworkDetailPage from './pages/NetworkDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/network" element={<NetworkExplorer />} />
        <Route path="/network/downline" element={<NetworkDetailPage />} />
        <Route path="/network/team" element={<NetworkExplorer />} />
        <Route path="/mlm" element={<MLM />} />
        <Route path="/master" element={<Master />} />
        <Route path="/followers" element={<Followers />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
