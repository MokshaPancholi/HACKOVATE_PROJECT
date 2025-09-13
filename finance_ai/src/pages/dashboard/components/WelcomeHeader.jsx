import React from 'react';
import Icon from '../../../components/AppIcon';
import PermissionStatusIndicator from '../../../components/ui/PermissionStatusIndicator';

const WelcomeHeader = () => {
  const currentTime = new Date();
  const currentHour = currentTime?.getHours();
  
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getGreetingIcon = () => {
    if (currentHour < 12) return 'Sun';
    if (currentHour < 17) return 'Sun';
    return 'Moon';
  };

  const formatDate = () => {
    return currentTime?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-border rounded-lg p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name={getGreetingIcon()} size={24} className="text-primary" />
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              {getGreeting()}, John!
            </h1>
          </div>
          <p className="text-muted-foreground">
            {formatDate()} • Here's your financial overview
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <PermissionStatusIndicator 
            permissionLevel="partial" 
            showDetails={false}
            className="w-full sm:w-auto"
          />
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Net Worth</p>
            <p className="text-lg font-bold text-success">$42,130.75</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Monthly Budget</p>
            <p className="text-lg font-bold text-primary">$4,500.00</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Savings Rate</p>
            <p className="text-lg font-bold text-accent">28.5%</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Credit Score</p>
            <p className="text-lg font-bold text-warning">742</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;