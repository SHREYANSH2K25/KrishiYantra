import { useState } from 'react';
import { ArrowLeft, Search, Filter, Calculator, Clock, Leaf, Bug, Beaker, Video, Share2, Bookmark, MessageCircle, Star, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NaturalRemediesProps {
  onBack: () => void;
  onChatbotClick: () => void;
}

interface Remedy {
  id: string;
  crop: string;
  issue: string;
  remedyType: string;
  ingredients: string[];
  preparation: string[];
  application: {
    frequency: string;
    dosage: string;
    timing: string;
  };
  feasibility: 'easy' | 'moderate' | 'advanced';
  effectiveness: number;
  localAvailability: 'high' | 'medium' | 'low';
  category: 'pest' | 'disease' | 'soil' | 'growth';
  region: string[];
  rating: number;
  reviews: number;
  seasonality: string;
  warnings?: string[];
}

export function NaturalRemedies({ onBack, onChatbotClick }: NaturalRemediesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFeasibility, setSelectedFeasibility] = useState('all');
  const [sortBy, setSortBy] = useState('effectiveness');
  const [calculatorArea, setCalculatorArea] = useState('');
  const [selectedRemedy, setSelectedRemedy] = useState<Remedy | null>(null);

  // Mock remedies data
  const remedies: Remedy[] = [
    {
      id: '1',
      crop: 'Tomato',
      issue: 'Leaf Curl Virus',
      remedyType: 'Neem Oil Spray',
      ingredients: ['Neem oil (100ml)', 'Water (1L)', 'Liquid soap (5ml)'],
      preparation: [
        'Mix neem oil with a few drops of liquid soap',
        'Add to 1 liter of clean water',
        'Stir well until properly mixed',
        'Strain the solution if needed'
      ],
      application: {
        frequency: 'Weekly',
        dosage: '5ml per plant',
        timing: 'Early morning or evening'
      },
      feasibility: 'easy',
      effectiveness: 85,
      localAvailability: 'high',
      category: 'pest',
      region: ['Kerala', 'Karnataka', 'Tamil Nadu'],
      rating: 4.3,
      reviews: 245,
      seasonality: 'All seasons',
      warnings: ['Avoid spraying during hot sunlight', 'Test on small area first']
    },
    {
      id: '2',
      crop: 'Rice',
      issue: 'Brown Plant Hopper',
      remedyType: 'Garlic-Chili Spray',
      ingredients: ['Garlic cloves (10)', 'Green chilies (5)', 'Water (1L)', 'Neem soap (10ml)'],
      preparation: [
        'Crush garlic cloves and green chilies',
        'Boil in 500ml water for 15 minutes',
        'Cool and strain the solution',
        'Add neem soap and mix well'
      ],
      application: {
        frequency: 'Twice weekly',
        dosage: '10ml per sq meter',
        timing: 'Morning application preferred'
      },
      feasibility: 'moderate',
      effectiveness: 78,
      localAvailability: 'high',
      category: 'pest',
      region: ['Kerala', 'Andhra Pradesh', 'West Bengal'],
      rating: 4.1,
      reviews: 189,
      seasonality: 'Monsoon & Post-monsoon'
    },
    {
      id: '3',
      crop: 'Banana',
      issue: 'Poor Soil Health',
      remedyType: 'Compost Tea',
      ingredients: ['Well-decomposed compost (2kg)', 'Water (10L)', 'Jaggery (50g)'],
      preparation: [
        'Mix compost with water in large container',
        'Add jaggery to boost microbial activity',
        'Let it ferment for 3-5 days',
        'Stir daily and strain before use'
      ],
      application: {
        frequency: 'Monthly',
        dosage: '2L per plant',
        timing: 'Early morning'
      },
      feasibility: 'easy',
      effectiveness: 92,
      localAvailability: 'high',
      category: 'soil',
      region: ['All regions'],
      rating: 4.6,
      reviews: 312,
      seasonality: 'All seasons'
    },
    {
      id: '4',
      crop: 'Chili',
      issue: 'Powdery Mildew',
      remedyType: 'Baking Soda Solution',
      ingredients: ['Baking soda (5g)', 'Water (1L)', 'Liquid soap (2ml)', 'Coconut oil (5ml)'],
      preparation: [
        'Dissolve baking soda in warm water',
        'Add liquid soap and coconut oil',
        'Mix thoroughly until well combined',
        'Use immediately after preparation'
      ],
      application: {
        frequency: 'Every 3 days',
        dosage: '50ml per plant',
        timing: 'Evening application'
      },
      feasibility: 'easy',
      effectiveness: 80,
      localAvailability: 'high',
      category: 'disease',
      region: ['Karnataka', 'Andhra Pradesh', 'Maharashtra'],
      rating: 4.2,
      reviews: 156,
      seasonality: 'Winter & Summer'
    },
    {
      id: '5',
      crop: 'Coconut',
      issue: 'Nutrient Deficiency',
      remedyType: 'Seaweed Extract',
      ingredients: ['Dried seaweed (500g)', 'Water (5L)', 'Buttermilk (500ml)'],
      preparation: [
        'Soak dried seaweed in water for 24 hours',
        'Boil the mixture for 30 minutes',
        'Cool and strain the liquid',
        'Mix with buttermilk before application'
      ],
      application: {
        frequency: 'Bi-weekly',
        dosage: '500ml per tree',
        timing: 'Morning hours'
      },
      feasibility: 'advanced',
      effectiveness: 88,
      localAvailability: 'medium',
      category: 'growth',
      region: ['Kerala', 'Tamil Nadu', 'Karnataka'],
      rating: 4.4,
      reviews: 98,
      seasonality: 'Monsoon preferred'
    }
  ];

  const filteredRemedies = remedies.filter(remedy => {
    const matchesSearch = searchQuery === '' || 
      remedy.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      remedy.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      remedy.remedyType.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCrop = selectedCrop === 'all' || remedy.crop === selectedCrop;
    const matchesCategory = selectedCategory === 'all' || remedy.category === selectedCategory;
    const matchesFeasibility = selectedFeasibility === 'all' || remedy.feasibility === selectedFeasibility;

    return matchesSearch && matchesCrop && matchesCategory && matchesFeasibility;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'effectiveness':
        return b.effectiveness - a.effectiveness;
      case 'easy':
        return a.feasibility === 'easy' ? -1 : 1;
      case 'available':
        return a.localAvailability === 'high' ? -1 : 1;
      default:
        return 0;
    }
  });

  const getFeasibilityColor = (feasibility: string) => {
    switch (feasibility) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-orange-100 text-orange-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateQuantity = (baseAmount: string, area: number) => {
    const amount = parseFloat(baseAmount.replace(/[^\d.]/g, ''));
    return (amount * area).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-krishi-pale-green to-krishi-pale-blue">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-krishi-dark">Natural Remedies for Your Crops</h1>
                <p className="text-sm text-krishi-muted">Eco-friendly solutions for healthy and productive farming</p>
              </div>
            </div>
            
            <Button
              onClick={onChatbotClick}
              className="bg-krishi-accent-orange hover:bg-orange-500 text-white gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Ask Advisor
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs defaultValue="remedies" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="remedies">Browse Remedies</TabsTrigger>
            <TabsTrigger value="calculator">Mix Calculator</TabsTrigger>
            <TabsTrigger value="seasonal">Seasonal Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="remedies" className="space-y-6">
            {/* Search and Filters */}
            <Card className="p-6">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-krishi-muted w-4 h-4" />
                  <Input
                    placeholder="Search by crop, problem, or remedy type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Crops" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Crops</SelectItem>
                      <SelectItem value="Tomato">Tomato</SelectItem>
                      <SelectItem value="Rice">Rice</SelectItem>
                      <SelectItem value="Banana">Banana</SelectItem>
                      <SelectItem value="Chili">Chili</SelectItem>
                      <SelectItem value="Coconut">Coconut</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="pest">Pest Control</SelectItem>
                      <SelectItem value="disease">Disease Treatment</SelectItem>
                      <SelectItem value="soil">Soil Health</SelectItem>
                      <SelectItem value="growth">Growth Enhancement</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedFeasibility} onValueChange={setSelectedFeasibility}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Difficulty</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="effectiveness">Most Effective</SelectItem>
                      <SelectItem value="easy">Easy to Apply</SelectItem>
                      <SelectItem value="available">Locally Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Results */}
            <div className="text-sm text-krishi-muted mb-4">
              Found {filteredRemedies.length} remedies
            </div>

            {/* Remedy Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredRemedies.map((remedy) => (
                <Card key={remedy.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-krishi-dark mb-1">
                          {remedy.crop} - {remedy.issue}
                        </h3>
                        <p className="text-lg font-medium text-green-600 mb-2">{remedy.remedyType}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(remedy.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-krishi-muted">
                            {remedy.rating} ({remedy.reviews} reviews)
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getFeasibilityColor(remedy.feasibility)}>
                        {remedy.feasibility}
                      </Badge>
                      <Badge className={getAvailabilityColor(remedy.localAvailability)}>
                        {remedy.localAvailability} availability
                      </Badge>
                      <Badge variant="outline">
                        {remedy.effectiveness}% effective
                      </Badge>
                    </div>

                    {/* Ingredients */}
                    <div>
                      <h4 className="font-medium text-krishi-dark mb-2 flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-green-600" />
                        Ingredients
                      </h4>
                      <div className="grid grid-cols-2 gap-1 text-sm text-krishi-muted">
                        {remedy.ingredients.map((ingredient, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            {ingredient}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Application Info */}
                    <div className="grid grid-cols-3 gap-4 pt-2 border-t border-gray-100">
                      <div className="text-center">
                        <Clock className="w-4 h-4 text-krishi-muted mx-auto mb-1" />
                        <p className="text-xs text-krishi-muted">Frequency</p>
                        <p className="text-sm font-medium">{remedy.application.frequency}</p>
                      </div>
                      <div className="text-center">
                        <Beaker className="w-4 h-4 text-krishi-muted mx-auto mb-1" />
                        <p className="text-xs text-krishi-muted">Dosage</p>
                        <p className="text-sm font-medium">{remedy.application.dosage}</p>
                      </div>
                      <div className="text-center">
                        <Clock className="w-4 h-4 text-krishi-muted mx-auto mb-1" />
                        <p className="text-xs text-krishi-muted">Best Time</p>
                        <p className="text-sm font-medium">{remedy.application.timing}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setSelectedRemedy(remedy)}
                      >
                        View Steps
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Video className="w-4 h-4" />
                        Demo
                      </Button>
                    </div>

                    {/* Warnings */}
                    {remedy.warnings && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <p className="text-xs font-medium text-orange-800 mb-1">⚠️ Important Notes:</p>
                        {remedy.warnings.map((warning, index) => (
                          <p key={index} className="text-xs text-orange-700">• {warning}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calculator" className="space-y-6">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <Calculator className="w-12 h-12 text-krishi-accent-orange mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-krishi-dark mb-2">Mix & Apply Calculator</h3>
                  <p className="text-krishi-muted">Calculate the exact quantity needed for your field size</p>
                </div>

                <Separator />

                <div className="max-w-md mx-auto space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-krishi-dark mb-2">
                      Field/Area Size (in acres)
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter area in acres"
                      value={calculatorArea}
                      onChange={(e) => setCalculatorArea(e.target.value)}
                    />
                  </div>

                  <Select onValueChange={(value) => setSelectedRemedy(remedies.find(r => r.id === value) || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a remedy" />
                    </SelectTrigger>
                    <SelectContent>
                      {remedies.map((remedy) => (
                        <SelectItem key={remedy.id} value={remedy.id}>
                          {remedy.remedyType} for {remedy.crop}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedRemedy && calculatorArea && (
                    <Card className="p-4 bg-green-50 border-green-200">
                      <h4 className="font-medium text-green-800 mb-3">Calculated Quantities:</h4>
                      <div className="space-y-2">
                        {selectedRemedy.ingredients.map((ingredient, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-green-700">{ingredient.split('(')[0]}</span>
                            <span className="font-medium text-green-800">
                              {calculateQuantity(ingredient, parseFloat(calculatorArea))} units
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-white rounded border border-green-200">
                        <p className="text-xs text-green-700">
                          <strong>Application rate:</strong> {selectedRemedy.application.dosage} per area
                        </p>
                        <p className="text-xs text-green-700">
                          <strong>Frequency:</strong> {selectedRemedy.application.frequency}
                        </p>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="seasonal" className="space-y-6">
            <Card className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-krishi-dark mb-2">Seasonal Remedy Guide</h3>
                <p className="text-krishi-muted">Best times to apply natural remedies based on season and region</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Monsoon */}
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">Monsoon Season</h4>
                  <div className="space-y-2">
                    <div className="text-sm text-blue-700">
                      <strong>Focus:</strong> Fungal diseases, soil health
                    </div>
                    <div className="text-sm text-blue-700">
                      <strong>Best remedies:</strong> Neem oil, Compost tea, Seaweed extract
                    </div>
                    <div className="text-sm text-blue-700">
                      <strong>Application timing:</strong> Early morning (6-8 AM)
                    </div>
                  </div>
                </Card>

                {/* Winter */}
                <Card className="p-4 bg-orange-50 border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-3">Winter Season</h4>
                  <div className="space-y-2">
                    <div className="text-sm text-orange-700">
                      <strong>Focus:</strong> Powdery mildew, growth enhancement
                    </div>
                    <div className="text-sm text-orange-700">
                      <strong>Best remedies:</strong> Baking soda solution, Garlic spray
                    </div>
                    <div className="text-sm text-orange-700">
                      <strong>Application timing:</strong> Late morning (9-11 AM)
                    </div>
                  </div>
                </Card>

                {/* Summer */}
                <Card className="p-4 bg-yellow-50 border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-3">Summer Season</h4>
                  <div className="space-y-2">
                    <div className="text-sm text-yellow-700">
                      <strong>Focus:</strong> Pest control, water stress
                    </div>
                    <div className="text-sm text-yellow-700">
                      <strong>Best remedies:</strong> Neem oil, Aloe vera extract
                    </div>
                    <div className="text-sm text-yellow-700">
                      <strong>Application timing:</strong> Early morning or evening
                    </div>
                  </div>
                </Card>
              </div>

              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2">💡 Seasonal Tips</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Avoid spraying during rain or immediately before expected rain</li>
                  <li>• Increase application frequency during disease-prone seasons</li>
                  <li>• Store prepared solutions in cool, dark places</li>
                  <li>• Test new remedies on small areas first</li>
                </ul>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Detailed Remedy Modal/View */}
      {selectedRemedy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-krishi-dark">{selectedRemedy.remedyType}</h3>
                  <p className="text-krishi-muted">{selectedRemedy.crop} - {selectedRemedy.issue}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedRemedy(null)}>
                  ✕
                </Button>
              </div>

              <div className="space-y-6">
                {/* Preparation Steps */}
                <div>
                  <h4 className="font-medium text-krishi-dark mb-3">Preparation Steps:</h4>
                  <ol className="space-y-2">
                    {selectedRemedy.preparation.map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-krishi-accent-orange text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-sm text-krishi-dark">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Application Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-krishi-dark mb-3">Application Guidelines:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <strong>Frequency:</strong> {selectedRemedy.application.frequency}
                    </div>
                    <div>
                      <strong>Dosage:</strong> {selectedRemedy.application.dosage}
                    </div>
                    <div>
                      <strong>Best Time:</strong> {selectedRemedy.application.timing}
                    </div>
                  </div>
                </div>

                {/* Warnings */}
                {selectedRemedy.warnings && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-medium text-orange-800 mb-2">⚠️ Important Warnings:</h4>
                    <ul className="space-y-1">
                      {selectedRemedy.warnings.map((warning, index) => (
                        <li key={index} className="text-sm text-orange-700">• {warning}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button onClick={() => setSelectedRemedy(null)} className="bg-krishi-accent-orange hover:bg-orange-500 text-white">
                    Got it!
                  </Button>
                  <Button variant="outline" onClick={onChatbotClick}>
                    Ask Questions
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}