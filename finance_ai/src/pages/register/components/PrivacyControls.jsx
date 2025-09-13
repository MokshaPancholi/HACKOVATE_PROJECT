import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const PrivacyControls = ({ permissions, onPermissionChange }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const privacyCategories = [
    {
      id: 'accounts',
      title: 'Bank Accounts & Balances',
      description: 'Access to checking, savings, and investment account balances',
      icon: 'CreditCard',
      items: [
        { id: 'account_balances', label: 'Account balances and totals' },
        { id: 'account_details', label: 'Account names and institutions' },
        { id: 'account_history', label: 'Account opening dates and history' }
      ]
    },
    {
      id: 'transactions',
      title: 'Transaction History',
      description: 'Access to spending patterns and transaction details',
      icon: 'Receipt',
      items: [
        { id: 'transaction_amounts', label: 'Transaction amounts and dates' },
        { id: 'merchant_info', label: 'Merchant names and categories' },
        { id: 'transaction_locations', label: 'Transaction locations' }
      ]
    },
    {
      id: 'investments',
      title: 'Investment Portfolio',
      description: 'Access to investment holdings and performance data',
      icon: 'TrendingUp',
      items: [
        { id: 'portfolio_value', label: 'Portfolio values and performance' },
        { id: 'stock_holdings', label: 'Individual stock and fund holdings' },
        { id: 'investment_history', label: 'Buy/sell transaction history' }
      ]
    },
    {
      id: 'credit',
      title: 'Credit Information',
      description: 'Access to credit scores and credit account details',
      icon: 'Shield',
      items: [
        { id: 'credit_score', label: 'Credit score and history' },
        { id: 'credit_accounts', label: 'Credit card and loan balances' },
        { id: 'payment_history', label: 'Payment history and patterns' }
      ]
    },
    {
      id: 'budgets',
      title: 'Budgets & Goals',
      description: 'Access to spending budgets and financial goals',
      icon: 'Target',
      items: [
        { id: 'budget_categories', label: 'Budget categories and limits' },
        { id: 'spending_goals', label: 'Savings and spending goals' },
        { id: 'budget_performance', label: 'Budget vs actual spending' }
      ]
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleCategoryToggle = (categoryId, checked) => {
    const category = privacyCategories?.find(cat => cat?.id === categoryId);
    const updates = {};
    
    category?.items?.forEach(item => {
      updates[item.id] = checked;
    });
    
    onPermissionChange(updates);
  };

  const isCategoryFullyEnabled = (categoryId) => {
    const category = privacyCategories?.find(cat => cat?.id === categoryId);
    return category?.items?.every(item => permissions?.[item?.id]);
  };

  const isCategoryPartiallyEnabled = (categoryId) => {
    const category = privacyCategories?.find(cat => cat?.id === categoryId);
    const enabledItems = category?.items?.filter(item => permissions?.[item?.id]);
    return enabledItems?.length > 0 && enabledItems?.length < category?.items?.length;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-shadow">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Privacy Controls</h2>
        <p className="text-muted-foreground text-sm">
          Choose what financial data the AI can access. You can change these settings anytime.
        </p>
      </div>
      <div className="space-y-4">
        {privacyCategories?.map((category) => {
          const isFullyEnabled = isCategoryFullyEnabled(category?.id);
          const isPartiallyEnabled = isCategoryPartiallyEnabled(category?.id);
          const isExpanded = expandedSection === category?.id;

          return (
            <div key={category?.id} className="border border-border rounded-lg">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      isFullyEnabled ? 'bg-success/10' : isPartiallyEnabled ?'bg-warning/10' : 'bg-muted'
                    }`}>
                      <Icon 
                        name={category?.icon} 
                        size={20} 
                        className={
                          isFullyEnabled ? 'text-success' : isPartiallyEnabled ?'text-warning' : 'text-muted-foreground'
                        } 
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{category?.title}</h3>
                      <p className="text-sm text-muted-foreground">{category?.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={isFullyEnabled}
                      indeterminate={isPartiallyEnabled}
                      onChange={(e) => handleCategoryToggle(category?.id, e?.target?.checked)}
                    />
                    <button
                      type="button"
                      onClick={() => toggleSection(category?.id)}
                      className="text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      <Icon 
                        name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                        size={16} 
                      />
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 pl-11 space-y-3">
                    {category?.items?.map((item) => (
                      <Checkbox
                        key={item?.id}
                        label={item?.label}
                        checked={permissions?.[item?.id] || false}
                        onChange={(e) => onPermissionChange({ [item?.id]: e?.target?.checked })}
                        size="sm"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-accent mt-0.5" />
          <div className="text-sm">
            <p className="text-foreground font-medium mb-1">Your data, your control</p>
            <p className="text-muted-foreground">
              These permissions only affect what the AI can see. Your financial data remains secure 
              and encrypted. You can modify these settings anytime from your privacy dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyControls;