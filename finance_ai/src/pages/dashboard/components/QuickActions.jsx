import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const actions = [
    {
      id: 'view-accounts',
      title: 'View All Accounts',
      description: 'Check balances and account details',
      icon: 'Wallet',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      path: '/financial-data-overview',
      badge: null
    },
    {
      id: 'manage-permissions',
      title: 'Manage Permissions',
      description: 'Control AI access to your data',
      icon: 'Shield',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      path: '/privacy-permissions',
      badge: 'Partial Access'
    },
    {
      id: 'ai-chat',
      title: 'Full AI Chat',
      description: 'Deep dive into financial analysis',
      icon: 'MessageSquare',
      color: 'text-success',
      bgColor: 'bg-success/10',
      path: '/ai-chat-interface',
      badge: 'Online'
    },
    {
      id: 'financial-reports',
      title: 'Generate Report',
      description: 'Create detailed financial summary',
      icon: 'FileText',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      path: '/financial-data-overview',
      badge: null
    }
  ];

  return (
  <div className="bg-card border border-border rounded-lg p-6 card-shadow w-full">
      {/* Header exactly like Financial Health Score */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-secondary rounded-full"></div>
          <span className="text-sm font-medium text-secondary">Available</span>
        </div>
      </div>

  {/* 4-column grid, matching Financial Metrics Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions?.map((action) => (
          <Link
            key={action?.id}
            to={action?.path}
            className="flex flex-col items-center justify-center text-center p-4 bg-muted/30 hover:bg-muted/50 rounded-lg transition-smooth h-full min-h-[170px]"
          >
            <div className={`p-3 rounded-lg mb-2 ${action?.bgColor} group-hover:scale-105 transition-smooth`}>
              <Icon name={action?.icon} size={32} className={action?.color} />
            </div>
            <div className="text-base font-semibold text-foreground group-hover:text-primary transition-smooth">
              {action?.title}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {action?.description}
            </div>
            {action?.badge && (
              <span className="mt-2 px-2 py-1 text-xs font-medium bg-background text-muted-foreground rounded-full">
                {action?.badge}
              </span>
            )}
            <Icon 
              name="ArrowRight" 
              size={16} 
              className="mt-2 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-smooth" 
            />
          </Link>
        ))}
      </div>

      {/* Info/tip section exactly like Financial Health Score tip */}
      <div className="mt-6 p-4 bg-accent/10 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="p-1 bg-accent/20 rounded flex items-center justify-center">
            <Icon name="Zap" size={16} className="text-accent" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground mb-1">
              Tip: Use Quick Actions for Efficiency
            </h3>
            <p className="text-xs text-muted-foreground">
              Access your most-used features instantly from here to save time and streamline your workflow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;