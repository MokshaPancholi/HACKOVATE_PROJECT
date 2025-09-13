import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrivacyPresets = ({ currentPreset, onPresetChange }) => {
  const presets = [
    {
      id: 'restrictive',
      name: 'Restrictive',
      description: 'Minimal data access for basic AI functionality',
      icon: 'ShieldX',
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20',
      permissions: {
        accounts: false,
        transactions: false,
        investments: false,
        credit: false,
        retirement: false,
        budgets: true,
        goals: true
      },
      features: [
        'Basic budgeting assistance',
        'Goal tracking',
        'General financial tips'
      ]
    },
    {
      id: 'balanced',
      name: 'Balanced',
      description: 'Moderate access for personalized insights',
      icon: 'Shield',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      permissions: {
        accounts: true,
        transactions: true,
        investments: false,
        credit: false,
        retirement: true,
        budgets: true,
        goals: true
      },
      features: [
        'Spending pattern analysis',
        'Budget optimization',
        'Retirement planning',
        'Savings recommendations'
      ]
    },
    {
      id: 'comprehensive',
      name: 'Comprehensive',
      description: 'Full access for complete financial analysis',
      icon: 'ShieldCheck',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      permissions: {
        accounts: true,
        transactions: true,
        investments: true,
        credit: true,
        retirement: true,
        budgets: true,
        goals: true
      },
      features: [
        'Complete financial analysis',
        'Investment recommendations',
        'Credit optimization',
        'Tax planning assistance',
        'Debt management strategies'
      ]
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">Privacy Presets</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Quick setup options for different privacy preferences
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {presets?.map((preset) => (
          <div
            key={preset?.id}
            className={`relative border-2 rounded-lg p-4 cursor-pointer transition-smooth hover:shadow-md ${
              currentPreset === preset?.id
                ? `${preset?.borderColor} ${preset?.bgColor}`
                : 'border-border hover:border-primary/20'
            }`}
            onClick={() => onPresetChange(preset?.id, preset?.permissions)}
          >
            {currentPreset === preset?.id && (
              <div className="absolute -top-2 -right-2">
                <div className={`p-1 rounded-full ${preset?.bgColor} ${preset?.borderColor} border-2 bg-card`}>
                  <Icon name="Check" size={12} className={preset?.color} />
                </div>
              </div>
            )}

            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-lg ${preset?.bgColor}`}>
                <Icon name={preset?.icon} size={20} className={preset?.color} />
              </div>
              <div>
                <h3 className="text-base font-medium text-foreground">{preset?.name}</h3>
                <p className="text-sm text-muted-foreground">{preset?.description}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Enabled Features:</h4>
                <ul className="space-y-1">
                  {preset?.features?.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Check" size={12} className="text-success" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Data Categories:</span>
                  <span>
                    {Object.values(preset?.permissions)?.filter(Boolean)?.length} of {Object.keys(preset?.permissions)?.length}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {Object.entries(preset?.permissions)?.map(([key, enabled]) => (
                    <span
                      key={key}
                      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        enabled
                          ? 'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                      }`}
                    >
                      <Icon 
                        name={enabled ? 'Check' : 'X'} 
                        size={10} 
                        className="mr-1" 
                      />
                      {key?.charAt(0)?.toUpperCase() + key?.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Button
                variant={currentPreset === preset?.id ? 'default' : 'outline'}
                size="sm"
                fullWidth
                onClick={(e) => {
                  e?.stopPropagation();
                  onPresetChange(preset?.id, preset?.permissions);
                }}
              >
                {currentPreset === preset?.id ? 'Current Selection' : 'Apply Preset'}
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground">Custom Configuration</h4>
            <p className="text-sm text-muted-foreground mt-1">
              You can always customize individual permissions after applying a preset. 
              Changes will automatically switch your selection to "Custom" mode.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPresets;