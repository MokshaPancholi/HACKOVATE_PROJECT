import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategoryCard = ({ category, onViewDetails, onAddAccount }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getCategoryIcon = (type) => {
    const icons = {
      assets: 'Wallet',
      liabilities: 'CreditCard',
      transactions: 'ArrowRightLeft',
      investments: 'TrendingUp',
      retirement: 'PiggyBank',
      credit: 'Shield'
    };
    return icons?.[type] || 'FileText';
  };

  const getCategoryColor = (type) => {
    const colors = {
      assets: 'text-success',
      liabilities: 'text-error',
      transactions: 'text-primary',
      investments: 'text-accent',
      retirement: 'text-warning',
      credit: 'text-secondary'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  return (
    <div className="bg-card border border-border rounded-lg card-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-muted`}>
              <Icon 
                name={getCategoryIcon(category?.type)} 
                size={24} 
                className={getCategoryColor(category?.type)} 
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{category?.title}</h3>
              <p className="text-sm text-muted-foreground">{category?.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getCategoryColor(category?.type)}`}>
              {formatCurrency(category?.totalAmount)}
            </div>
            <div className="text-sm text-muted-foreground">
              {category?.accountCount} {category?.accountCount === 1 ? 'account' : 'accounts'}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="text-muted-foreground">Last updated: </span>
              <span className="text-foreground font-medium">{category?.lastUpdated}</span>
            </div>
            {category?.hasIssues && (
              <div className="flex items-center space-x-1 text-warning">
                <Icon name="AlertTriangle" size={16} />
                <span className="text-xs font-medium">Needs attention</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
            >
              {isExpanded ? 'Less' : 'Details'}
            </Button>
            {category?.canAddAccount && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onAddAccount(category?.type)}
                iconName="Plus"
                iconPosition="left"
              >
                Add
              </Button>
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category?.accounts?.map((account) => (
                <div key={account?.id} className="bg-muted rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center">
                        <Icon name={account?.icon} size={16} className="text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{account?.name}</div>
                        <div className="text-xs text-muted-foreground">{account?.type}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">
                        {formatCurrency(account?.balance)}
                      </div>
                      {account?.change && (
                        <div className={`text-xs ${account?.change > 0 ? 'text-success' : 'text-error'}`}>
                          {account?.change > 0 ? '+' : ''}{account?.change}%
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Updated {account?.lastSync}
                    </div>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => onViewDetails(account)}
                      className="text-xs"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;