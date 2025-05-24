
import React from 'react';
import { MainNavigation } from './MainNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
      <div className="border-b border-white/5 backdrop-blur-xl bg-white/5">
        <div className="container mx-auto px-8 py-6">
          <MainNavigation />
        </div>
      </div>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
