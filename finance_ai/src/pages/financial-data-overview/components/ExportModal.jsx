import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const ExportModal = ({ isOpen, onClose, onExport }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'csv',
    dateRange: '1year',
    categories: {
      assets: true,
      liabilities: true,
      transactions: true,
      investments: true,
      retirement: false,
      credit: false
    },
    includePersonalInfo: false,
    includeAccountNumbers: false
  });
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const formatOptions = [
    { value: 'csv', label: 'CSV (Comma Separated Values)' },
    { value: 'xlsx', label: 'Excel Spreadsheet (.xlsx)' },
    { value: 'pdf', label: 'PDF Report' },
    { value: 'json', label: 'JSON Data' }
  ];

  const dateRangeOptions = [
    { value: '1month', label: 'Last Month' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' },
    { value: 'all', label: 'All Time' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleCategoryChange = (category, checked) => {
    setExportConfig(prev => ({
      ...prev,
      categories: {
        ...prev?.categories,
        [category]: checked
      }
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport(exportConfig);
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const selectedCategoriesCount = Object.values(exportConfig?.categories)?.filter(Boolean)?.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-lg modal-shadow w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Export Financial Data</h2>
              <p className="text-sm text-muted-foreground">Choose what data to export and in which format</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Export Format */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">Export Format</label>
              <Select
                options={formatOptions}
                value={exportConfig?.format}
                onChange={(value) => setExportConfig(prev => ({ ...prev, format: value }))}
              />
            </div>

            {/* Date Range */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">Date Range</label>
              <Select
                options={dateRangeOptions}
                value={exportConfig?.dateRange}
                onChange={(value) => setExportConfig(prev => ({ ...prev, dateRange: value }))}
              />
            </div>

            {/* Categories to Include */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Data Categories ({selectedCategoriesCount} selected)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Checkbox
                  label="Assets & Accounts"
                  checked={exportConfig?.categories?.assets}
                  onChange={(e) => handleCategoryChange('assets', e?.target?.checked)}
                />
                <Checkbox
                  label="Liabilities & Debts"
                  checked={exportConfig?.categories?.liabilities}
                  onChange={(e) => handleCategoryChange('liabilities', e?.target?.checked)}
                />
                <Checkbox
                  label="Transactions"
                  checked={exportConfig?.categories?.transactions}
                  onChange={(e) => handleCategoryChange('transactions', e?.target?.checked)}
                />
                <Checkbox
                  label="Investments"
                  checked={exportConfig?.categories?.investments}
                  onChange={(e) => handleCategoryChange('investments', e?.target?.checked)}
                />
                <Checkbox
                  label="Retirement Accounts"
                  checked={exportConfig?.categories?.retirement}
                  onChange={(e) => handleCategoryChange('retirement', e?.target?.checked)}
                />
                <Checkbox
                  label="Credit Score Data"
                  checked={exportConfig?.categories?.credit}
                  onChange={(e) => handleCategoryChange('credit', e?.target?.checked)}
                />
              </div>
            </div>

            {/* Privacy Options */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">Privacy Options</label>
              <div className="space-y-3">
                <Checkbox
                  label="Include personal information (name, address, etc.)"
                  description="Uncheck to anonymize the export"
                  checked={exportConfig?.includePersonalInfo}
                  onChange={(e) => setExportConfig(prev => ({ ...prev, includePersonalInfo: e?.target?.checked }))}
                />
                <Checkbox
                  label="Include full account numbers"
                  description="Uncheck to mask account numbers (****1234)"
                  checked={exportConfig?.includeAccountNumbers}
                  onChange={(e) => setExportConfig(prev => ({ ...prev, includeAccountNumbers: e?.target?.checked }))}
                />
              </div>
            </div>

            {/* Export Preview */}
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="FileText" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Export Preview</span>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>Format: {formatOptions?.find(f => f?.value === exportConfig?.format)?.label}</div>
                <div>Date Range: {dateRangeOptions?.find(d => d?.value === exportConfig?.dateRange)?.label}</div>
                <div>Categories: {selectedCategoriesCount} selected</div>
                <div>Privacy: {exportConfig?.includePersonalInfo ? 'Personal info included' : 'Anonymized'}</div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Shield" size={20} className="text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Security Notice</h4>
                  <p className="text-sm text-muted-foreground">
                    Exported data contains sensitive financial information. Store the file securely and delete it when no longer needed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-border mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isExporting}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleExport}
              loading={isExporting}
              disabled={selectedCategoriesCount === 0}
              iconName="Download"
              iconPosition="left"
            >
              {isExporting ? 'Exporting...' : 'Export Data'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;