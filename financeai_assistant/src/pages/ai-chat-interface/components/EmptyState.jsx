import React from 'react';
import Icon from '../../../components/AppIcon';


const EmptyState = ({ onSuggestedQuery }) => {
  const suggestedQueries = [
    {
      icon: 'PiggyBank',
      title: 'Vacation Planning',
      query: 'Can I afford a vacation to Europe this summer?',
      description: 'Get personalized affordability analysis'
    },
    {
      icon: 'TrendingUp',
      title: 'Spending Analysis',
      query: 'Analyze my spending patterns for the last 3 months',
      description: 'Discover insights about your expenses'
    },
    {
      icon: 'Target',
      title: 'Budget Planning',
      query: 'Help me create a monthly budget plan',
      description: 'Build a personalized budget strategy'
    },
    {
      icon: 'CreditCard',
      title: 'Debt Management',
      query: 'What\'s the best strategy to pay off my credit cards?',
      description: 'Optimize your debt repayment plan'
    },
    {
      icon: 'LineChart',
      title: 'Investment Review',
      query: 'How is my investment portfolio performing?',
      description: 'Get detailed portfolio analysis'
    },
    {
      icon: 'AlertTriangle',
      title: 'Unusual Spending',
      query: 'Have I made any unusual purchases recently?',
      description: 'Detect spending anomalies'
    }
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="MessageSquare" size={40} className="text-accent" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Welcome to FinanceAI Assistant
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ask me anything about your finances. I can help you analyze spending, plan budgets, 
            review investments, and make informed financial decisions.
          </p>
        </div>

        {/* Suggested Queries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {suggestedQueries?.map((item, index) => (
            <button
              key={index}
              onClick={() => onSuggestedQuery(item?.query)}
              className="p-6 bg-card border border-border rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 text-left group"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Icon name={item?.icon} size={20} className="text-primary" />
                </div>
                <h3 className="font-medium text-foreground">{item?.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {item?.description}
              </p>
              <p className="text-sm text-primary font-medium">
                "{item?.query}"
              </p>
            </button>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="Shield" size={24} className="text-success" />
            </div>
            <h4 className="font-medium text-foreground mb-2">Privacy First</h4>
            <p className="text-sm text-muted-foreground">
              Your data is encrypted and you control what I can access
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="Brain" size={24} className="text-accent" />
            </div>
            <h4 className="font-medium text-foreground mb-2">AI Powered</h4>
            <p className="text-sm text-muted-foreground">
              Advanced AI provides personalized financial insights
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="Zap" size={24} className="text-warning" />
            </div>
            <h4 className="font-medium text-foreground mb-2">Real-time</h4>
            <p className="text-sm text-muted-foreground">
              Get instant answers based on your latest financial data
            </p>
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-muted/50 rounded-xl p-6">
          <h4 className="font-medium text-foreground mb-2">Getting Started</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Simply type your question in natural language or click on one of the suggestions above.
          </p>
          <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
            <span className="flex items-center space-x-1">
              <Icon name="Type" size={12} />
              <span>Natural language</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>Instant responses</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="BarChart" size={12} />
              <span>Visual insights</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;