import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataValidationPanel = ({ validationIssues, onResolveIssue, onDismissIssue }) => {
  const [expandedIssue, setExpandedIssue] = useState(null);

  if (!validationIssues || validationIssues?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-success/10">
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Data Validation Complete</h3>
            <p className="text-sm text-muted-foreground">All your financial data is properly organized and validated.</p>
          </div>
        </div>
      </div>
    );
  }

  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'high':
        return {
          icon: 'AlertTriangle',
          color: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20'
        };
      case 'medium':
        return {
          icon: 'AlertCircle',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20'
        };
      default:
        return {
          icon: 'Info',
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/20'
        };
    }
  };

  const criticalIssues = validationIssues?.filter(issue => issue?.severity === 'high');
  const otherIssues = validationIssues?.filter(issue => issue?.severity !== 'high');

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-warning/10">
            <Icon name="AlertTriangle" size={24} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Data Validation Issues</h3>
            <p className="text-sm text-muted-foreground">
              {criticalIssues?.length} critical issues, {otherIssues?.length} other issues found
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="RefreshCw"
          iconPosition="left"
        >
          Re-validate
        </Button>
      </div>
      <div className="space-y-4">
        {/* Critical Issues */}
        {criticalIssues?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-error mb-3">Critical Issues (Requires Immediate Attention)</h4>
            <div className="space-y-3">
              {criticalIssues?.map((issue) => {
                const config = getSeverityConfig(issue?.severity);
                const isExpanded = expandedIssue === issue?.id;
                
                return (
                  <div key={issue?.id} className={`border ${config?.borderColor} rounded-lg ${config?.bgColor}`}>
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <Icon name={config?.icon} size={20} className={config?.color} />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h5 className="font-medium text-foreground">{issue?.title}</h5>
                              <span className={`text-xs px-2 py-1 rounded-full ${config?.bgColor} ${config?.color} font-medium`}>
                                {issue?.category}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{issue?.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span>Account: {issue?.accountName}</span>
                              <span>Detected: {issue?.detectedDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedIssue(isExpanded ? null : issue?.id)}
                            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                          />
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="space-y-3">
                            <div>
                              <h6 className="text-sm font-medium text-foreground mb-2">Recommended Actions:</h6>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                {issue?.recommendations?.map((rec, index) => (
                                  <li key={index} className="flex items-start space-x-2">
                                    <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {issue?.affectedTransactions && (
                              <div>
                                <h6 className="text-sm font-medium text-foreground mb-2">Affected Transactions:</h6>
                                <div className="text-sm text-muted-foreground">
                                  {issue?.affectedTransactions} transactions may be impacted
                                </div>
                              </div>
                            )}

                            <div className="flex items-center space-x-2 pt-2">
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => onResolveIssue(issue?.id)}
                                iconName="CheckCircle"
                                iconPosition="left"
                              >
                                Resolve Issue
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onDismissIssue(issue?.id)}
                              >
                                Dismiss
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Other Issues */}
        {otherIssues?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Other Issues</h4>
            <div className="space-y-2">
              {otherIssues?.map((issue) => {
                const config = getSeverityConfig(issue?.severity);
                
                return (
                  <div key={issue?.id} className={`border ${config?.borderColor} rounded-lg p-3 ${config?.bgColor}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon name={config?.icon} size={16} className={config?.color} />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-foreground">{issue?.title}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${config?.bgColor} ${config?.color} font-medium`}>
                              {issue?.category}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{issue?.accountName}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => onResolveIssue(issue?.id)}
                        >
                          Fix
                        </Button>
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => onDismissIssue(issue?.id)}
                        >
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataValidationPanel;