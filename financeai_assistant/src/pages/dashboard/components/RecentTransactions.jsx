import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentTransactions = () => {
  const transactions = [
    {
      id: 'txn-001',
      type: 'expense',
      category: 'Groceries',
      merchant: 'Whole Foods Market',
      amount: -89.45,
      date: '2025-01-12',
      icon: 'ShoppingCart',
      color: 'text-error'
    },
    {
      id: 'txn-002',
      type: 'income',
      category: 'Salary',
      merchant: 'Tech Corp Inc.',
      amount: 4250.00,
      date: '2025-01-10',
      icon: 'DollarSign',
      color: 'text-success'
    },
    {
      id: 'txn-003',
      type: 'expense',
      category: 'Transportation',
      merchant: 'Uber',
      amount: -24.80,
      date: '2025-01-09',
      icon: 'Car',
      color: 'text-error'
    },
    {
      id: 'txn-004',
      type: 'expense',
      category: 'Entertainment',
      merchant: 'Netflix',
      amount: -15.99,
      date: '2025-01-08',
      icon: 'Play',
      color: 'text-error'
    },
    {
      id: 'txn-005',
      type: 'expense',
      category: 'Utilities',
      merchant: 'Electric Company',
      amount: -125.30,
      date: '2025-01-07',
      icon: 'Zap',
      color: 'text-error'
    }
  ];

  const formatAmount = (amount) => {
    const formatted = Math.abs(amount)?.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    return amount < 0 ? `-${formatted}` : `+${formatted}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Receipt" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
            <p className="text-sm text-muted-foreground">Last 5 transactions</p>
          </div>
        </div>
        <Link to="/financial-data-overview">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            View All
            <Icon name="ArrowRight" size={16} className="ml-1" />
          </Button>
        </Link>
      </div>
      <div className="space-y-4">
        {transactions?.map((transaction) => (
          <div key={transaction?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-background rounded-lg">
                <Icon name={transaction?.icon} size={18} className={transaction?.color} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  {transaction?.merchant}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">
                    {transaction?.category}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(transaction?.date)}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-semibold ${
                transaction?.amount < 0 ? 'text-error' : 'text-success'
              }`}>
                {formatAmount(transaction?.amount)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total this week:</span>
          <span className="font-semibold text-error">-$255.54</span>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;