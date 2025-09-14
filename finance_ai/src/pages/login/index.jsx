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
    // Always clear authentication for development to force sign-in page
    localStorage.removeItem('isAuthenticated');
    // If you want to keep this only for dev, wrap in if (process.env.NODE_ENV === 'development')
  }, []);

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
              <button
                type="button"
                className="w-full mt-4 py-2 px-4 bg-white border border-border rounded-lg flex items-center justify-center space-x-2 shadow hover:bg-gray-50 transition"
                onClick={() => window.location.href = 'http://localhost:8000/auth/login/google-oauth2/'}
              >
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5 mr-2" />
                <span className="font-medium text-foreground">Sign in with Google</span>
              </button>
              
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

    </div>
  );
};

export default Login;