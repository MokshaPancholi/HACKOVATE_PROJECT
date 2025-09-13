import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeMessage = () => {
  const features = [
    {
      icon: 'MessageSquare',
      title: 'AI-Powered Insights',
      description: 'Get personalized financial advice through natural conversations'
    },
    {
      icon: 'PieChart',
      title: 'Smart Analytics',
      description: 'Understand your spending patterns and optimize your budget'
    },
    {
      icon: 'Shield',
      title: 'Privacy First',
      description: 'Complete control over your data with granular permissions'
    }
  ];

  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-center lg:px-8 xl:px-12">
      <div className="max-w-md">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
              <Icon name="TrendingUp" size={24} color="white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">FinanceAI</h2>
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Your Personal Finance Assistant
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Transform how you manage money with AI-powered insights that understand your financial goals and help you make smarter decisions.
          </p>
        </div>

        <div className="space-y-6">
          {features?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg flex-shrink-0">
                <Icon name={feature?.icon} size={20} className="text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {feature?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-success/5 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Users" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">Trusted by 50,000+ users</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Join thousands who've taken control of their financial future
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;