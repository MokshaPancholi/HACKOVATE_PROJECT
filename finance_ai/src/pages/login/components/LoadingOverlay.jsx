import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingOverlay = ({ isVisible, message = 'Authenticating...' }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card border border-border rounded-xl p-8 card-shadow max-w-sm w-full mx-4">
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
            <div className="animate-spin">
              <Icon name="Loader2" size={32} className="text-primary" />
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {message}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4">
            Establishing secure connection...
          </p>
          
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-xs text-success font-medium">
              Secure Connection Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;