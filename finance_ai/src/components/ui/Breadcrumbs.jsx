import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumbs = ({ customItems = null, className = '' }) => {
  const location = useLocation();

  const getDefaultBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    
    const breadcrumbMap = {
      'dashboard': { label: 'Dashboard', path: '/dashboard' },
      'ai-chat-interface': { label: 'AI Assistant', path: '/ai-chat-interface' },
      'financial-data-overview': { label: 'Financial Data', path: '/financial-data-overview' },
      'privacy-permissions': { label: 'Privacy Settings', path: '/privacy-permissions' },
      'accounts': { label: 'Accounts', path: '/financial-data-overview/accounts' },
      'transactions': { label: 'Transactions', path: '/financial-data-overview/transactions' },
      'budgets': { label: 'Budgets', path: '/financial-data-overview/budgets' },
      'reports': { label: 'Reports', path: '/financial-data-overview/reports' },
    };

    const breadcrumbs = [
      { label: 'Home', path: '/dashboard', isHome: true }
    ];

    let currentPath = '';
    pathSegments?.forEach((segment) => {
      currentPath += `/${segment}`;
      const breadcrumb = breadcrumbMap?.[segment];
      if (breadcrumb) {
        breadcrumbs?.push({
          label: breadcrumb?.label,
          path: currentPath,
          isActive: currentPath === location?.pathname
        });
      }
    });

    return breadcrumbs?.length > 1 ? breadcrumbs : [];
  };

  const breadcrumbs = customItems || getDefaultBreadcrumbs();

  if (breadcrumbs?.length === 0) {
    return null;
  }

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((item, index) => (
          <li key={item?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-muted-foreground mx-2" 
              />
            )}
            
            {item?.isActive ? (
              <span className="text-foreground font-medium">
                {item?.label}
              </span>
            ) : (
              <Link
                to={item?.path}
                className="text-muted-foreground hover:text-foreground transition-smooth"
              >
                {item?.isHome ? (
                  <div className="flex items-center space-x-1">
                    <Icon name="Home" size={14} />
                    <span className="hidden sm:inline">{item?.label}</span>
                  </div>
                ) : (
                  item?.label
                )}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;