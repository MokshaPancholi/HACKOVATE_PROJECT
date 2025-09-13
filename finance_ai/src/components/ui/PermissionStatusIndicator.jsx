import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const PermissionStatusIndicator = ({ 
  permissionLevel = 'partial', 
  showDetails = false,
  className = '' 
}) => {
  const getPermissionConfig = () => {
    switch (permissionLevel) {
      case 'full':
        return {
          icon: 'Shield',
          color: 'text-success',
          bgColor: 'bg-success/10',
          status: 'Full Access',
          description: 'AI has access to all your financial data',
          actionText: 'Manage permissions'
        };
      case 'limited':
        return {
          icon: 'ShieldAlert',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          status: 'Limited Access',
          description: 'AI has restricted access to your data',
          actionText: 'Update permissions'
        };
      case 'none':
        return {
          icon: 'ShieldX',
          color: 'text-error',
          bgColor: 'bg-error/10',
          status: 'No Access',
          description: 'AI cannot access your financial data',
          actionText: 'Enable permissions'
        };
      default: // partial
        return {
          icon: 'ShieldCheck',
          color: 'text-accent',
          bgColor: 'bg-accent/10',
          status: 'Partial Access',
          description: 'AI has access to selected financial data',
          actionText: 'Review permissions'
        };
    }
  };

  const config = getPermissionConfig();

  if (!showDetails) {
    return (
      <Link
        to="/privacy-permissions"
        className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full ${config?.bgColor} hover:opacity-80 transition-smooth ${className}`}
        title={config?.description}
      >
        <Icon name={config?.icon} size={14} className={config?.color} />
        <span className={`text-xs font-medium ${config?.color}`}>
          {config?.status}
        </span>
      </Link>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${config?.bgColor}`}>
            <Icon name={config?.icon} size={20} className={config?.color} />
          </div>
          <div>
            <h3 className={`text-sm font-medium ${config?.color}`}>
              {config?.status}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {config?.description}
            </p>
          </div>
        </div>
        <Link
          to="/privacy-permissions"
          className="text-xs text-primary hover:text-primary/80 font-medium transition-smooth"
        >
          {config?.actionText}
        </Link>
      </div>
    </div>
  );
};

export default PermissionStatusIndicator;