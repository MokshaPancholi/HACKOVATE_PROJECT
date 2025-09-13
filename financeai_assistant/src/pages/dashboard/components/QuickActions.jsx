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
    <div className="bg-card border border-border rounded-lg p-6 card-shadow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-secondary/10 rounded-lg">
          <Icon name="Zap" size={20} className="text-secondary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
          <p className="text-sm text-muted-foreground">Frequently used features</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action) => (
          <Link
            key={action?.id}
            to={action?.path}
            className="group block p-4 bg-muted/30 hover:bg-muted/50 rounded-lg transition-smooth"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${action?.bgColor} group-hover:scale-105 transition-smooth`}>
                <Icon name={action?.icon} size={20} className={action?.color} />
              </div>
              {action?.badge && (
                <span className="px-2 py-1 text-xs font-medium bg-background text-muted-foreground rounded-full">
                  {action?.badge}
                </span>
              )}
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-smooth">
                {action?.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {action?.description}
              </p>
            </div>
            
            <div className="flex items-center justify-end mt-3">
              <Icon 
                name="ArrowRight" 
                size={16} 
                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-smooth" 
              />
            </div>
          </Link>
        ))}
      </div>
      {/* Additional Quick Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <p className="text-lg font-bold text-foreground">12</p>
            <p className="text-xs text-muted-foreground">Connected Accounts</p>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-bold text-foreground">847</p>
            <p className="text-xs text-muted-foreground">AI Conversations</p>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-bold text-foreground">98%</p>
            <p className="text-xs text-muted-foreground">Data Accuracy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;