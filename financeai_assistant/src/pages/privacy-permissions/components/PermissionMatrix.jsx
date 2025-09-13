import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PermissionMatrix = ({ permissions, onPermissionChange, onBulkChange }) => {
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev?.[categoryId]
    }));
  };

  const getPermissionIcon = (enabled) => {
    return enabled ? 'Shield' : 'ShieldX';
  };

  const getPermissionColor = (enabled) => {
    return enabled ? 'text-success' : 'text-error';
  };

  const getPermissionBgColor = (enabled) => {
    return enabled ? 'bg-success/10' : 'bg-error/10';
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Data Access Permissions</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Control what financial data the AI can access for insights and recommendations
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkChange('grant')}
              iconName="Shield"
              iconPosition="left"
            >
              Grant All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkChange('revoke')}
              iconName="ShieldX"
              iconPosition="left"
            >
              Revoke All
            </Button>
          </div>
        </div>
      </div>
      <div className="divide-y divide-border">
        {permissions?.map((category) => (
          <div key={category?.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getPermissionBgColor(category?.enabled)}`}>
                  <Icon 
                    name={category?.icon} 
                    size={20} 
                    className={getPermissionColor(category?.enabled)} 
                  />
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground">{category?.name}</h3>
                  <p className="text-sm text-muted-foreground">{category?.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${getPermissionBgColor(category?.enabled)}`}>
                  <Icon 
                    name={getPermissionIcon(category?.enabled)} 
                    size={14} 
                    className={getPermissionColor(category?.enabled)} 
                  />
                  <span className={`text-xs font-medium ${getPermissionColor(category?.enabled)}`}>
                    {category?.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleCategory(category?.id)}
                  iconName={expandedCategories?.[category?.id] ? "ChevronUp" : "ChevronDown"}
                  iconPosition="right"
                >
                  Details
                </Button>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={category?.enabled}
                    onChange={(e) => onPermissionChange(category?.id, e?.target?.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            {expandedCategories?.[category?.id] && (
              <div className="ml-14 space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">Data Types Included:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {category?.dataTypes?.map((type, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Icon name="Dot" size={12} />
                        <span>{type}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">AI Usage:</h4>
                  <p className="text-sm text-muted-foreground">{category?.aiUsage}</p>
                </div>

                {category?.requiredFor?.length > 0 && (
                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-warning mb-2 flex items-center space-x-2">
                      <Icon name="AlertTriangle" size={16} />
                      <span>Required for Features:</span>
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {category?.requiredFor?.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Icon name="Dot" size={12} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Last accessed: {category?.lastAccessed}</span>
                  <span>Access count: {category?.accessCount} times</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionMatrix;