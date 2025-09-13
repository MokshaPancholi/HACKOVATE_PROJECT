import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Bank-Level Security',
      description: '256-bit SSL encryption protects all your data'
    },
    {
      icon: 'Lock',
      title: 'Zero-Knowledge Architecture',
      description: 'Your financial data is encrypted and never stored in plain text'
    },
    {
      icon: 'Eye',
      title: 'Privacy First',
      description: 'You control exactly what data the AI can access'
    },
    {
      icon: 'CheckCircle',
      title: 'SOC 2 Compliant',
      description: 'Independently audited security and privacy controls'
    }
  ];

  const certifications = [
    {
      name: 'PCI DSS',
      description: 'Payment Card Industry Data Security Standard',
      icon: 'CreditCard'
    },
    {
      name: 'GDPR',
      description: 'General Data Protection Regulation Compliant',
      icon: 'Globe'
    },
    {
      name: 'CCPA',
      description: 'California Consumer Privacy Act Compliant',
      icon: 'Shield'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Security Features */}
      <div className="bg-card border border-border rounded-lg p-6 card-shadow">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-success/10 rounded-lg mb-3">
            <Icon name="ShieldCheck" size={24} className="text-success" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Your Security is Our Priority</h2>
          <p className="text-muted-foreground text-sm">
            Enterprise-grade security protecting millions in financial data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={feature?.icon} size={16} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground text-sm">{feature?.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Compliance Certifications */}
      <div className="bg-card border border-border rounded-lg p-6 card-shadow">
        <h3 className="font-medium text-foreground mb-4 text-center">Compliance & Certifications</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {certifications?.map((cert, index) => (
            <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="inline-flex items-center justify-center w-8 h-8 bg-accent/10 rounded-lg mb-2">
                <Icon name={cert?.icon} size={16} className="text-accent" />
              </div>
              <div className="font-medium text-foreground text-sm">{cert?.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{cert?.description}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Stats */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">500K+</div>
            <div className="text-xs text-muted-foreground">Trusted Users</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">$2.5B+</div>
            <div className="text-xs text-muted-foreground">Assets Protected</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">99.9%</div>
            <div className="text-xs text-muted-foreground">Uptime SLA</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;