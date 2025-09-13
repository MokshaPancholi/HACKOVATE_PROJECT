import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataPermissionPanel = ({ permissions, onTogglePermission }) => {
  const permissionCategories = [
    {
      id: 'accounts',
      name: 'Bank Accounts',
      description: 'Checking, savings, and account balances',
      icon: 'CreditCard',
      enabled: permissions?.accounts,
      dataCount: '3 accounts'
    },
    {
      id: 'transactions',
      name: 'Transactions',
      description: 'Purchase history and spending data',
      icon: 'Receipt',
      enabled: permissions?.transactions,
      dataCount: '1,247 transactions'
    },
    {
      id: 'investments',
      name: 'Investments',
      description: 'Portfolio, stocks, and retirement funds',
      icon: 'TrendingUp',
      enabled: permissions?.investments,
      dataCount: '5 portfolios'
    },
    {
      id: 'creditScore',
      name: 'Credit Score',
      description: 'Credit history and score monitoring',
      icon: 'Award',
      enabled: permissions?.creditScore,
      dataCount: 'Score: 742'
    },
    {
      id: 'budgets',
      name: 'Budgets',
      description: 'Budget categories and spending limits',
      icon: 'Target',
      enabled: permissions?.budgets,
      dataCount: '8 categories'
    },
    {
      id: 'goals',
      name: 'Financial Goals',
      description: 'Savings goals and progress tracking',
      icon: 'Flag',
      enabled: permissions?.goals,
      dataCount: '4 active goals'
    }
  ];

  const enabledCount = permissionCategories?.filter(cat => cat?.enabled)?.length;
  const totalCount = permissionCategories?.length;

  return (
    <div className="w-80 bg-card border-l border-border h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-foreground">Data Access</h3>
          <Link to="/privacy-permissions">
            <Button variant="ghost" size="sm" iconName="Settings">
              Manage
            </Button>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          AI can access {enabledCount} of {totalCount} data categories
        </p>
        
        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Access Level</span>
            <span>{Math.round((enabledCount / totalCount) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(enabledCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </div>
      {/* Permission Categories */}
      <div className="p-4 space-y-3">
        {permissionCategories?.map((category) => (
          <div
            key={category?.id}
            className={`p-3 rounded-lg border transition-all duration-200 ${
              category?.enabled 
                ? 'border-primary/20 bg-primary/5' :'border-border bg-muted/30'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`p-2 rounded-lg ${
                  category?.enabled 
                    ? 'bg-primary/10 text-primary' :'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={category?.icon} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className={`text-sm font-medium ${
                      category?.enabled ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {category?.name}
                    </h4>
                    {category?.enabled && (
                      <Icon name="Check" size={12} className="text-success" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {category?.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">
                    {category?.dataCount}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onTogglePermission(category?.id)}
                className={`ml-2 w-8 h-5 rounded-full transition-colors duration-200 relative ${
                  category?.enabled ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                  category?.enabled ? 'translate-x-4' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Shield"
            onClick={() => onTogglePermission('all', false)}
          >
            Disable All Access
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="ShieldCheck"
            onClick={() => onTogglePermission('all', true)}
          >
            Enable All Access
          </Button>
        </div>
      </div>
      {/* Security Notice */}
      <div className="p-4 bg-muted/50">
        <div className="flex items-start space-x-2">
          <Icon name="Lock" size={14} className="text-muted-foreground mt-0.5" />
          <div>
            <p className="text-xs text-muted-foreground">
              Your data is encrypted and processed locally. AI responses are generated based only on enabled categories.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPermissionPanel;