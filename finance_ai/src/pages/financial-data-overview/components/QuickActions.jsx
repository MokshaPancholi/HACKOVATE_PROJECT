import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onAddAccount, onCategorizeTransactions, onUpdateInformation, onSyncData }) => {
  const [syncStatus, setSyncStatus] = useState('idle'); // idle, syncing, success, error

  const handleSyncData = async () => {
    setSyncStatus('syncing');
    try {
      await onSyncData();
      setSyncStatus('success');
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (error) {
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  };

  const getSyncButtonConfig = () => {
    switch (syncStatus) {
      case 'syncing':
        return {
          variant: 'outline',
          iconName: 'RefreshCw',
          text: 'Syncing...',
          disabled: true,
          className: 'animate-spin'
        };
      case 'success':
        return {
          variant: 'success',
          iconName: 'CheckCircle',
          text: 'Synced',
          disabled: false
        };
      case 'error':
        return {
          variant: 'destructive',
          iconName: 'AlertCircle',
          text: 'Sync Failed',
          disabled: false
        };
      default:
        return {
          variant: 'outline',
          iconName: 'RefreshCw',
          text: 'Sync All Data',
          disabled: false
        };
    }
  };

  const syncConfig = getSyncButtonConfig();

  const quickActions = [
    {
      id: 'add-account',
      title: 'Add New Account',
      description: 'Connect a new bank account, credit card, or investment account',
      icon: 'Plus',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      action: onAddAccount,
      buttonText: 'Add Account',
      buttonVariant: 'default'
    },
    {
      id: 'categorize',
      title: 'Categorize Transactions',
      description: 'Review and organize uncategorized transactions',
      icon: 'Tag',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      action: onCategorizeTransactions,
      buttonText: 'Categorize',
      buttonVariant: 'outline',
      badge: '23 pending'
    },
    {
      id: 'update-info',
      title: 'Update Information',
      description: 'Review and update account details and preferences',
      icon: 'Edit',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      action: onUpdateInformation,
      buttonText: 'Update',
      buttonVariant: 'outline'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">Manage your financial data efficiently</p>
        </div>
        <Button
          variant={syncConfig?.variant}
          size="sm"
          onClick={handleSyncData}
          disabled={syncConfig?.disabled}
          iconName={syncConfig?.iconName}
          iconPosition="left"
          className={syncConfig?.className}
        >
          {syncConfig?.text}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions?.map((action) => (
          <div key={action?.id} className="relative">
            <div className={`p-4 rounded-lg border border-border hover:border-primary/20 transition-smooth ${action?.bgColor}`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg bg-card`}>
                  <Icon name={action?.icon} size={20} className={action?.color} />
                </div>
                {action?.badge && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full font-medium">
                    {action?.badge}
                  </span>
                )}
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-foreground mb-1">{action?.title}</h4>
                <p className="text-sm text-muted-foreground">{action?.description}</p>
              </div>
              
              <Button
                variant={action?.buttonVariant}
                size="sm"
                onClick={action?.action}
                fullWidth
                iconName="ArrowRight"
                iconPosition="right"
              >
                {action?.buttonText}
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Additional Quick Links */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Need help organizing your data?
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              iconName="HelpCircle"
              iconPosition="left"
            >
              View Guide
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="MessageSquare"
              iconPosition="left"
            >
              Ask AI Assistant
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;