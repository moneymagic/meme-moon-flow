
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Network, Home, LayoutDashboard, Layers, Users, ChevronDown } from 'lucide-react';

interface MainNavigationProps {
  className?: string;
  variant?: 'default' | 'mobile';
}

const MainNavigation = ({ className, variant = 'default' }: MainNavigationProps) => {
  const menuItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { 
      name: 'Network', 
      path: '/network', 
      icon: Network,
      submenu: [
        { name: 'Visão Geral', path: '/network' },
        { name: 'Linha Descendente', path: '/network/downline' },
        { name: 'Detalhes da Equipe', path: '/network/team' }
      ] 
    },
    { name: 'Matriz Unilevel', path: '/mlm', icon: Layers },
  ];

  if (variant === 'mobile') {
    return (
      <div className={`flex flex-col space-y-1 ${className}`}>
        {menuItems.map((item) => (
          <div key={item.name}>
            <Link 
              to={item.path}
              className="flex items-center px-3 py-2 text-sm rounded-md text-white hover:bg-white/10"
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Link>
            {item.submenu && (
              <div className="pl-6 mt-1 space-y-1">
                {item.submenu.map((subitem) => (
                  <Link
                    key={subitem.name}
                    to={subitem.path}
                    className="flex items-center px-3 py-1.5 text-xs rounded-md text-white/80 hover:bg-white/10"
                  >
                    {subitem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList className="gap-2">
        {menuItems.map((item) => {
          if (item.submenu) {
            return (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuTrigger className="text-white bg-transparent hover:bg-white/10 hover:text-white">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-slate-900/95 backdrop-blur-sm border border-white/10 p-2">
                  <ul className="grid w-[200px] gap-1">
                    {item.submenu.map((subitem) => (
                      <li key={subitem.name}>
                        <Link to={subitem.path} className="block select-none space-y-1 rounded-md px-3 py-2 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white text-white/80">
                          {subitem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }
          
          return (
            <NavigationMenuItem key={item.name}>
              <Link to={item.path}>
                <NavigationMenuLink className={navigationMenuTriggerStyle() + " text-white bg-transparent hover:bg-white/10 hover:text-white"}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigation;
