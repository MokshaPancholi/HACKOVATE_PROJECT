import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIInsightsPanel = () => {
  const [activeInsight, setActiveInsight] = useState(0);

  const insights = [
    {
      id: 'spending-pattern',
      title: 'Spending Pattern Analysis',
      type: 'analysis',
      priority: 'high',
      icon: 'TrendingDown',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      summary: 'Your grocery spending increased by 23% this month',
      details: `Based on your transaction history, you've spent $340 more on groceries compared to last month. This increase is primarily due to 4 additional shopping trips and higher-priced organic items.`,actionable: true,action: 'Set Budget Alert',timestamp: '2 hours ago'
    },
    {
      id: 'savings-forecast',title: 'Savings Forecast',type: 'forecast',priority: 'medium',icon: 'PiggyBank',color: 'text-success',bgColor: 'bg-success/10',summary: 'You\'re on track to save $1,200 this month',
      details: `At your current spending rate, you'll exceed your monthly savings goal by $200. Consider increasing your emergency fund contribution or exploring investment opportunities.`,actionable: true,action: 'Adjust Savings Plan',timestamp: '4 hours ago'
    },
    {
      id: 'investment-recommendation',title: 'Investment Opportunity',type: 'recommendation',priority: 'medium',icon: 'TrendingUp',color: 'text-accent',bgColor: 'bg-accent/10',summary: 'Consider diversifying your portfolio',details: `Your current portfolio is 70% tech stocks. Market analysis suggests adding some defensive stocks or bonds to reduce volatility and improve long-term stability.`,actionable: true,action: 'View Recommendations',timestamp: '1 day ago'
    },
    {
      id: 'unusual-spending',title: 'Unusual Activity Detected',type: 'alert',priority: 'low',icon: 'AlertTriangle',color: 'text-error',bgColor: 'bg-error/10',summary: 'Higher than usual entertainment spending',details: `You've spent $180 on entertainment this week, which is 40% above your typical weekly average. This includes streaming services, dining out, and movie tickets.`,
      actionable: false,
      action: null,
      timestamp: '3 days ago'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error text-error-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Icon name="Brain" size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">AI Insights</h2>
            <p className="text-sm text-muted-foreground">Personalized financial analysis</p>
          </div>
        </div>
        <Link to="/ai-chat-interface">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            Ask AI
            <Icon name="MessageSquare" size={16} className="ml-1" />
          </Button>
        </Link>
      </div>
      {/* Insight Tabs */}
      <div className="flex space-x-1 mb-4 bg-muted p-1 rounded-lg">
        {insights?.map((insight, index) => (
          <button
            key={insight?.id}
            onClick={() => setActiveInsight(index)}
            className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-smooth ${
              activeInsight === index
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {insight?.type?.charAt(0)?.toUpperCase() + insight?.type?.slice(1)}
          </button>
        ))}
      </div>
      {/* Active Insight */}
      <div className="space-y-4">
        {insights?.map((insight, index) => (
          <div
            key={insight?.id}
            className={`${activeInsight === index ? 'block' : 'hidden'}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${insight?.bgColor}`}>
                  <Icon name={insight?.icon} size={18} className={insight?.color} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-semibold text-foreground">
                      {insight?.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(insight?.priority)}`}>
                      {insight?.priority}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {insight?.timestamp}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm font-medium text-foreground mb-2">
                  {insight?.summary}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {insight?.details}
                </p>
              </div>

              {insight?.actionable && (
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-muted-foreground">
                    Recommended action:
                  </span>
                  <Button variant="outline" size="sm">
                    {insight?.action}
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Insight Navigation */}
      <div className="flex items-center justify-center space-x-2 mt-6 pt-4 border-t border-border">
        {insights?.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveInsight(index)}
            className={`w-2 h-2 rounded-full transition-smooth ${
              activeInsight === index ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AIInsightsPanel;