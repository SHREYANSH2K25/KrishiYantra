import { useState } from 'react';
import { ArrowLeft, Search, Bell, User, History, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageUpload } from './ImageUpload';
import { DetectionResults } from './DetectionResults';
import { PestTipsAndGuidance } from './PestTipsAndGuidance';
import { DetectionHistory } from './DetectionHistory';

interface PestDetectionProps {
  onBack: () => void;
}

// Mock detection result
const mockDetectionResult = {
  diseaseName: "Late Blight (Phytophthora infestans)",
  confidence: 94,
  severity: 'high' as const,
  symptoms: [
    "Dark, water-soaked spots on leaves",
    "White fungal growth on leaf undersides",
    "Brown patches spreading rapidly",
    "Leaf yellowing and wilting",
    "Characteristic musty odor"
  ],
  treatments: [
    {
      name: "Copper Fungicide Spray",
      type: 'chemical' as const,
      feasible: true,
      dosage: "2-3 ml per liter of water",
      application: "Spray every 7-10 days in early morning",
      icon: "⚗️"
    },
    {
      name: "Neem Oil Treatment",
      type: 'natural' as const,
      feasible: true,
      dosage: "5 ml per liter of water",
      application: "Apply weekly as preventive measure",
      icon: "🌿"
    },
    {
      name: "Bordeaux Mixture",
      type: 'chemical' as const,
      feasible: false,
      dosage: "Not recommended for small farms",
      application: "Requires specialized equipment",
      icon: "🚫"
    }
  ],
  prevention: [
    "Ensure proper plant spacing for air circulation",
    "Avoid overhead watering during humid conditions",
    "Remove affected plant debris immediately",
    "Use disease-resistant tomato varieties",
    "Apply mulch to prevent soil splash",
    "Monitor humidity levels regularly"
  ],
  prediction: {
    untreatedSeverity: 'high' as const,
    timeframe: "7-10 days"
  }
};

export function PestDetection({ onBack }: PestDetectionProps) {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('detection');

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const handleClearImage = () => {
    setSelectedImage('');
    setShowResults(false);
  };

  const handleReanalyze = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowResults(true);
    setActiveTab('detection');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Crop Disease Detection Results',
        text: `Detected: ${mockDetectionResult.diseaseName} with ${mockDetectionResult.confidence}% confidence`,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      alert('Results copied to clipboard!');
    }
  };

  const handleSaveToHistory = () => {
    alert('Results saved to your detection history!');
  };

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
                <h1 className="text-xl font-semibold text-krishi-dark">Pest & Disease Detection</h1>
                <p className="text-sm text-krishi-muted">Upload an image or use your camera to identify crop issues instantly</p>
              </div>
            </div>

            {/* Right side - Search and actions */}
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search diseases..." 
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="ghost" size="sm" onClick={() => setActiveTab('history')}>
                <History className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setActiveTab('tips')}>
                <HelpCircle className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                {notificationsEnabled && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="detection">🔍 Detection</TabsTrigger>
            <TabsTrigger value="tips">💡 Tips & Guidance</TabsTrigger>
            <TabsTrigger value="history">📚 History</TabsTrigger>
          </TabsList>

          <TabsContent value="detection" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Image Upload Section */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <ImageUpload
                    onImageUpload={handleImageUpload}
                    isAnalyzing={isAnalyzing}
                    selectedImage={selectedImage}
                    onClearImage={handleClearImage}
                  />
                </div>
              </div>

              {/* Quick Tips Sidebar */}
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="font-semibold text-krishi-dark mb-4">Quick Tips</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="text-sm font-medium text-green-800">📸 Better Photos</h4>
                    <p className="text-xs text-green-700 mt-1">Use natural light and focus on affected areas</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="text-sm font-medium text-blue-800">🎯 Clear Focus</h4>
                    <p className="text-xs text-blue-700 mt-1">Show both healthy and diseased parts</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="text-sm font-medium text-orange-800">⚠️ Early Detection</h4>
                    <p className="text-xs text-orange-700 mt-1">Earlier detection leads to better outcomes</p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-krishi-pale-green rounded-lg">
                  <h4 className="font-medium text-krishi-dark mb-2">🌾 Supported Crops</h4>
                  <div className="flex flex-wrap gap-1">
                    {['Rice', 'Wheat', 'Tomato', 'Cotton', 'Maize', 'Potato'].map((crop) => (
                      <span key={crop} className="text-xs bg-white px-2 py-1 rounded border">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            {showResults && (
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <DetectionResults
                  result={mockDetectionResult}
                  onShare={handleShare}
                  onSaveToHistory={handleSaveToHistory}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="tips" className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <PestTipsAndGuidance
                notificationsEnabled={notificationsEnabled}
                onNotificationToggle={setNotificationsEnabled}
              />
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <DetectionHistory onReanalyze={handleReanalyze} />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer note */}
      <div className="bg-white border-t border-gray-200 p-4 text-center">
        <p className="text-sm text-gray-600">
          AI Detection powered by advanced machine learning • Accuracy rate: 90%+ • Results are for guidance only
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <Button variant="link" size="sm">About AI Model</Button>
          <Button variant="link" size="sm">Privacy Policy</Button>
          <Button variant="link" size="sm">Report Issue</Button>
        </div>
      </div>
    </div>
  );
}