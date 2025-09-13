import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import LoadingOverlay from './components/LoadingOverlay';
import WelcomeMessage from './components/WelcomeMessage';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <LoadingOverlay isVisible={isLoading} />
      
      <div className="flex min-h-screen">
        {/* Left Side - Welcome Message (Desktop Only) */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/5 to-accent/5 border-r border-border">
          <WelcomeMessage />
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 lg:w-1/2 flex flex-col">
          <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
            <div className="w-full max-w-md space-y-8">
              <LoginForm />
              
              {/* Mobile Welcome Message */}
              <div className="lg:hidden">
                <div className="text-center mb-6">
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    Why Choose FinanceAI?
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    AI-powered insights with complete privacy control
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="p-6 lg:p-8 border-t border-border bg-muted/20">
            <TrustSignals />
          </div>
        </div>
      </div>

      {/* Demo Credentials Notice */}
      <div className="fixed bottom-4 right-4 bg-card border border-border rounded-lg p-4 card-shadow max-w-sm">
        <div className="flex items-start space-x-2">
          <div className="flex items-center justify-center w-6 h-6 bg-accent/10 rounded-full flex-shrink-0 mt-0.5">
            <span className="text-xs font-bold text-accent">i</span>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-foreground mb-1">Demo Credentials</h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Email:</strong> john.doe@example.com</p>
              <p><strong>Password:</strong> Finance123!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;