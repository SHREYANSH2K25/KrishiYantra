import { Cloud, Thermometer, Droplets, Wind, TrendingUp, Gauge } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const mockWeatherData = [
  { day: 'Mon', temp: 28, rainfall: 2 },
  { day: 'Tue', temp: 32, rainfall: 0 },
  { day: 'Wed', temp: 29, rainfall: 5 },
  { day: 'Thu', temp: 31, rainfall: 1 },
  { day: 'Fri', temp: 27, rainfall: 8 },
  { day: 'Sat', temp: 26, rainfall: 12 },
  { day: 'Sun', temp: 28, rainfall: 3 }
];

export function WeatherSoilInsights() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-krishi-pale-blue to-krishi-pale-green">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-krishi-dark mb-4">
            Weather & Soil Insights
          </h2>
          <p className="text-2xl text-krishi-dark mb-2">
            Know Your Land, Plan Your Season.
          </p>
          <p className="text-lg text-krishi-muted max-w-2xl mx-auto">
            Get hyperlocal weather forecasts, soil health monitoring, and seasonal planning recommendations tailored to your farm.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Content */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Weather Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Cloud className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-krishi-dark">7-Day Weather</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-krishi-muted">Temperature</span>
                    <span className="font-medium">28-32°C</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-krishi-muted">Rainfall</span>
                    <span className="font-medium">31mm expected</span>
                  </div>
                </div>
              </div>

              {/* Soil Health Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Gauge className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-krishi-dark">Soil Health</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-krishi-muted">pH Level</span>
                    <span className="font-medium text-green-600">6.8 (Good)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-krishi-muted">Moisture</span>
                    <span className="font-medium">72%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="font-semibold text-krishi-dark mb-4">Smart Insights Include:</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Thermometer className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-krishi-muted">Real-time temperature & humidity alerts</span>
                </div>
                <div className="flex items-center gap-3">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-krishi-muted">Precision irrigation recommendations</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wind className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-krishi-muted">Wind speed & spray timing guidance</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-krishi-muted">Seasonal crop planning insights</span>
                </div>
              </div>
            </div>

            {/* Sample Forecast Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="font-semibold text-krishi-dark mb-4">7-Day Temperature Forecast</h4>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockWeatherData}>
                    <XAxis 
                      dataKey="day" 
                      axisLine={false}
                      tickLine={false}
                      className="text-xs text-krishi-muted"
                    />
                    <YAxis hide />
                    <Line 
                      type="monotone" 
                      dataKey="temp" 
                      stroke="#FFB86B" 
                      strokeWidth={3}
                      dot={{ fill: '#FFB86B', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right side - Illustration */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1676131797631-1e7cdb98c5c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBhZ3JpY3VsdHVyZSUyMHNjaGVtZXxlbnwxfHx8fDE3NTkxNTkzNTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Weather monitoring and soil analysis technology for agriculture"
                className="w-full max-w-md rounded-2xl shadow-lg"
              />
              {/* Floating weather widget */}
              <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-semibold text-sm">Today</div>
                    <div className="text-xs text-krishi-muted">28°C, Partly Cloudy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}