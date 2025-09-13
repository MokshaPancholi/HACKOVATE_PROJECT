import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import PermissionStatusIndicator from '../../components/ui/PermissionStatusIndicator';
import PermissionMatrix from './components/PermissionMatrix';
import PermissionHistory from './components/PermissionHistory';
import PrivacyPresets from './components/PrivacyPresets';
import DataUsageStats from './components/DataUsageStats';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PrivacyPermissions = () => {
  const [activeTab, setActiveTab] = useState('permissions');
  const [currentPreset, setCurrentPreset] = useState('balanced');
  const [permissions, setPermissions] = useState([
    {
      id: 'accounts',
      name: 'Bank Accounts',
      description: 'Account balances, account types, and basic account information',
      icon: 'CreditCard',
      enabled: true,
      dataTypes: [
        'Account balances and statements',
        'Account types (checking, savings, credit)',
        'Bank names and account numbers (masked)',
        'Account opening dates and status'
      ],
      aiUsage: `AI uses this data to provide account balance summaries, track spending across accounts, 
        identify unusual account activity, and suggest optimal account usage strategies.`,
      requiredFor: [
        'Account balance summaries',
        'Multi-account spending analysis',
        'Cash flow management',
        'Account optimization recommendations'
      ],
      lastAccessed: '2 hours ago',
      accessCount: 47
    },
    {
      id: 'transactions',
      name: 'Transaction History',
      description: 'Purchase history, payment details, and transaction patterns',
      icon: 'ArrowRightLeft',
      enabled: true,
      dataTypes: [
        'Transaction amounts and dates',
        'Merchant names and categories',
        'Payment methods used',
        'Transaction descriptions and notes'
      ],
      aiUsage: `AI analyzes transaction patterns to categorize spending, identify trends, detect unusual purchases, 
        and provide personalized budgeting recommendations based on your spending habits.`,
      requiredFor: [
        'Spending pattern analysis',
        'Budget creation and tracking',
        'Unusual spending alerts',
        'Merchant spending insights'
      ],
      lastAccessed: '1 hour ago',
      accessCount: 89
    },
    {
      id: 'investments',
      name: 'Investment Portfolio',
      description: 'Stock holdings, mutual funds, and investment performance data',
      icon: 'TrendingUp',
      enabled: false,
      dataTypes: [
        'Portfolio holdings and allocations',
        'Investment performance metrics',
        'Dividend and interest income',
        'Cost basis and unrealized gains/losses'
      ],
      aiUsage: `AI provides portfolio analysis, asset allocation recommendations, performance tracking, 
        and investment strategy suggestions based on your risk tolerance and financial goals.`,
      requiredFor: [
        'Portfolio performance analysis',
        'Asset allocation recommendations',
        'Investment strategy advice',
        'Risk assessment and rebalancing'
      ],
      lastAccessed: 'Never',
      accessCount: 0
    },
    {
      id: 'credit',
      name: 'Credit Information',
      description: 'Credit scores, credit reports, and credit utilization data',
      icon: 'Shield',
      enabled: false,
      dataTypes: [
        'Credit scores from major bureaus',
        'Credit utilization ratios',
        'Payment history and late payments',
        'Credit inquiries and new accounts'
      ],
      aiUsage: `AI monitors credit health, suggests credit improvement strategies, alerts you to score changes, 
        and provides personalized advice for optimizing credit utilization and payment timing.`,
      requiredFor: [
        'Credit score monitoring',
        'Credit improvement recommendations',
        'Credit utilization optimization',
        'Credit report analysis'
      ],
      lastAccessed: 'Never',
      accessCount: 0
    },
    {
      id: 'retirement',
      name: 'Retirement Accounts',
      description: 'EPF, 401(k), IRA, and other retirement savings data',
      icon: 'PiggyBank',
      enabled: true,
      dataTypes: [
        'EPF account balance and contributions',
        '401(k) and IRA account values',
        'Employer matching contributions',
        'Vesting schedules and withdrawal rules'
      ],
      aiUsage: `AI tracks retirement savings progress, calculates projected retirement income, suggests contribution 
        optimizations, and provides retirement planning advice based on your age and goals.`,
      requiredFor: [
        'Retirement savings tracking',
        'Contribution optimization',
        'Retirement income projections',
        'Early retirement planning'
      ],
      lastAccessed: '3 days ago',
      accessCount: 23
    },
    {
      id: 'budgets',
      name: 'Budgets & Goals',
      description: 'Budget categories, spending limits, and financial goals',
      icon: 'Target',
      enabled: true,
      dataTypes: [
        'Budget categories and limits',
        'Spending vs budget comparisons',
        'Financial goals and progress',
        'Savings targets and timelines'
      ],
      aiUsage: `AI helps create realistic budgets, tracks progress against goals, suggests budget adjustments, 
        and provides motivation and tips to stay on track with your financial objectives.`,
      requiredFor: [
        'Budget creation and management',
        'Goal progress tracking',
        'Spending limit alerts',
        'Financial goal recommendations'
      ],
      lastAccessed: '30 minutes ago',
      accessCount: 156
    }
  ]);

  const [permissionHistory, setPermissionHistory] = useState([
    {
      id: 1,
      category: 'Transaction History',
      action: 'granted',
      description: 'Enabled AI access to transaction data for spending analysis',
      reason: 'User requested detailed spending insights',
      timestamp: '2025-01-13T04:05:05.349Z',
      ipAddress: '192.168.1.100'
    },
    {
      id: 2,
      category: 'Investment Portfolio',
      action: 'revoked',
      description: 'Disabled AI access to investment data',
      reason: 'Privacy concerns about investment holdings',
      timestamp: '2025-01-12T10:30:15.123Z',
      ipAddress: '192.168.1.100'
    },
    {
      id: 3,
      category: 'Bank Accounts',
      action: 'modified',
      description: 'Updated account access permissions',
      reason: 'Limited access to balance information only',
      timestamp: '2025-01-11T16:45:30.456Z',
      ipAddress: '192.168.1.100'
    },
    {
      id: 4,
      category: 'Credit Information',
      action: 'revoked',
      description: 'Removed AI access to credit score data',
      reason: 'Switched to manual credit monitoring',
      timestamp: '2025-01-10T09:15:45.789Z',
      ipAddress: '192.168.1.100'
    },
    {
      id: 5,
      category: 'Budgets & Goals',
      action: 'granted',
      description: 'Enabled comprehensive budget management access',
      reason: 'Requested AI assistance with budget optimization',
      timestamp: '2025-01-09T14:20:10.234Z',
      ipAddress: '192.168.1.100'
    }
  ]);

  const [usageData, setUsageData] = useState({
    totalAccesses: 315,
    categoriesAccessed: 4,
    totalCategories: 6,
    aiSessions: 28,
    avgResponseTime: 245,
    categories: [
      {
        id: 'budgets',
        name: 'Budgets & Goals',
        icon: 'Target',
        enabled: true,
        accessCount: 156,
        lastAccessed: '2025-01-13T05:35:05.349Z',
        color: '#10B981'
      },
      {
        id: 'transactions',
        name: 'Transaction History',
        icon: 'ArrowRightLeft',
        enabled: true,
        accessCount: 89,
        lastAccessed: '2025-01-13T05:05:05.349Z',
        color: '#F59E0B'
      },
      {
        id: 'accounts',
        name: 'Bank Accounts',
        icon: 'CreditCard',
        enabled: true,
        accessCount: 47,
        lastAccessed: '2025-01-13T04:05:05.349Z',
        color: '#3B82F6'
      },
      {
        id: 'retirement',
        name: 'Retirement Accounts',
        icon: 'PiggyBank',
        enabled: true,
        accessCount: 23,
        lastAccessed: '2025-01-10T06:05:05.349Z',
        color: '#8B5CF6'
      },
      {
        id: 'investments',
        name: 'Investment Portfolio',
        icon: 'TrendingUp',
        enabled: false,
        accessCount: 0,
        lastAccessed: 'Never',
        color: '#EF4444'
      },
      {
        id: 'credit',
        name: 'Credit Information',
        icon: 'Shield',
        enabled: false,
        accessCount: 0,
        lastAccessed: 'Never',
        color: '#F97316'
      }
    ]
  });

  const handlePermissionChange = (categoryId, enabled) => {
    setPermissions(prev => prev?.map(permission => 
      permission?.id === categoryId 
        ? { ...permission, enabled }
        : permission
    ));

    // Add to history
    const category = permissions?.find(p => p?.id === categoryId);
    const newHistoryEntry = {
      id: permissionHistory?.length + 1,
      category: category?.name,
      action: enabled ? 'granted' : 'revoked',
      description: `${enabled ? 'Enabled' : 'Disabled'} AI access to ${category?.name?.toLowerCase()}`,
      reason: enabled ? 'User granted access for AI insights' : 'User revoked access for privacy',
      timestamp: new Date()?.toISOString(),
      ipAddress: '192.168.1.100'
    };

    setPermissionHistory(prev => [newHistoryEntry, ...prev]);
    setCurrentPreset('custom');
  };

  const handleBulkChange = (action) => {
    const enabled = action === 'grant';
    setPermissions(prev => prev?.map(permission => ({ ...permission, enabled })));

    const newHistoryEntry = {
      id: permissionHistory?.length + 1,
      category: 'All Categories',
      action: enabled ? 'granted' : 'revoked',
      description: `${enabled ? 'Granted' : 'Revoked'} AI access to all data categories`,
      reason: `User performed bulk ${action} operation`,
      timestamp: new Date()?.toISOString(),
      ipAddress: '192.168.1.100'
    };

    setPermissionHistory(prev => [newHistoryEntry, ...prev]);
    setCurrentPreset(enabled ? 'comprehensive' : 'restrictive');
  };

  const handlePresetChange = (presetId, presetPermissions) => {
    setCurrentPreset(presetId);
    setPermissions(prev => prev?.map(permission => ({
      ...permission,
      enabled: presetPermissions?.[permission?.id] || false
    })));

    const newHistoryEntry = {
      id: permissionHistory?.length + 1,
      category: 'Privacy Preset',
      action: 'modified',
      description: `Applied ${presetId} privacy preset`,
      reason: `User selected ${presetId} privacy configuration`,
      timestamp: new Date()?.toISOString(),
      ipAddress: '192.168.1.100'
    };

    setPermissionHistory(prev => [newHistoryEntry, ...prev]);
  };

  const getCurrentPermissionLevel = () => {
    const enabledCount = permissions?.filter(p => p?.enabled)?.length;
    const totalCount = permissions?.length;
    
    if (enabledCount === 0) return 'none';
    if (enabledCount === totalCount) return 'full';
    if (enabledCount >= totalCount * 0.7) return 'partial';
    return 'limited';
  };

  const tabs = [
    { id: 'permissions', label: 'Permissions', icon: 'Shield' },
    { id: 'presets', label: 'Privacy Presets', icon: 'Settings' },
    { id: 'usage', label: 'Usage Analytics', icon: 'BarChart3' },
    { id: 'history', label: 'History', icon: 'History' }
  ];

  useEffect(() => {
    // Update usage data when permissions change
    setUsageData(prev => ({
      ...prev,
      categories: prev?.categories?.map(category => {
        const permission = permissions?.find(p => p?.id === category?.id);
        return permission ? { ...category, enabled: permission?.enabled } : category;
      })
    }));
  }, [permissions]);

  return (
    <>
      <Helmet>
        <title>Privacy Permissions - FinanceAI Assistant</title>
        <meta name="description" content="Manage your data privacy and AI access permissions with granular control over financial information sharing." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header Section */}
            <div className="mb-8">
              <Breadcrumbs />
              
              <div className="flex items-center justify-between mt-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Privacy & Permissions</h1>
                  <p className="text-muted-foreground mt-2">
                    Control what financial data the AI can access and how it's used for insights
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <PermissionStatusIndicator 
                    permissionLevel={getCurrentPermissionLevel()}
                    showDetails={false}
                  />
                  <Button
                    variant="outline"
                    iconName="Download"
                    iconPosition="left"
                  >
                    Export Settings
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <Icon name="Shield" size={20} className="text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Permissions</p>
                    <p className="text-2xl font-bold text-foreground">
                      {permissions?.filter(p => p?.enabled)?.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name="Activity" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Accesses</p>
                    <p className="text-2xl font-bold text-foreground">{usageData?.totalAccesses}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-warning/10 rounded-lg">
                    <Icon name="MessageSquare" size={20} className="text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">AI Sessions</p>
                    <p className="text-2xl font-bold text-foreground">{usageData?.aiSessions}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Icon name="History" size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Recent Changes</p>
                    <p className="text-2xl font-bold text-foreground">{permissionHistory?.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-card border border-border rounded-lg mb-8">
              <div className="border-b border-border">
                <nav className="flex space-x-8 px-6">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'permissions' && (
                  <PermissionMatrix
                    permissions={permissions}
                    onPermissionChange={handlePermissionChange}
                    onBulkChange={handleBulkChange}
                  />
                )}

                {activeTab === 'presets' && (
                  <PrivacyPresets
                    currentPreset={currentPreset}
                    onPresetChange={handlePresetChange}
                  />
                )}

                {activeTab === 'usage' && (
                  <DataUsageStats usageData={usageData} />
                )}

                {activeTab === 'history' && (
                  <PermissionHistory history={permissionHistory} />
                )}
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name="Lock" size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-medium text-foreground mb-2">
                    Your Data Security
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    All financial data is encrypted and processed securely. Permission changes take effect immediately 
                    and are logged for your security. You can revoke access at any time without affecting your stored data.
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Shield" size={12} className="text-success" />
                      <span>256-bit encryption</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Lock" size={12} className="text-success" />
                      <span>Zero-knowledge architecture</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={12} className="text-success" />
                      <span>Full audit trail</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PrivacyPermissions;