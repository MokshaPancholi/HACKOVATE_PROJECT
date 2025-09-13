import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      id: 1,
      icon: 'Shield',
      title: 'Bank-Level Security',
      description: '256-bit SSL encryption protects your data'
    },
    {
      id: 2,
      icon: 'Lock',
      title: 'Privacy Compliant',
      description: 'GDPR & CCPA compliant data handling'
    },
    {
      id: 3,
      icon: 'CheckCircle',
      title: 'Verified Platform',
      description: 'SOC 2 Type II certified security'
    }
  ];

  const securityFeatures = [
    'End-to-end encryption',
    'Multi-factor authentication',
    'Regular security audits',
    'Zero data sharing policy'
  ];

  return (
    <div className="space-y-8">
      {/* Trust Badges */}
      <div className="bg-card border border-border rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Your Security is Our Priority
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trustBadges?.map((badge) => (
            <div key={badge?.id} className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-lg mx-auto mb-3">
                <Icon name={badge?.icon} size={24} className="text-success" />
              </div>
              <h4 className="text-sm font-medium text-foreground mb-1">
                {badge?.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {badge?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Security Features */}
      <div className="bg-muted/50 border border-border rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="ShieldCheck" size={20} className="text-accent" />
          <h4 className="text-sm font-semibold text-foreground">Security Features</h4>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span className="text-xs text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      {/* SSL Certificate Indicator */}
      <div className="flex items-center justify-center space-x-2 text-center">
        <Icon name="Lock" size={16} className="text-success" />
        <span className="text-xs text-muted-foreground">
          Secured with 256-bit SSL encryption
        </span>
      </div>
    </div>
  );
};

export default TrustSignals;