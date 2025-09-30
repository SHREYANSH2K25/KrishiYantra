import { useState } from 'react';
import { ArrowLeft, Bell, User, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MarketFilters } from './MarketFilters';
import { MarketDashboard } from './MarketDashboard';
import { MarketInsights } from './MarketInsights';

interface MarketTrendsProps {
  onBack: () => void;
}

export function MarketTrends({ onBack }: MarketTrendsProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    crop: '',
    state: '',
    district: '',
    market: '',
    dateRange: '1 week',
    priceRange: [0, 1000],
    trendType: [],
    sortBy: 'price-desc'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Back button and title */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-krishi-dark">Market Trends & Insights</h1>
                <p className="text-sm text-krishi-muted">Stay ahead with real-time crop price updates and trends</p>
              </div>
            </div>

            {/* Right side - Search and actions */}
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search crops, markets..." 
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <MarketFilters 
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <MarketDashboard viewMode={viewMode} />
        <MarketInsights />
      </div>

      {/* Footer note */}
      <div className="bg-white border-t border-gray-200 p-4 text-center">
        <p className="text-sm text-gray-600">
          Data updated every 30 minutes • Last update: Today at 2:30 PM IST
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <Button variant="link" size="sm">Terms of Use</Button>
          <Button variant="link" size="sm">Data Sources</Button>
          <Button variant="link" size="sm">API Access</Button>
        </div>
      </div>
    </div>
  );
}