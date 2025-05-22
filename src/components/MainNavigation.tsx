
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Network, Home, LayoutDashboard, Layers } from 'lucide-react';

interface MainNavigationProps {
  className?: string;
  variant?: 'default' | 'mobile';
}

const MainNavigation = ({ className, variant = 'default' }: MainNavigationProps) => {
  const menuItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Network', path: '/network', icon: Network },
    { name: 'MLM', path: '/mlm', icon: Layers },
  ];

  if (variant === 'mobile') {
    return (
      <div className={`flex flex-col space-y-1 ${className}`}>
        {menuItems.map((item) => (
          <Link 
            key={item.name} 
            to={item.path}
            className="flex items-center px-3 py-2 text-sm rounded-md text-white hover:bg-white/10"
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.name}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList className="gap-2">
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.name}>
            <Link to={item.path}>
              <NavigationMenuLink className={navigationMenuTriggerStyle() + " text-white bg-transparent hover:bg-white/10 hover:text-white"}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigation;
