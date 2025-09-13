import React from 'react';

import Icon from '../../../components/AppIcon';

const FinancialMetricsCards = () => {
  const metrics = [
    {
      id: 'total-balance',
      title: 'Total Balance',
      value: '$24,580.50',
      change: '+$1,240.00',
      changePercent: '+5.3%',
      trend: 'up',
      icon: 'Wallet',
      color: 'text-success',
      bgColor: 'bg-success/10',
      description: 'Across all accounts'
    },
    {
      id: 'monthly-spending',
      title: 'Monthly Spending',
      value: '$3,240.80',
      change: '-$180.20',
      changePercent: '-5.3%',
      trend: 'down',
      icon: 'CreditCard',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'This month vs last month'
    },
    {
      id: 'credit-score',
      title: 'Credit Score',
      value: '742',
      change: '+12',
      changePercent: '+1.6%',
      trend: 'up',
      icon: 'TrendingUp',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      description: 'Excellent credit rating'
    },
    {
      id: 'investments',
      title: 'Investments',
      value: '$18,450.25',
      change: '+$890.15',
      changePercent: '+5.1%',
      trend: 'up',
      icon: 'PieChart',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      description: 'Portfolio performance'
    }
  ];

  return (
    <div className="financial-metrics-main-container w-full mb-12">
  <div className="box-border bg-white/90 border border-border rounded-2xl p-10 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {metrics?.map((metric) => (
            <div key={metric?.id} className="bg-card border border-border rounded-xl p-8 card-shadow hover:shadow-2xl transition-smooth min-h-[220px]">
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-xl ${metric?.bgColor}`}>
                  <Icon name={metric?.icon} size={32} className={metric?.color} />
                </div>
                <div className={`flex items-center space-x-1 text-base ${
                  metric?.trend === 'up' ? 'text-success' : 'text-error'
                }`}>
                  <Icon 
                    name={metric?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                    size={20} 
                  />
                  <span className="font-semibold">{metric?.changePercent}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-muted-foreground">
                  {metric?.title}
                </h3>
                <div className="space-y-2">
                  <p className="text-3xl font-extrabold text-foreground">
                    {metric?.value}
                  </p>
                  <div className="flex items-center space-x-3">
                    <span className={`text-base font-semibold ${
                      metric?.trend === 'up' ? 'text-success' : 'text-error'
                    }`}>
                      {metric?.change}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {metric?.description}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialMetricsCards;