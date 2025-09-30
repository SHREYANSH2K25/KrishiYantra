import { useState } from 'react';
import { Calendar, Search, Filter, MoreVertical, Download, Trash2, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HistoryItem {
  id: string;
  date: string;
  time: string;
  image: string;
  cropType: string;
  disease: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  treatment: string;
  status: 'treated' | 'pending' | 'monitoring';
}

const mockHistory: HistoryItem[] = [
  {
    id: '1',
    date: '2024-01-15',
    time: '10:30 AM',
    image: 'https://images.unsplash.com/photo-1728297753604-d2e129bdb226?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMGRpc2Vhc2UlMjBsZWFmJTIwaW5mZWN0aW9ufGVufDF8fHx8MTc1OTE2MDcyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    cropType: 'Tomato',
    disease: 'Late Blight',
    confidence: 94,
    severity: 'high',
    treatment: 'Copper Fungicide',
    status: 'treated'
  },
  {
    id: '2',
    date: '2024-01-12',
    time: '2:15 PM',
    image: 'https://images.unsplash.com/photo-1728297753604-d2e129bdb226?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMGRpc2Vhc2UlMjBsZWFmJTIwaW5mZWN0aW9ufGVufDF8fHx8MTc1OTE2MDcyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    cropType: 'Rice',
    disease: 'Leaf Rust',
    confidence: 87,
    severity: 'medium',
    treatment: 'Neem Oil Spray',
    status: 'monitoring'
  },
  {
    id: '3',
    date: '2024-01-10',
    time: '8:45 AM',
    image: 'https://images.unsplash.com/photo-1728297753604-d2e129bdb226?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMGRpc2Vhc2UlMjBsZWFmJTIwaW5mZWN0aW9ufGVufDF8fHx8MTc1OTE2MDcyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    cropType: 'Wheat',
    disease: 'Powdery Mildew',
    confidence: 91,
    severity: 'low',
    treatment: 'Organic Sulfur',
    status: 'pending'
  },
  {
    id: '4',
    date: '2024-01-08',
    time: '4:20 PM',
    image: 'https://images.unsplash.com/photo-1728297753604-d2e129bdb226?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMGRpc2Vhc2UlMjBsZWFmJTIwaW5mZWN0aW9ufGVufDF8fHx8MTc1OTE2MDcyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    cropType: 'Cotton',
    disease: 'Aphid Infestation',
    confidence: 89,
    severity: 'medium',
    treatment: 'Bio-pesticide',
    status: 'treated'
  }
];

interface DetectionHistoryProps {
  onReanalyze: (imageUrl: string) => void;
}

export function DetectionHistory({ onReanalyze }: DetectionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'card' | 'timeline'>('card');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'treated': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'monitoring': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredHistory = mockHistory.filter(item => {
    const matchesSearch = item.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.cropType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-krishi-dark">Detection History</h3>
          <p className="text-sm text-krishi-muted">{filteredHistory.length} scans found</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'card' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('card')}
          >
            Card View
          </Button>
          <Button
            variant={viewMode === 'timeline' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('timeline')}
          >
            Timeline
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by crop or disease..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Status: {filterStatus === 'all' ? 'All' : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterStatus('all')}>All Status</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus('treated')}>Treated</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus('pending')}>Pending</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus('monitoring')}>Monitoring</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* History Items */}
      {viewMode === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHistory.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <ImageWithFallback
                    src={item.image}
                    alt={`${item.cropType} scan`}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-krishi-dark">{item.disease}</h4>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => onReanalyze(item.image)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onReanalyze(item.image)}>
                            <Download className="w-4 h-4 mr-2" />
                            Re-analyze
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline">{item.cropType}</Badge>
                      <Badge className={getSeverityColor(item.severity)}>
                        {item.severity.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="text-xs text-krishi-muted">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{item.date} at {item.time}</span>
                      </div>
                      <div className="mt-1">
                        Confidence: {item.confidence}% • Treatment: {item.treatment}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Timeline View */
        <div className="space-y-4">
          {filteredHistory.map((item, index) => (
            <div key={item.id} className="relative">
              {index !== filteredHistory.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-full bg-gray-200"></div>
              )}
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-krishi-pale-green rounded-full flex items-center justify-center relative z-10">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <Card className="flex-1">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-krishi-dark">{item.disease} in {item.cropType}</h4>
                        <p className="text-sm text-krishi-muted">{item.date} at {item.time}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getSeverityColor(item.severity)}>
                          {item.severity.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <ImageWithFallback
                        src={item.image}
                        alt={`${item.cropType} scan`}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="text-sm text-krishi-muted">
                        <p>Confidence: {item.confidence}%</p>
                        <p>Treatment: {item.treatment}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => onReanalyze(item.image)}>
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredHistory.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-medium text-krishi-dark mb-2">No scans found</h3>
            <p className="text-sm text-krishi-muted">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : 'Start by uploading your first crop image for analysis'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}