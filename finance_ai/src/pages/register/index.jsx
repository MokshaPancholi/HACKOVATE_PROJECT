import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import RegistrationForm from './components/RegistrationForm';
import PrivacyControls from './components/PrivacyControls';
import TrustSignals from './components/TrustSignals';
import TermsAndPrivacy from './components/TermsAndPrivacy';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationData, setRegistrationData] = useState({
    formData: null,
    permissions: {},
    agreements: {}
  });
  const [agreementErrors, setAgreementErrors] = useState({});

  // Initialize default permissions (all disabled for privacy-first approach)
  const defaultPermissions = {
    account_balances: false,
    account_details: false,
    account_history: false,
    transaction_amounts: false,
    merchant_info: false,
    transaction_locations: false,
    portfolio_value: false,
    stock_holdings: false,
    investment_history: false,
    credit_score: false,
    credit_accounts: false,
    payment_history: false,
    budget_categories: false,
    spending_goals: false,
    budget_performance: false
  };

  const [permissions, setPermissions] = useState(defaultPermissions);
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false
  });

  const handleFormSubmit = (formData) => {
    setRegistrationData(prev => ({ ...prev, formData }));
    setCurrentStep(2);
  };

  const handlePermissionChange = (updates) => {
    setPermissions(prev => ({ ...prev, ...updates }));
  };

  const handleAgreementChange = (updates) => {
    setAgreements(prev => ({ ...prev, ...updates }));
    // Clear errors when user makes changes
    const errorKeys = Object.keys(updates);
    if (errorKeys?.length > 0) {
      setAgreementErrors(prev => {
        const newErrors = { ...prev };
        errorKeys?.forEach(key => {
          if (updates?.[key]) delete newErrors?.[key];
        });
        return newErrors;
      });
    }
  };

  const validateAgreements = () => {
    const errors = {};
    if (!agreements?.terms) {
      errors.terms = 'You must agree to the Terms of Service';
    }
    if (!agreements?.privacy) {
      errors.privacy = 'You must acknowledge the Privacy Policy';
    }
    setAgreementErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handleFinalSubmit = async () => {
    if (!validateAgreements()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Split fullName into first_name and last_name
      const fullName = registrationData?.formData?.fullName?.trim() || '';
      const nameParts = fullName.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Map form data to backend expected format
      const regData = {
        email: registrationData?.formData?.email,
        username: registrationData?.formData?.email, // Backend sets username = email
        password: registrationData?.formData?.password,
        password2: registrationData?.formData?.confirmPassword,
        first_name: firstName,
        last_name: lastName
      };

      const res = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regData)
      });
      
      const result = await res.json();
      
      if (res.ok && result.success) {
        // Registration successful - show success message and redirect to login
        alert('Registration successful! You can now login with your credentials.');
        navigate('/login');
      } else {
        // Registration failed - show error details
        let errorMsg = 'Registration failed.';
        if (result.errors) {
          const errorDetails = Object.values(result.errors).flat().join(', ');
          errorMsg += ' ' + errorDetails;
        } else if (result.message) {
          errorMsg += ' ' + result.message;
        }
        alert(errorMsg);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const goBackToForm = () => {
    setCurrentStep(1);
  };

  const steps = [
    { number: 1, title: 'Account Details', description: 'Basic information' },
    { number: 2, title: 'Privacy & Terms', description: 'Data permissions & agreements' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border nav-shadow">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="TrendingUp" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">FinanceAI</span>
            </div>
            
            {/* Step Indicator */}
            <div className="hidden md:flex items-center space-x-4">
              {steps?.map((step, index) => (
                <div key={step?.number} className="flex items-center">
                  <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${
                    currentStep >= step?.number 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <span className="text-sm font-medium">{step?.number}</span>
                    <span className="text-sm">{step?.title}</span>
                  </div>
                  {index < steps?.length - 1 && (
                    <Icon name="ChevronRight" size={16} className="text-muted-foreground mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">
        {currentStep === 1 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Registration Form */}
            <div className="order-2 lg:order-1">
              <RegistrationForm 
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
              />
            </div>

            {/* Trust Signals */}
            <div className="order-1 lg:order-2">
              <TrustSignals />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Privacy Controls */}
            <div className="lg:col-span-2">
              <PrivacyControls 
                permissions={permissions}
                onPermissionChange={handlePermissionChange}
              />
            </div>

            {/* Terms and Privacy + Actions */}
            <div className="space-y-6">
              <TermsAndPrivacy 
                agreements={agreements}
                onAgreementChange={handleAgreementChange}
                errors={agreementErrors}
              />

              {/* Action Buttons */}
              <div className="bg-card border border-border rounded-lg p-6 card-shadow">
                <div className="space-y-4">
                  <button
                    onClick={goBackToForm}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-muted-foreground hover:text-foreground border border-border rounded-lg transition-smooth"
                  >
                    <Icon name="ArrowLeft" size={16} />
                    <span>Back to Account Details</span>
                  </button>

                  <button
                    onClick={handleFinalSubmit}
                    disabled={isLoading || !agreements?.terms || !agreements?.privacy}
                    className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-smooth ${
                      isLoading || !agreements?.terms || !agreements?.privacy
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Icon name="Loader2" size={16} className="animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <Icon name="UserPlus" size={16} />
                        <span>Create Account</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Icon name="Mail" size={14} className="text-accent mt-0.5" />
                    <div className="text-xs">
                      <p className="text-foreground font-medium">Email Verification Required</p>
                      <p className="text-muted-foreground">
                        We'll send a verification link to your email address after registration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      {/* Mobile Step Indicator */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {steps?.length}
          </div>
          <div className="flex space-x-2">
            {steps?.map((step) => (
              <div
                key={step?.number}
                className={`w-2 h-2 rounded-full ${
                  currentStep >= step?.number ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;