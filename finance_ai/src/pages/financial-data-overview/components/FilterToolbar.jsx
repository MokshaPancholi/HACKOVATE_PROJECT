import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterToolbar = ({ onFilterChange, onExport, totalAccounts, lastSync }) => {
  const [activeFilters, setActiveFilters] = useState({
    category: 'all',
    dateRange: '30days',
    account: 'all',
    status: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'assets', label: 'Assets' },
    { value: 'liabilities', label: 'Liabilities' },
    { value: 'transactions', label: 'Transactions' },
    { value: 'investments', label: 'Investments' },
    { value: 'retirement', label: 'Retirement' },
    { value: 'credit', label: 'Credit Score' }
  ];

  const dateRangeOptions = [
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 3 months' },
    { value: '1year', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const accountOptions = [
    { value: 'all', label: 'All Accounts' },
    { value: 'checking', label: 'Checking Accounts' },
    { value: 'savings', label: 'Savings Accounts' },
    { value: 'credit', label: 'Credit Cards' },
    { value: 'investment', label: 'Investment Accounts' },
    { value: 'retirement', label: 'Retirement Accounts' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'needs_attention', label: 'Needs Attention' },
    { value: 'syncing', label: 'Syncing' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    onFilterChange({ ...newFilters, search: searchQuery });
  };

  const handleSearchChange = (e) => {
    const query = e?.target?.value;
    setSearchQuery(query);
    onFilterChange({ ...activeFilters, search: query });
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      category: 'all',
      dateRange: '30days',
      account: 'all',
      status: 'all'
    };
    setActiveFilters(defaultFilters);
    setSearchQuery('');
    onFilterChange({ ...defaultFilters, search: '' });
  };

  const hasActiveFilters = Object.values(activeFilters)?.some(value => value !== 'all' && value !== '30days') || searchQuery;

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-foreground">Financial Data Overview</h2>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Database" size={16} />
            <span>{totalAccounts} accounts connected</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="RefreshCw" size={16} />
            <span>Last sync: {lastSync}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            iconName="Filter"
            iconPosition="left"
          >
            {showAdvanced ? 'Simple' : 'Advanced'} Filters
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {/* Basic Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search accounts, transactions..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
            />
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
          </div>
          
          <Select
            placeholder="Category"
            options={categoryOptions}
            value={activeFilters?.category}
            onChange={(value) => handleFilterChange('category', value)}
          />
          
          <Select
            placeholder="Date Range"
            options={dateRangeOptions}
            value={activeFilters?.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
          />
          
          <Select
            placeholder="Account Type"
            options={accountOptions}
            value={activeFilters?.account}
            onChange={(value) => handleFilterChange('account', value)}
          />
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
            <Select
              placeholder="Status"
              options={statusOptions}
              value={activeFilters?.status}
              onChange={(value) => handleFilterChange('status', value)}
            />
            
            <div className="flex items-center space-x-2">
              <Input
                type="date"
                label="From Date"
                className="flex-1"
              />
              <Input
                type="date"
                label="To Date"
                className="flex-1"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="Min Amount"
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="Max Amount"
                className="flex-1"
              />
            </div>
          </div>
        )}

        {/* Active Filters & Actions */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              <div className="flex items-center space-x-2">
                {Object.entries(activeFilters)?.map(([key, value]) => {
                  if (value === 'all' || (key === 'dateRange' && value === '30days')) return null;
                  return (
                    <div key={key} className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
                      <span>{value}</span>
                      <button
                        onClick={() => handleFilterChange(key, key === 'dateRange' ? '30days' : 'all')}
                        className="hover:bg-primary/20 rounded-full p-0.5"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </div>
                  );
                })}
                {searchQuery && (
                  <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
                    <span>"{searchQuery}"</span>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterToolbar;