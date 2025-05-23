
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { HomeIcon, AreaChart, Network, Users, CopyCheck } from 'lucide-react';
import { Badge } from './ui/badge';
import { useWindowSize } from '@/hooks/use-mobile';

const MainNavigation = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('dashboard');
  const { isMobile } = useWindowSize();

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/dashboard')) {
      setActiveItem('dashboard');
    } else if (path.includes('/network')) {
      setActiveItem('network');
    } else if (path.includes('/mlm')) {
      setActiveItem('mlm');
    } else if (path.includes('/copy-trade')) {
      setActiveItem('copy-trade');
    } else {
      setActiveItem('');
    }
  }, [location]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 mb-4">
        <Link to="/">
          <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
            <HomeIcon className="mr-2 h-5 w-5" /> Início
          </Button>
        </Link>
      </div>

      <div className="space-y-1 px-3">
        <Link to="/dashboard">
          <div
            className={`flex items-center rounded-lg px-3 py-2 transition-colors ${
              activeItem === 'dashboard' ? 'bg-purple-800 text-white' : 'text-gray-300 hover:bg-purple-800/40'
            }`}
          >
            <AreaChart className="mr-2 h-5 w-5" />
            <span>{isMobile ? 'Dashboard' : 'Dashboard'}</span>
          </div>
        </Link>
        
        <Link to="/network">
          <div
            className={`flex items-center rounded-lg px-3 py-2 transition-colors ${
              activeItem === 'network' ? 'bg-purple-800 text-white' : 'text-gray-300 hover:bg-purple-800/40'
            }`}
          >
            <Network className="mr-2 h-5 w-5" />
            <span>{isMobile ? 'Network' : 'Network'}</span>
          </div>
        </Link>
        
        <Link to="/mlm">
          <div
            className={`flex items-center rounded-lg px-3 py-2 transition-colors ${
              activeItem === 'mlm' ? 'bg-purple-800 text-white' : 'text-gray-300 hover:bg-purple-800/40'
            }`}
          >
            <Users className="mr-2 h-5 w-5" />
            <span>{isMobile ? 'MLM' : 'MLM'}</span>
          </div>
        </Link>
        
        <Link to="/copy-trade">
          <div
            className={`flex items-center rounded-lg px-3 py-2 transition-colors ${
              activeItem === 'copy-trade' ? 'bg-purple-800 text-white' : 'text-gray-300 hover:bg-purple-800/40'
            }`}
          >
            <CopyCheck className="mr-2 h-5 w-5" />
            <span>{isMobile ? 'Copy Trade' : 'Copy Trading'}</span>
            <Badge className="ml-2 bg-blue-600 text-xs" variant="secondary">New</Badge>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MainNavigation;
