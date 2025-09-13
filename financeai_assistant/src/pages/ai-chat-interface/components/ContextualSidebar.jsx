import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContextualSidebar = ({ currentContext, financialSummary }) => {
  const contextData = {
    spending: {
      title: 'Spending Analysis',
      icon: 'Receipt',
      data: [
        { label: 'This Month', value: '$2,847.32', change: '+12%', trend: 'up' },
        { label: 'Average Daily', value: '$94.91', change: '-3%', trend: 'down' },
        { label: 'Top Category', value: 'Groceries', change: '$456.78', trend: 'neutral' }
      ]
    },
    investments: {
      title: 'Investment Overview',
      icon: 'TrendingUp',
      data: [
        { label: 'Total Portfolio', value: '$45,678.90', change: '+5.2%', trend: 'up' },
        { label: 'Monthly Return', value: '$1,234.56', change: '+8.1%', trend: 'up' },
        { label: 'Best Performer', value: 'Tech ETF', change: '+15.3%', trend: 'up' }
      ]
    },
    budgets: {
      title: 'Budget Status',
      icon: 'Target',
      data: [
        { label: 'Monthly Budget', value: '$3,500.00', change: '81% used', trend: 'neutral' },
        { label: 'Remaining', value: '$652.68', change: '19%', trend: 'neutral' },
        { label: 'Over Budget', value: '2 categories', change: 'Dining, Entertainment', trend: 'down' }
      ]
    },
    accounts: {
      title: 'Account Balances',
      icon: 'CreditCard',
      data: [
        { label: 'Checking', value: '$3,247.89', change: '-$156.78', trend: 'down' },
        { label: 'Savings', value: '$12,456.34', change: '+$500.00', trend: 'up' },
        { label: 'Credit Available', value: '$8,750.00', change: '87.5%', trend: 'up' }
      ]
    }
  };

  const currentData = contextData?.[currentContext] || contextData?.spending;

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="w-80 bg-card border-r border-border h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name={currentData?.icon} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{currentData?.title}</h3>
            <p className="text-sm text-muted-foreground">Real-time data</p>
          </div>
        </div>
      </div>
      {/* Context Data */}
      <div className="p-4 space-y-4">
        {currentData?.data?.map((item, index) => (
          <div key={index} className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{item?.label}</span>
              <Icon 
                name={getTrendIcon(item?.trend)} 
                size={14} 
                className={getTrendColor(item?.trend)} 
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-foreground">{item?.value}</span>
              <span className={`text-sm ${getTrendColor(item?.trend)}`}>
                {item?.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Insights */}
      <div className="p-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Quick Insights</h4>
        <div className="space-y-3">
          <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
            <div className="flex items-start space-x-2">
              <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
              <div>
                <p className="text-sm text-foreground font-medium">Spending Tip</p>
                <p className="text-xs text-muted-foreground mt-1">
                  You're spending 23% more on dining out this month. Consider meal planning to save $200+.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-success/10 rounded-lg border border-success/20">
            <div className="flex items-start space-x-2">
              <Icon name="TrendingUp" size={16} className="text-success mt-0.5" />
              <div>
                <p className="text-sm text-foreground font-medium">Good Progress</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your emergency fund is 78% complete. You're on track to reach your goal by December.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Related Actions */}
      <div className="p-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Related Actions</h4>
        <div className="space-y-2">
          <Link to="/financial-data-overview">
            <Button variant="outline" size="sm" fullWidth iconName="BarChart3">
              View Detailed Reports
            </Button>
          </Link>
          <Link to="/privacy-permissions">
            <Button variant="outline" size="sm" fullWidth iconName="Settings">
              Adjust Data Access
            </Button>
          </Link>
        </div>
      </div>
      {/* Last Updated */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Clock" size={12} />
          <span>Last updated: {new Date()?.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}</span>
        </div>
      </div>
    </div>
  );
};

export default ContextualSidebar;