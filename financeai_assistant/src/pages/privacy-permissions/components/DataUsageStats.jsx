import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DataUsageStats = ({ usageData }) => {
  const [viewMode, setViewMode] = useState('chart');
  const [timeRange, setTimeRange] = useState('7d');

  const chartData = usageData?.categories?.map(category => ({
    name: category?.name,
    accesses: category?.accessCount,
    lastAccess: category?.lastAccessed
  }));

  const pieData = usageData?.categories?.map(category => ({
    name: category?.name,
    value: category?.accessCount,
    color: category?.color
  }));

  const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6', '#F97316', '#06B6D4'];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case '24h': return 'Last 24 Hours';
      case '7d': return 'Last 7 Days';
      case '30d': return 'Last 30 Days';
      case '90d': return 'Last 90 Days';
      default: return 'Last 7 Days';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Data Usage Analytics</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Monitor how frequently AI accesses your financial data
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'chart' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('chart')}
              iconName="BarChart3"
              iconPosition="left"
            >
              Chart
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              iconName="List"
              iconPosition="left"
            >
              List
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={timeRange === '24h' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('24h')}
          >
            24h
          </Button>
          <Button
            variant={timeRange === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('7d')}
          >
            7d
          </Button>
          <Button
            variant={timeRange === '30d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('30d')}
          >
            30d
          </Button>
          <Button
            variant={timeRange === '90d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('90d')}
          >
            90d
          </Button>
        </div>
      </div>
      <div className="p-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="Activity" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Total Accesses</span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-2">{usageData?.totalAccesses}</p>
            <p className="text-xs text-muted-foreground">in {getTimeRangeLabel()?.toLowerCase()}</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="Database" size={16} className="text-success" />
              <span className="text-sm font-medium text-foreground">Categories Used</span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-2">{usageData?.categoriesAccessed}</p>
            <p className="text-xs text-muted-foreground">of {usageData?.totalCategories} available</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="MessageSquare" size={16} className="text-warning" />
              <span className="text-sm font-medium text-foreground">AI Sessions</span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-2">{usageData?.aiSessions}</p>
            <p className="text-xs text-muted-foreground">conversations</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-accent" />
              <span className="text-sm font-medium text-foreground">Avg Response</span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-2">{usageData?.avgResponseTime}ms</p>
            <p className="text-xs text-muted-foreground">processing time</p>
          </div>
        </div>

        {viewMode === 'chart' ? (
          <div className="space-y-6">
            {/* Bar Chart */}
            <div>
              <h3 className="text-base font-medium text-foreground mb-4">Access Frequency by Category</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#6B7280"
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis stroke="#6B7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Bar dataKey="accesses" fill="#1E40AF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
            <div>
              <h3 className="text-base font-medium text-foreground mb-4">Usage Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                    >
                      {pieData?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-base font-medium text-foreground">Detailed Usage Breakdown</h3>
            <div className="divide-y divide-border">
              {usageData?.categories?.map((category) => (
                <div key={category?.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${category?.enabled ? 'bg-success/10' : 'bg-error/10'}`}>
                        <Icon 
                          name={category?.icon} 
                          size={16} 
                          className={category?.enabled ? 'text-success' : 'text-error'} 
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground">{category?.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {category?.enabled ? 'Access enabled' : 'Access disabled'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{category?.accessCount} accesses</p>
                      <p className="text-xs text-muted-foreground">
                        Last: {formatDate(category?.lastAccessed)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="ml-11">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Usage frequency</span>
                      <span>{((category?.accessCount / usageData?.totalAccesses) * 100)?.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(category?.accessCount / usageData?.totalAccesses) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataUsageStats;