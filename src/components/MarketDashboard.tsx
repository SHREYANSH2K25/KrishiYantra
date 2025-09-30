import { ArrowUp, ArrowDown, TrendingUp, BarChart3, AlertTriangle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const priceData = [
  { date: 'Jan 1', rice: 45, wheat: 32, tomato: 25, onion: 18 },
  { date: 'Jan 7', rice: 47, wheat: 34, tomato: 28, onion: 22 },
  { date: 'Jan 14', rice: 46, wheat: 35, tomato: 32, onion: 20 },
  { date: 'Jan 21', rice: 49, wheat: 33, tomato: 29, onion: 25 },
  { date: 'Jan 28', rice: 52, wheat: 36, tomato: 35, onion: 28 },
  { date: 'Feb 4', rice: 50, wheat: 38, tomato: 38, onion: 30 },
  { date: 'Feb 11', rice: 48, wheat: 37, tomato: 42, onion: 35 }
];

const topMovers = [
  { crop: 'Tomato', currentPrice: 42, change: 18.5, trend: 'up', volume: '2,345 tons' },
  { crop: 'Onion', currentPrice: 35, change: 16.7, trend: 'up', volume: '1,890 tons' },
  { crop: 'Rice', currentPrice: 48, change: -4.2, trend: 'down', volume: '5,670 tons' },
  { crop: 'Wheat', currentPrice: 37, change: 8.8, trend: 'up', volume: '3,420 tons' },
  { crop: 'Potato', currentPrice: 28, change: -12.5, trend: 'down', volume: '4,560 tons' },
  { crop: 'Garlic', currentPrice: 185, change: 45.2, trend: 'up', volume: '890 tons' }
];

const marketShare = [
  { name: 'Vegetables', value: 45, color: '#22c55e' },
  { name: 'Grains', value: 30, color: '#3b82f6' },
  { name: 'Fruits', value: 15, color: '#f59e0b' },
  { name: 'Spices', value: 10, color: '#ef4444' }
];

const dailyPrices = [
  { crop: 'Rice (Basmati)', price: 48, change: -2.1, volume: '5,670 tons', market: 'Kochi Mandi' },
  { crop: 'Wheat', price: 37, change: 8.8, volume: '3,420 tons', market: 'Ernakulam Market' },
  { crop: 'Tomato', price: 42, change: 18.5, volume: '2,345 tons', market: 'Palayam Market' },
  { crop: 'Onion', price: 35, change: 16.7, volume: '1,890 tons', market: 'Kochi Mandi' },
  { crop: 'Potato', price: 28, change: -12.5, volume: '4,560 tons', market: 'Mattancherry' },
  { crop: 'Garlic', price: 185, change: 45.2, volume: '890 tons', market: 'Ernakulam Market' }
];

interface MarketDashboardProps {
  viewMode: 'grid' | 'list';
}

export function MarketDashboard({ viewMode }: MarketDashboardProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Top Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Price Today</p>
                <p className="text-2xl font-semibold text-krishi-dark">₹47.2/kg</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUp className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-600">+5.8% from yesterday</span>
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Volume Traded</p>
                <p className="text-2xl font-semibold text-krishi-dark">18,765 tons</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowDown className="w-3 h-3 text-red-500" />
                  <span className="text-xs text-red-600">-2.1% from last week</span>
                </div>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Markets</p>
                <p className="text-2xl font-semibold text-krishi-dark">42</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-gray-600">Across 5 districts</span>
                </div>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">42</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Price Alerts</p>
                <p className="text-2xl font-semibold text-krishi-dark">8</p>
                <div className="flex items-center gap-1 mt-1">
                  <AlertTriangle className="w-3 h-3 text-orange-500" />
                  <span className="text-xs text-orange-600">3 new today</span>
                </div>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Price Trend Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Price Trends (Last 7 Weeks)
              <div className="flex gap-2">
                <Badge variant="outline">Rice</Badge>
                <Badge variant="outline">Wheat</Badge>
                <Badge variant="outline">Tomato</Badge>
                <Badge variant="outline">Onion</Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData}>
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line type="monotone" dataKey="rice" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="wheat" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="tomato" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="onion" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Market Share */}
        <Card>
          <CardHeader>
            <CardTitle>Market Share by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketShare}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {marketShare.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {marketShare.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Movers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Price Movers Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
            {topMovers.map((item, index) => (
              <div key={index} className={`p-4 border rounded-lg hover:shadow-md transition-shadow ${
                viewMode === 'list' ? 'flex items-center justify-between' : ''
              }`}>
                <div className={viewMode === 'list' ? 'flex items-center gap-4' : 'space-y-2'}>
                  <div className={viewMode === 'list' ? '' : 'flex items-center justify-between'}>
                    <h4 className="font-medium text-krishi-dark">{item.crop}</h4>
                    {viewMode === 'grid' && (
                      <Badge variant={item.trend === 'up' ? 'default' : 'destructive'}>
                        {item.trend === 'up' ? '🔺' : '🔻'}
                      </Badge>
                    )}
                  </div>
                  <div className={viewMode === 'list' ? 'text-sm text-gray-600' : ''}>
                    <p className="text-lg font-semibold">₹{item.currentPrice}/kg</p>
                    {viewMode === 'list' && <p className="text-sm text-gray-600">{item.volume}</p>}
                  </div>
                </div>
                <div className={viewMode === 'list' ? 'text-right' : 'flex items-center justify-between text-sm text-gray-600'}>
                  <span className={`font-medium ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.trend === 'up' ? '+' : ''}{item.change}%
                  </span>
                  {viewMode === 'grid' && <span>{item.volume}</span>}
                  {viewMode === 'list' && (
                    <Badge variant={item.trend === 'up' ? 'default' : 'destructive'}>
                      {item.trend === 'up' ? '🔺' : '🔻'} {item.change}%
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Prices Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Daily Price Averages
            <Button variant="outline" size="sm">
              Export Data
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Crop</th>
                  <th className="text-left py-3 px-2">Price (₹/kg)</th>
                  <th className="text-left py-3 px-2">Change</th>
                  <th className="text-left py-3 px-2">Volume</th>
                  <th className="text-left py-3 px-2">Market</th>
                  <th className="text-left py-3 px-2">Trend</th>
                </tr>
              </thead>
              <tbody>
                {dailyPrices.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">{item.crop}</td>
                    <td className="py-3 px-2">₹{item.price}</td>
                    <td className={`py-3 px-2 font-medium ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change >= 0 ? '+' : ''}{item.change}%
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-600">{item.volume}</td>
                    <td className="py-3 px-2 text-sm text-gray-600">{item.market}</td>
                    <td className="py-3 px-2">
                      <div className="w-16 h-8">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={priceData.slice(-4)}>
                            <Line 
                              type="monotone" 
                              dataKey="rice" 
                              stroke={item.change >= 0 ? "#22c55e" : "#ef4444"} 
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}