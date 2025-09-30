import { TrendingUp, AlertCircle, Target, Lightbulb, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';

const marketTips = [
  {
    type: 'sell',
    crop: 'Tomato',
    message: 'Sell now for maximum profit',
    reason: 'Price peaked at ₹42/kg, expected to drop 15% next week',
    confidence: 85,
    icon: TrendingUp,
    color: 'green'
  },
  {
    type: 'wait',
    crop: 'Rice',
    message: 'Wait for peak season',
    reason: 'Harvest season approaching, prices may rise 20% in 2 weeks',
    confidence: 72,
    icon: Clock,
    color: 'orange'
  },
  {
    type: 'alert',
    crop: 'Onion',
    message: 'High demand alert',
    reason: 'Export demand increased, local prices rising rapidly',
    confidence: 92,
    icon: AlertCircle,
    color: 'red'
  }
];

const predictions = [
  {
    crop: 'Wheat',
    currentPrice: 37,
    nextWeekPrice: 39,
    confidence: 78,
    factors: ['Seasonal demand', 'Export boost', 'Weather conditions']
  },
  {
    crop: 'Potato',
    currentPrice: 28,
    nextWeekPrice: 25,
    confidence: 65,
    factors: ['Supply surplus', 'Storage issues', 'Transportation delays']
  },
  {
    crop: 'Garlic',
    currentPrice: 185,
    nextWeekPrice: 200,
    confidence: 88,
    factors: ['Limited supply', 'Festival demand', 'Export orders']
  }
];

const marketComparison = [
  { market: 'Kochi Mandi', crop: 'Tomato', price: 42, distance: '5 km', trend: 'up' },
  { market: 'Ernakulam Market', crop: 'Tomato', price: 38, distance: '12 km', trend: 'stable' },
  { market: 'Mattancherry', crop: 'Tomato', price: 35, distance: '8 km', trend: 'down' },
  { market: 'Palayam Market', crop: 'Tomato', price: 40, distance: '15 km', trend: 'up' }
];

const notifications = [
  {
    id: 1,
    type: 'price-alert',
    title: 'Price Surge Alert',
    message: 'Tomato prices increased by 18% in Kochi Mandi',
    time: '2 hours ago',
    read: false
  },
  {
    id: 2,
    type: 'market-update',
    title: 'New Market Added',
    message: 'Thrissur Agricultural Market now available',
    time: '5 hours ago',
    read: false
  },
  {
    id: 3,
    type: 'prediction',
    title: 'AI Prediction',
    message: 'Rice prices expected to rise 12% next week',
    time: '1 day ago',
    read: true
  }
];

export function MarketInsights() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* AI Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            AI Price Predictions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {predictions.map((prediction, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{prediction.crop}</h4>
                <Badge variant={prediction.nextWeekPrice > prediction.currentPrice ? 'default' : 'destructive'}>
                  {prediction.nextWeekPrice > prediction.currentPrice ? '📈' : '📉'}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current: ₹{prediction.currentPrice}/kg</span>
                  <span className={prediction.nextWeekPrice > prediction.currentPrice ? 'text-green-600' : 'text-red-600'}>
                    Next Week: ₹{prediction.nextWeekPrice}/kg
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Confidence</span>
                    <span>{prediction.confidence}%</span>
                  </div>
                  <Progress value={prediction.confidence} className="h-2" />
                </div>
              </div>
              <div className="text-xs text-gray-600">
                <span>Factors: </span>
                {prediction.factors.join(', ')}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Market Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Smart Tips & Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {marketTips.map((tip, index) => {
            const IconComponent = tip.icon;
            return (
              <div key={index} className={`p-4 border-l-4 bg-${tip.color}-50 border-${tip.color}-200 rounded-r-lg`}>
                <div className="flex items-start gap-3">
                  <IconComponent className={`w-5 h-5 text-${tip.color}-600 mt-0.5`} />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{tip.crop}</h4>
                      <Badge variant="outline" className="text-xs">
                        {tip.confidence}% sure
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-gray-800">{tip.message}</p>
                    <p className="text-xs text-gray-600">{tip.reason}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Notifications */}
          <div className="border-t pt-4">
            <h5 className="font-medium mb-3 text-sm text-gray-700">Recent Notifications</h5>
            <div className="space-y-2">
              {notifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className={`p-3 rounded-lg border ${!notification.read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h6 className="text-sm font-medium">{notification.title}</h6>
                      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-500" />
            Market Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600 mb-4">
            Tomato prices across nearby markets
          </div>
          {marketComparison.map((market, index) => (
            <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{market.market}</h4>
                <Badge variant={market.trend === 'up' ? 'default' : market.trend === 'down' ? 'destructive' : 'secondary'}>
                  {market.trend === 'up' ? '🔺' : market.trend === 'down' ? '🔻' : '➡️'}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-lg">₹{market.price}/kg</span>
                <span className="text-gray-600">{market.distance}</span>
              </div>
              <Button size="sm" variant="outline" className="w-full mt-2">
                View Details
              </Button>
            </div>
          ))}

          {/* Market Image */}
          <div className="mt-6">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1631394058714-a8077aba2180?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBtYXJrZXQlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc1OTA1MzIzNnww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Fresh vegetables at farmer's market"
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="text-center mt-2">
              <p className="text-xs text-gray-600">Live from Kochi Mandi</p>
              <p className="text-xs text-green-600">Market opens at 6:00 AM</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}