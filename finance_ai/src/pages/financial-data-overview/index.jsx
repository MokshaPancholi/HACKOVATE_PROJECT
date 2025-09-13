import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import PermissionStatusIndicator from '../../components/ui/PermissionStatusIndicator';
import CategoryCard from './components/CategoryCard';
import FilterToolbar from './components/FilterToolbar';
import DataValidationPanel from './components/DataValidationPanel';
import QuickActions from './components/QuickActions';
import ExportModal from './components/ExportModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const FinancialDataOverview = () => {
  const navigate = useNavigate();
  const [showExportModal, setShowExportModal] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [currentFilters, setCurrentFilters] = useState({});

  // Mock financial data
  const mockFinancialData = [
    {
      id: 'assets',
      type: 'assets',
      title: 'Assets & Accounts',
      description: 'Bank accounts, savings, and cash equivalents',
      totalAmount: 45750.00,
      accountCount: 4,
      lastUpdated: '2 hours ago',
      hasIssues: false,
      canAddAccount: true,
      accounts: [
        {
          id: 'checking-1',
          name: 'Chase Checking',
          type: 'Checking Account',
          balance: 12500.00,
          change: 2.5,
          lastSync: '2 hours ago',
          icon: 'Banknote'
        },
        {
          id: 'savings-1',
          name: 'High Yield Savings',
          type: 'Savings Account',
          balance: 25000.00,
          change: 1.8,
          lastSync: '2 hours ago',
          icon: 'PiggyBank'
        },
        {
          id: 'checking-2',
          name: 'Wells Fargo Checking',
          type: 'Checking Account',
          balance: 3250.00,
          change: -0.5,
          lastSync: '3 hours ago',
          icon: 'Banknote'
        },
        {
          id: 'money-market',
          name: 'Money Market Account',
          type: 'Money Market',
          balance: 5000.00,
          change: 0.8,
          lastSync: '1 day ago',
          icon: 'TrendingUp'
        }
      ]
    },
    {
      id: 'liabilities',
      type: 'liabilities',
      title: 'Liabilities & Debts',
      description: 'Credit cards, loans, and other debts',
      totalAmount: -18450.00,
      accountCount: 3,
      lastUpdated: '4 hours ago',
      hasIssues: true,
      canAddAccount: true,
      accounts: [
        {
          id: 'credit-1',
          name: 'Chase Sapphire Preferred',
          type: 'Credit Card',
          balance: -2450.00,
          change: null,
          lastSync: '4 hours ago',
          icon: 'CreditCard'
        },
        {
          id: 'mortgage',
          name: 'Home Mortgage',
          type: 'Mortgage',
          balance: -15000.00,
          change: null,
          lastSync: '1 day ago',
          icon: 'Home'
        },
        {
          id: 'auto-loan',
          name: 'Auto Loan',
          type: 'Auto Loan',
          balance: -1000.00,
          change: null,
          lastSync: '1 day ago',
          icon: 'Car'
        }
      ]
    },
    {
      id: 'investments',
      type: 'investments',
      title: 'Investment Accounts',
      description: 'Stocks, bonds, mutual funds, and ETFs',
      totalAmount: 125000.00,
      accountCount: 2,
      lastUpdated: '1 hour ago',
      hasIssues: false,
      canAddAccount: true,
      accounts: [
        {
          id: 'brokerage-1',
          name: 'Fidelity Brokerage',
          type: 'Brokerage Account',
          balance: 85000.00,
          change: 5.2,
          lastSync: '1 hour ago',
          icon: 'TrendingUp'
        },
        {
          id: 'roth-ira',
          name: 'Roth IRA',
          type: 'Retirement Account',
          balance: 40000.00,
          change: 3.8,
          lastSync: '1 hour ago',
          icon: 'PiggyBank'
        }
      ]
    },
    {
      id: 'retirement',
      type: 'retirement',
      title: 'Retirement & EPF',
      description: '401(k), EPF, and other retirement accounts',
      totalAmount: 78500.00,
      accountCount: 2,
      lastUpdated: '6 hours ago',
      hasIssues: false,
      canAddAccount: false,
      accounts: [
        {
          id: '401k',
          name: 'Company 401(k)',
          type: '401(k)',
          balance: 65000.00,
          change: 4.1,
          lastSync: '6 hours ago',
          icon: 'Building'
        },
        {
          id: 'epf',
          name: 'EPF Account',
          type: 'EPF',
          balance: 13500.00,
          change: 2.3,
          lastSync: '1 day ago',
          icon: 'Shield'
        }
      ]
    },
    {
      id: 'transactions',
      type: 'transactions',
      title: 'Recent Transactions',
      description: 'Transaction history and spending patterns',
      totalAmount: -3250.00,
      accountCount: 156,
      lastUpdated: '30 minutes ago',
      hasIssues: true,
      canAddAccount: false,
      accounts: [
        {
          id: 'recent-spending',
          name: 'Last 30 Days',
          type: 'Spending Summary',
          balance: -3250.00,
          change: -12.5,
          lastSync: '30 minutes ago',
          icon: 'ArrowRightLeft'
        }
      ]
    },
    {
      id: 'credit',
      type: 'credit',
      title: 'Credit Score',
      description: 'Credit score monitoring and history',
      totalAmount: 785,
      accountCount: 1,
      lastUpdated: '1 week ago',
      hasIssues: false,
      canAddAccount: false,
      accounts: [
        {
          id: 'credit-score',
          name: 'FICO Score',
          type: 'Credit Score',
          balance: 785,
          change: 15,
          lastSync: '1 week ago',
          icon: 'Shield'
        }
      ]
    }
  ];

  // Mock validation issues
  const mockValidationIssues = [
    {
      id: 'duplicate-transactions',
      title: 'Duplicate Transactions Detected',
      description: 'Found 5 potentially duplicate transactions that may need review',
      severity: 'medium',
      category: 'Transactions',
      accountName: 'Chase Checking',
      detectedDate: '2 days ago',
      affectedTransactions: 5,
      recommendations: [
        'Review flagged transactions for duplicates',
        'Merge or delete duplicate entries',
        'Update transaction categorization rules'
      ]
    },
    {
      id: 'missing-category',
      title: 'Uncategorized Transactions',
      description: 'Multiple transactions are missing proper categorization',
      severity: 'high',
      category: 'Categorization',
      accountName: 'Multiple Accounts',
      detectedDate: '1 day ago',
      affectedTransactions: 23,
      recommendations: [
        'Review and categorize pending transactions',
        'Set up automatic categorization rules',
        'Update merchant recognition settings'
      ]
    },
    {
      id: 'sync-error',
      title: 'Account Sync Issues',
      description: 'Some accounts have not synced in over 48 hours',
      severity: 'medium',
      category: 'Connectivity',
      accountName: 'Wells Fargo Checking',
      detectedDate: '3 hours ago',
      recommendations: [
        'Re-authenticate account connection',
        'Check for bank maintenance windows',
        'Contact support if issues persist'
      ]
    }
  ];

  useEffect(() => {
    setFilteredData(mockFinancialData);
  }, []);

  const handleFilterChange = (filters) => {
    setCurrentFilters(filters);
    // Apply filters to data
    let filtered = mockFinancialData;
    
    if (filters?.category && filters?.category !== 'all') {
      filtered = filtered?.filter(item => item?.type === filters?.category);
    }
    
    if (filters?.search) {
      filtered = filtered?.filter(item => 
        item?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        item?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }
    
    setFilteredData(filtered);
  };

  const handleExport = async (exportConfig) => {
    // Simulate export process
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Exporting data with config:', exportConfig);
        resolve();
      }, 2000);
    });
  };

  const handleViewDetails = (account) => {
    console.log('Viewing details for:', account);
    // Navigate to account details or show modal
  };

  const handleAddAccount = (categoryType) => {
    console.log('Adding account for category:', categoryType);
    // Navigate to add account flow
  };

  const handleCategorizeTransactions = () => {
    console.log('Opening transaction categorization');
    // Navigate to transaction categorization
  };

  const handleUpdateInformation = () => {
    console.log('Opening information update');
    // Navigate to information update
  };

  const handleSyncData = async () => {
    // Simulate data sync
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  };

  const handleResolveIssue = (issueId) => {
    console.log('Resolving issue:', issueId);
    // Handle issue resolution
  };

  const handleDismissIssue = (issueId) => {
    console.log('Dismissing issue:', issueId);
    // Handle issue dismissal
  };

  const totalNetWorth = mockFinancialData?.reduce((sum, category) => {
    if (category?.type === 'credit' || category?.type === 'transactions') return sum;
    return sum + category?.totalAmount;
  }, 0);

  const breadcrumbItems = [
    { label: 'Home', path: '/dashboard', isHome: true },
    { label: 'Financial Data', path: '/financial-data-overview', isActive: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <Breadcrumbs customItems={breadcrumbItems} className="mb-4" />
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Financial Data Overview</h1>
                <p className="text-muted-foreground">
                  Comprehensive view of your financial accounts and data across all connected platforms
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <PermissionStatusIndicator permissionLevel="partial" />
                <Button
                  variant="outline"
                  onClick={() => navigate('/ai-chat-interface')}
                  iconName="MessageSquare"
                  iconPosition="left"
                >
                  Ask AI Assistant
                </Button>
              </div>
            </div>

            {/* Net Worth Summary */}
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-medium text-muted-foreground mb-1">Total Net Worth</h2>
                  <div className="text-3xl font-bold text-foreground">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    })?.format(totalNetWorth)}
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Icon name="TrendingUp" size={16} className="text-success" />
                    <span className="text-sm text-success font-medium">+5.2% this month</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">
                    {mockFinancialData?.reduce((sum, cat) => sum + cat?.accountCount, 0)} accounts connected
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Last updated: 30 minutes ago
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Validation Issues */}
          <DataValidationPanel
            validationIssues={mockValidationIssues}
            onResolveIssue={handleResolveIssue}
            onDismissIssue={handleDismissIssue}
          />

          {/* Quick Actions */}
          <QuickActions
            onAddAccount={handleAddAccount}
            onCategorizeTransactions={handleCategorizeTransactions}
            onUpdateInformation={handleUpdateInformation}
            onSyncData={handleSyncData}
          />

          {/* Filter Toolbar */}
          <FilterToolbar
            onFilterChange={handleFilterChange}
            onExport={() => setShowExportModal(true)}
            totalAccounts={mockFinancialData?.reduce((sum, cat) => sum + cat?.accountCount, 0)}
            lastSync="30 minutes ago"
          />

          {/* Financial Data Categories */}
          <div className="space-y-6">
            {filteredData?.length > 0 ? (
              filteredData?.map((category) => (
                <CategoryCard
                  key={category?.id}
                  category={category}
                  onViewDetails={handleViewDetails}
                  onAddAccount={handleAddAccount}
                />
              ))
            ) : (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Data Found</h3>
                <p className="text-muted-foreground mb-4">
                  No financial data matches your current filters. Try adjusting your search criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => handleFilterChange({})}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Additional Actions */}
          <div className="mt-12 bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Need Help Managing Your Data?</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI assistant can help you organize, analyze, and understand your financial information.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/privacy-permissions')}
                  iconName="Shield"
                  iconPosition="left"
                >
                  Privacy Settings
                </Button>
                <Button
                  variant="default"
                  onClick={() => navigate('/ai-chat-interface')}
                  iconName="MessageSquare"
                  iconPosition="left"
                >
                  Chat with AI
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
      />
    </div>
  );
};

export default FinancialDataOverview;