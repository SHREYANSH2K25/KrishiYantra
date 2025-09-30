import { Check, X, Lightbulb, Calendar, MapPin, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { ImageWithFallback } from './figma/ImageWithFallback';

const dosDonts = [
  {
    type: 'do',
    title: 'Take photos in good lighting',
    description: 'Natural daylight works best for clear images',
    icon: '📸'
  },
  {
    type: 'do',
    title: 'Focus on affected areas',
    description: 'Show the diseased part clearly in the frame',
    icon: '🎯'
  },
  {
    type: 'do',
    title: 'Include healthy parts for comparison',
    description: 'This helps AI understand the contrast',
    icon: '🌿'
  },
  {
    type: 'dont',
    title: 'Use blurry or dark images',
    description: 'Poor quality reduces detection accuracy',
    icon: '🚫'
  },
  {
    type: 'dont',
    title: 'Include multiple diseases',
    description: 'Focus on one issue at a time',
    icon: '⚠️'
  },
  {
    type: 'dont',
    title: 'Use heavily filtered photos',
    description: 'Natural colors help accurate diagnosis',
    icon: '🎨'
  }
];

const seasonalAlerts = [
  {
    season: 'Monsoon',
    diseases: ['Leaf Blight', 'Root Rot', 'Fungal Infections'],
    prevention: 'Ensure proper drainage and avoid overwatering',
    severity: 'high'
  },
  {
    season: 'Summer',
    diseases: ['Aphid Infestation', 'Leaf Curl', 'Heat Stress'],
    prevention: 'Provide shade and increase watering frequency',
    severity: 'medium'
  },
  {
    season: 'Winter',
    diseases: ['Frost Damage', 'Bacterial Wilt', 'Nutrient Deficiency'],
    prevention: 'Use protective covers and adjust fertilization',
    severity: 'low'
  }
];

const nearbyMarkets = [
  {
    name: 'Green Valley Agri Store',
    distance: '2.3 km',
    products: ['Neem Oil', 'Organic Fertilizer', 'Bio-pesticides'],
    rating: 4.5,
    open: true
  },
  {
    name: 'Farm Fresh Supplies',
    distance: '4.1 km',
    products: ['Copper Fungicide', 'Compost', 'Seeds'],
    rating: 4.2,
    open: true
  },
  {
    name: 'Krishi Kendra',
    distance: '6.8 km',
    products: ['Government Schemes', 'Technical Support', 'Soil Testing'],
    rating: 4.8,
    open: false
  }
];

interface PestTipsAndGuidanceProps {
  notificationsEnabled: boolean;
  onNotificationToggle: (enabled: boolean) => void;
}

export function PestTipsAndGuidance({ notificationsEnabled, onNotificationToggle }: PestTipsAndGuidanceProps) {
  return (
    <div className="space-y-6">
      {/* Do's and Don'ts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Photography Tips for Better Detection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Do's */}
            <div className="space-y-3">
              <h4 className="font-medium text-green-600 flex items-center gap-2">
                <Check className="w-4 h-4" />
                Do's
              </h4>
              {dosDonts.filter(item => item.type === 'do').map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <h5 className="font-medium text-krishi-dark text-sm">{item.title}</h5>
                    <p className="text-xs text-krishi-muted mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Don'ts */}
            <div className="space-y-3">
              <h4 className="font-medium text-red-600 flex items-center gap-2">
                <X className="w-4 h-4" />
                Don'ts
              </h4>
              {dosDonts.filter(item => item.type === 'dont').map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <h5 className="font-medium text-krishi-dark text-sm">{item.title}</h5>
                    <p className="text-xs text-krishi-muted mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Disease Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            Seasonal Disease Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {seasonalAlerts.map((alert, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-krishi-dark">{alert.season} Season</h4>
                  <Badge variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'default' : 'secondary'}>
                    {alert.severity === 'high' ? '🔴' : alert.severity === 'medium' ? '🟡' : '🟢'} {alert.severity.toUpperCase()}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-krishi-muted">Common Issues:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {alert.diseases.map((disease, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {disease}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-krishi-muted">Prevention:</span>
                    <p className="text-sm text-krishi-dark mt-1">{alert.prevention}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nearby Input Markets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-500" />
            Nearby Agricultural Stores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {nearbyMarkets.map((market, index) => (
              <div key={index} className={`p-4 border rounded-lg ${!market.open ? 'opacity-60' : ''}`}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-krishi-dark">{market.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-krishi-muted">
                      <span>{market.distance}</span>
                      <span>•</span>
                      <span>⭐ {market.rating}</span>
                      <span>•</span>
                      <Badge variant={market.open ? 'default' : 'secondary'} className="text-xs">
                        {market.open ? '🟢 Open' : '🔴 Closed'}
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" disabled={!market.open}>
                    Get Directions
                  </Button>
                </div>
                <div>
                  <span className="text-sm font-medium text-krishi-muted">Available Products:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {market.products.map((product, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Government Resources */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg">Government Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button variant="outline" className="justify-start h-auto p-3">
              <div className="text-left">
                <div className="font-medium">Organic Certification</div>
                <div className="text-xs text-krishi-muted">Get certified for organic farming</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-3">
              <div className="text-left">
                <div className="font-medium">Pest Management Schemes</div>
                <div className="text-xs text-krishi-muted">Government support programs</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-3">
              <div className="text-left">
                <div className="font-medium">Extension Services</div>
                <div className="text-xs text-krishi-muted">Connect with local officers</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-3">
              <div className="text-left">
                <div className="font-medium">Training Programs</div>
                <div className="text-xs text-krishi-muted">Learn integrated pest management</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-500" />
            Disease Alert Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-krishi-dark">Get seasonal disease alerts</h4>
              <p className="text-sm text-krishi-muted">Receive notifications about common diseases in your area</p>
            </div>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={onNotificationToggle}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}