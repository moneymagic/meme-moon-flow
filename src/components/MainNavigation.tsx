
import { Link, useLocation } from 'react-router-dom';
import { useMobile } from '@/hooks/use-mobile';

export function MainNavigation() {
  const location = useLocation();
  const isMobile = useMobile();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-2">
        <Link
          to="/dashboard"
          className={`text-sm font-medium transition-colors ${
            isActive('/dashboard')
              ? 'text-primary'
              : 'text-muted-foreground hover:text-primary'
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/network"
          className={`text-sm font-medium transition-colors ${
            isActive('/network')
              ? 'text-primary'
              : 'text-muted-foreground hover:text-primary'
          }`}
        >
          Network
        </Link>
        <Link
          to="/copy-trade"
          className={`text-sm font-medium transition-colors ${
            isActive('/copy-trade')
              ? 'text-primary'
              : 'text-muted-foreground hover:text-primary'
          }`}
        >
          Copy Trading
        </Link>
        {!isMobile && (
          <>
            <Link
              to="/test"
              className={`text-sm font-medium transition-colors ${
                isActive('/test')
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Test Tools
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
