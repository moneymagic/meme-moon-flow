
import { Link } from 'react-router-dom';
import { Home, LayoutDashboard, Network, Users } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const MainNavigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const menuItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Network', path: '/network', icon: Network },
  ];

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-4">
        <Link to="/">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
            <Home className="h-5 w-5 text-white" />
          </div>
        </Link>
        <h1 className="text-2xl font-bold text-white">MemeFlow</h1>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4">
        {menuItems.map((item) => (
          <Link 
            key={item.name}
            to={item.path}
            className="flex items-center px-3 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.name}
          </Link>
        ))}
      </div>
      
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </Button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 p-4 bg-black/90 backdrop-blur-md z-50 md:hidden">
          <div className="flex flex-col space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center px-4 py-2.5 text-white hover:bg-white/10 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainNavigation;
