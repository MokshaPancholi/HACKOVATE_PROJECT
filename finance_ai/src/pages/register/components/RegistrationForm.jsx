import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RegistrationForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password) => {
    const requirements = {
      length: password?.length >= 8,
      uppercase: /[A-Z]/?.test(password),
      lowercase: /[a-z]/?.test(password),
      number: /\d/?.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/?.test(password)
    };
    
    const score = Object.values(requirements)?.filter(Boolean)?.length;
    return { requirements, score };
  };

  const getPasswordStrength = (password) => {
    const { score } = validatePassword(password);
    if (score < 2) return { text: 'Weak', color: 'text-error', bgColor: 'bg-error' };
    if (score < 4) return { text: 'Fair', color: 'text-warning', bgColor: 'bg-warning' };
    if (score < 5) return { text: 'Good', color: 'text-accent', bgColor: 'bg-accent' };
    return { text: 'Strong', color: 'text-success', bgColor: 'bg-success' };
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear specific error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else {
      const { score } = validatePassword(formData?.password);
      if (score < 3) {
        newErrors.password = 'Password must meet at least 3 requirements';
      }
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const passwordStrength = formData?.password ? getPasswordStrength(formData?.password) : null;
  const passwordValidation = formData?.password ? validatePassword(formData?.password) : null;

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-shadow">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Create Your Account</h1>
        <p className="text-muted-foreground">Join thousands of users managing their finances with AI</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={handleInputChange}
          error={errors?.fullName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          description="We'll send a verification email to this address"
          required
        />

        <div className="space-y-2">
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a strong password"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>

          {formData?.password && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Password strength:</span>
                <span className={`text-xs font-medium ${passwordStrength?.color}`}>
                  {passwordStrength?.text}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${passwordStrength?.bgColor}`}
                  style={{ width: `${(passwordValidation?.score / 5) * 100}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries({
                  'At least 8 characters': passwordValidation?.requirements?.length,
                  'One uppercase letter': passwordValidation?.requirements?.uppercase,
                  'One lowercase letter': passwordValidation?.requirements?.lowercase,
                  'One number': passwordValidation?.requirements?.number,
                  'One special character': passwordValidation?.requirements?.special
                })?.map(([requirement, met]) => (
                  <div key={requirement} className="flex items-center space-x-1">
                    <Icon
                      name={met ? "Check" : "X"}
                      size={12}
                      className={met ? "text-success" : "text-muted-foreground"}
                    />
                    <span className={met ? "text-success" : "text-muted-foreground"}>
                      {requirement}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData?.confirmPassword}
            onChange={handleInputChange}
            error={errors?.confirmPassword}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>

        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          className="mt-6"
        >
          Create Account
        </Button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-smooth">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;