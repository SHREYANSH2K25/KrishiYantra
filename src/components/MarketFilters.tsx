import { CalendarIcon, Filter, Grid3X3, List, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { useState } from 'react';

interface MarketFiltersProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  filters: {
    crop: string;
    state: string;
    district: string;
    market: string;
    dateRange: string;
    priceRange: number[];
    trendType: string[];
    sortBy: string;
  };
  onFiltersChange: (filters: any) => void;
}

export function MarketFilters({ viewMode, onViewModeChange, filters, onFiltersChange }: MarketFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const trendTypes = [
    { value: 'price-rise', label: '🔺 Price Rise', color: 'green' },
    { value: 'price-fall', label: '🔻 Price Fall', color: 'red' },
    { value: 'stable', label: '⚠️ Stable', color: 'yellow' },
    { value: 'high-demand', label: '📈 High Demand', color: 'blue' },
    { value: 'low-supply', label: '⚡ Low Supply', color: 'orange' }
  ];

  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleTrendType = (type: string) => {
    const current = filters.trendType || [];
    const updated = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type];
    updateFilter('trendType', updated);
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4 space-y-4">
      {/* Top Row - Search and View Toggle */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search crops, markets, states..." 
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <Select value={filters.crop} onValueChange={(value) => updateFilter('crop', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Crop Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Crops</SelectItem>
            <SelectItem value="rice">Rice</SelectItem>
            <SelectItem value="wheat">Wheat</SelectItem>
            <SelectItem value="tomato">Tomato</SelectItem>
            <SelectItem value="onion">Onion</SelectItem>
            <SelectItem value="potato">Potato</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.state} onValueChange={(value) => updateFilter('state', value)}>
          <SelectTrigger>
            <SelectValue placeholder="State" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            <SelectItem value="kerala">Kerala</SelectItem>
            <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
            <SelectItem value="karnataka">Karnataka</SelectItem>
            <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.district} onValueChange={(value) => updateFilter('district', value)}>
          <SelectTrigger>
            <SelectValue placeholder="District" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Districts</SelectItem>
            <SelectItem value="kochi">Kochi</SelectItem>
            <SelectItem value="thiruvananthapuram">Thiruvananthapuram</SelectItem>
            <SelectItem value="kozhikode">Kozhikode</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.market} onValueChange={(value) => updateFilter('market', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Market" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Markets</SelectItem>
            <SelectItem value="kochi-mandi">Kochi Mandi</SelectItem>
            <SelectItem value="ernakulam-market">Ernakulam Market</SelectItem>
            <SelectItem value="palayam-market">Palayam Market</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.dateRange || "Date Range"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-3 space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => updateFilter('dateRange', '1 week')}
              >
                Last 1 Week
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => updateFilter('dateRange', '1 month')}
              >
                Last 1 Month
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => updateFilter('dateRange', '3 months')}
              >
                Last 3 Months
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Price (Low to High)</SelectItem>
            <SelectItem value="price-desc">Price (High to Low)</SelectItem>
            <SelectItem value="change-desc">Highest Change</SelectItem>
            <SelectItem value="volume-desc">Volume Traded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Trend Type Filters */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Trend Indicators</label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {trendTypes.map((trend) => (
            <Badge
              key={trend.value}
              variant={filters.trendType?.includes(trend.value) ? "default" : "outline"}
              className="cursor-pointer hover:opacity-80"
              onClick={() => toggleTrendType(trend.value)}
            >
              {trend.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Price Range (₹/kg)</label>
              <div className="px-3">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => updateFilter('priceRange', value)}
                  max={1000}
                  min={0}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>₹{filters.priceRange?.[0] || 0}</span>
                  <span>₹{filters.priceRange?.[1] || 1000}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Quality Type</label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer">Organic</Badge>
                <Badge variant="outline" className="cursor-pointer">Export Quality</Badge>
                <Badge variant="outline" className="cursor-pointer">Grade A</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Crop Season</label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer">Kharif</Badge>
                <Badge variant="outline" className="cursor-pointer">Rabi</Badge>
                <Badge variant="outline" className="cursor-pointer">Zaid</Badge>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}