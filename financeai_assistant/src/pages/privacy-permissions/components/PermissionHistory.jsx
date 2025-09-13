import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PermissionHistory = ({ history }) => {
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');

  const getActionIcon = (action) => {
    switch (action) {
      case 'granted':
        return 'ShieldCheck';
      case 'revoked':
        return 'ShieldX';
      case 'modified':
        return 'Shield';
      default:
        return 'Activity';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'granted':
        return 'text-success';
      case 'revoked':
        return 'text-error';
      case 'modified':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getActionBgColor = (action) => {
    switch (action) {
      case 'granted':
        return 'bg-success/10';
      case 'revoked':
        return 'bg-error/10';
      case 'modified':
        return 'bg-warning/10';
      default:
        return 'bg-muted/50';
    }
  };

  const filteredHistory = history?.filter(item => {
    if (filter === 'all') return true;
    return item?.action === filter;
  });

  const sortedHistory = [...filteredHistory]?.sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes} minutes ago`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(diffInHours / 24);
      return `${days} days ago`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Permission History</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Track all changes to your data access permissions
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={sortOrder === 'desc' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortOrder('desc')}
              iconName="ArrowDown"
              iconPosition="left"
            >
              Newest
            </Button>
            <Button
              variant={sortOrder === 'asc' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortOrder('asc')}
              iconName="ArrowUp"
              iconPosition="left"
            >
              Oldest
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'granted' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('granted')}
          >
            Granted
          </Button>
          <Button
            variant={filter === 'revoked' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('revoked')}
          >
            Revoked
          </Button>
          <Button
            variant={filter === 'modified' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('modified')}
          >
            Modified
          </Button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {sortedHistory?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="History" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-base font-medium text-foreground mb-2">No History Found</h3>
            <p className="text-sm text-muted-foreground">
              No permission changes match your current filter
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {sortedHistory?.map((item) => (
              <div key={item?.id} className="p-4 hover:bg-muted/50 transition-smooth">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getActionBgColor(item?.action)} mt-1`}>
                    <Icon 
                      name={getActionIcon(item?.action)} 
                      size={16} 
                      className={getActionColor(item?.action)} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-foreground">
                        {item?.category}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(item?.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item?.description}
                    </p>
                    {item?.reason && (
                      <div className="mt-2 p-2 bg-muted/50 rounded text-xs text-muted-foreground">
                        <span className="font-medium">Reason: </span>
                        {item?.reason}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getActionBgColor(item?.action)} ${getActionColor(item?.action)}`}>
                        <Icon name={getActionIcon(item?.action)} size={12} />
                        <span className="capitalize">{item?.action}</span>
                      </span>
                      <span className="text-xs text-muted-foreground">
                        IP: {item?.ipAddress}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionHistory;