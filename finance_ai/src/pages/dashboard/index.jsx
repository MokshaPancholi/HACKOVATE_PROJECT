import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import WelcomeHeader from './components/WelcomeHeader';
import FinancialMetricsCards from './components/FinancialMetricsCards';
import QuickActions from './components/QuickActions';
import Carousel from './components/Carousel';

const Dashboard = () => {
  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    // Set current language state if needed
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard - FinanceAI Assistant</title>
        <meta name="description" content="Your personal AI-powered financial command center with comprehensive insights and data management." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Welcome Section */}
            <WelcomeHeader />

            {/* Carousel for Financial Metrics, Quick Actions, and Financial Health Score */}
            <Carousel>
              <div className="bg-card border border-border rounded-lg p-6 card-shadow w-full min-h-[400px] flex flex-col justify-between">
                <FinancialMetricsCards />
              </div>
              <div className="bg-card border border-border rounded-lg p-6 card-shadow w-full min-h-[400px] flex flex-col justify-between">
                <QuickActions />
              </div>
              {/* Financial Health Score Slide */}
              <div className="bg-card border border-border rounded-lg p-6 card-shadow w-full min-h-[400px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-foreground">Financial Health Score</h2>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="text-sm font-medium text-success">Excellent</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center justify-center text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-success mb-1">85/100</div>
                      <div className="text-sm text-muted-foreground">Overall Score</div>
                      <div className="text-xs text-muted-foreground mt-1">Above average</div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-1">92/100</div>
                      <div className="text-sm text-muted-foreground">Savings Rate</div>
                      <div className="text-xs text-muted-foreground mt-1">Excellent</div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-warning mb-1">78/100</div>
                      <div className="text-sm text-muted-foreground">Debt Management</div>
                      <div className="text-xs text-muted-foreground mt-1">Good</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-accent/20 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-foreground mb-1">
                        Tip: Optimize Your Emergency Fund
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Consider increasing your emergency fund to 6 months of expenses. You're currently at 4.2 months coverage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;