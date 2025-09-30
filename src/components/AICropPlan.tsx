import { useState } from 'react';
import { ArrowLeft, Calendar, TrendingUp, Droplets, Bug, Zap, Download, Share2, MessageCircle, BarChart3, MapPin, Cloud, DollarSign, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Slider } from './ui/slider';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AICropPlanProps {
  onBack: () => void;
  onChatbotClick: () => void;
}

interface CropPlan {
  id: string;
  crop: string;
  variety: string;
  plantingDate: string;
  harvestDate: string;
  expectedYield: number;
  yieldUnit: string;
  waterRequirement: number;
  laborDays: number;
  pestRiskLevel: 'low' | 'medium' | 'high';
  profitability: number;
  marketDemand: 'low' | 'medium' | 'high';
  resources: {
    fertilizer: string[];
    pesticides: string[];
    equipment: string[];
  };
  timeline: {
    activity: string;
    week: number;
    description: string;
  }[];
  aiConfidence: number;
  suitabilityScore: number;
  climateCompatibility: number;
  marketPrice: number;
  totalCost: number;
  netProfit: number;
}

interface FarmInputs {
  area: number;
  soilType: string;
  season: string;
  waterAvailability: string;
  previousCrop: string;
  region: string;
  budget: number;
  marketPreference: string;
}

export function AICropPlan({ onBack, onChatbotClick }: AICropPlanProps) {
  const [farmInputs, setFarmInputs] = useState<FarmInputs>({
    area: 1,
    soilType: 'loam',
    season: 'kharif',
    waterAvailability: 'adequate',
    previousCrop: 'fallow',
    region: 'kerala',
    budget: 50000,
    marketPreference: 'local'
  });

  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock AI-generated crop plans
  const cropPlans: CropPlan[] = [
    {
      id: '1',
      crop: 'Rice',
      variety: 'Ponni (Short Duration)',
      plantingDate: '2024-06-15',
      harvestDate: '2024-10-15',
      expectedYield: 4500,
      yieldUnit: 'kg/acre',
      waterRequirement: 1200,
      laborDays: 45,
      pestRiskLevel: 'medium',
      profitability: 85,
      marketDemand: 'high',
      resources: {
        fertilizer: ['Urea (50kg)', 'DAP (25kg)', 'Potash (20kg)'],
        pesticides: ['Carbofuran', 'Chlorpyrifos'],
        equipment: ['Transplanter', 'Harvester']
      },
      timeline: [
        { activity: 'Land Preparation', week: 1, description: 'Plowing and leveling' },
        { activity: 'Nursery Preparation', week: 2, description: 'Seed bed preparation' },
        { activity: 'Transplanting', week: 4, description: 'Move seedlings to main field' },
        { activity: 'First Fertilization', week: 6, description: 'Apply urea and DAP' },
        { activity: 'Weed Control', week: 8, description: 'Manual or chemical weeding' },
        { activity: 'Pest Monitoring', week: 10, description: 'Check for brown plant hopper' },
        { activity: 'Harvest', week: 16, description: 'Combine harvesting' }
      ],
      aiConfidence: 92,
      suitabilityScore: 88,
      climateCompatibility: 90,
      marketPrice: 25,
      totalCost: 35000,
      netProfit: 77500
    },
    {
      id: '2',
      crop: 'Coconut',
      variety: 'Dwarf Hybrid',
      plantingDate: '2024-06-01',
      harvestDate: '2027-06-01',
      expectedYield: 12000,
      yieldUnit: 'nuts/acre/year',
      waterRequirement: 800,
      laborDays: 25,
      pestRiskLevel: 'low',
      profitability: 78,
      marketDemand: 'high',
      resources: {
        fertilizer: ['Organic Compost (2 tons)', 'Coconut Special Mix (100kg)'],
        pesticides: ['Neem Oil', 'Copper Sulphate'],
        equipment: ['Coconut Climbing Device', 'Irrigation System']
      },
      timeline: [
        { activity: 'Pit Preparation', week: 1, description: '8x8x8 ft pits' },
        { activity: 'Planting', week: 4, description: 'Plant saplings with compost' },
        { activity: 'Initial Care', week: 8, description: 'Watering and mulching' },
        { activity: 'First Fertilization', week: 12, description: 'Apply organic manure' },
        { activity: 'Pest Prevention', week: 16, description: 'Neem oil application' },
        { activity: 'Growth Monitoring', week: 24, description: 'Check plant health' }
      ],
      aiConfidence: 86,
      suitabilityScore: 94,
      climateCompatibility: 96,
      marketPrice: 15,
      totalCost: 45000,
      netProfit: 135000
    },
    {
      id: '3',
      crop: 'Banana',
      variety: 'Robusta (Nendran)',
      plantingDate: '2024-07-01',
      harvestDate: '2025-04-01',
      expectedYield: 15000,
      yieldUnit: 'kg/acre',
      waterRequirement: 1500,
      laborDays: 60,
      pestRiskLevel: 'high',
      profitability: 92,
      marketDemand: 'high',
      resources: {
        fertilizer: ['Banana Special (200kg)', 'Vermicompost (1 ton)'],
        pesticides: ['Bordeaux Mixture', 'Systemic Fungicide'],
        equipment: ['Drip Irrigation', 'Bunch Covering Material']
      },
      timeline: [
        { activity: 'Land Preparation', week: 1, description: 'Deep plowing and drainage' },
        { activity: 'Sucker Planting', week: 2, description: 'Plant banana suckers' },
        { activity: 'Mulching', week: 4, description: 'Apply organic mulch' },
        { activity: 'Fertilizer Application', week: 6, description: 'First dose of fertilizer' },
        { activity: 'Pest Control', week: 10, description: 'Spray for nematodes' },
        { activity: 'Bunch Development', week: 28, description: 'Support and cover bunches' },
        { activity: 'Harvest', week: 40, description: 'Cut mature bunches' }
      ],
      aiConfidence: 89,
      suitabilityScore: 91,
      climateCompatibility: 88,
      marketPrice: 35,
      totalCost: 40000,
      netProfit: 485000
    }
  ];

  const regeneratePlans = () => {
    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const togglePlanComparison = (planId: string) => {
    if (selectedPlans.includes(planId)) {
      setSelectedPlans(selectedPlans.filter(id => id !== planId));
    } else if (selectedPlans.length < 3) {
      setSelectedPlans([...selectedPlans, planId]);
    }
  };

  const getPestRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMarketDemandColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-orange-600';
    return 'text-red-600';
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
                <h1 className="text-xl font-semibold text-krishi-dark">Your AI Crop Plan</h1>
                <p className="text-sm text-krishi-muted">Get the optimal crop strategy for your farm</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setComparisonMode(!comparisonMode)}
                className="gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                {comparisonMode ? 'Exit Compare' : 'Compare Plans'}
              </Button>
              <Button
                onClick={onChatbotClick}
                className="bg-krishi-accent-orange hover:bg-orange-500 text-white gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Get Guidance
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs defaultValue="input" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="input">Farm Details</TabsTrigger>
            <TabsTrigger value="plans">AI Recommendations</TabsTrigger>
            <TabsTrigger value="comparison">Compare Plans</TabsTrigger>
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          </TabsList>

          <TabsContent value="input" className="space-y-6">
            {/* Farm Input Section */}
            <Card className="p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-krishi-dark mb-2">Tell Us About Your Farm</h3>
                  <p className="text-krishi-muted">Provide your farm details to get personalized crop recommendations</p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-krishi-dark mb-2">
                      Farm Area (acres)
                    </label>
                    <Input
                      type="number"
                      value={farmInputs.area}
                      onChange={(e) => setFarmInputs({...farmInputs, area: parseFloat(e.target.value)})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-krishi-dark mb-2">
                      Soil Type
                    </label>
                    <Select value={farmInputs.soilType} onValueChange={(value) => setFarmInputs({...farmInputs, soilType: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clay">Clay</SelectItem>
                        <SelectItem value="loam">Loam</SelectItem>
                        <SelectItem value="sandy">Sandy</SelectItem>
                        <SelectItem value="laterite">Laterite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-krishi-dark mb-2">
                      Season
                    </label>
                    <Select value={farmInputs.season} onValueChange={(value) => setFarmInputs({...farmInputs, season: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                        <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                        <SelectItem value="summer">Summer</SelectItem>
                        <SelectItem value="perennial">Perennial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-krishi-dark mb-2">
                      Water Availability
                    </label>
                    <Select value={farmInputs.waterAvailability} onValueChange={(value) => setFarmInputs({...farmInputs, waterAvailability: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="abundant">Abundant</SelectItem>
                        <SelectItem value="adequate">Adequate</SelectItem>
                        <SelectItem value="limited">Limited</SelectItem>
                        <SelectItem value="scarce">Scarce</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-krishi-dark mb-2">
                      Previous Crop
                    </label>
                    <Select value={farmInputs.previousCrop} onValueChange={(value) => setFarmInputs({...farmInputs, previousCrop: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fallow">Fallow Land</SelectItem>
                        <SelectItem value="rice">Rice</SelectItem>
                        <SelectItem value="coconut">Coconut</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="vegetables">Vegetables</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-krishi-dark mb-2">
                      Region
                    </label>
                    <Select value={farmInputs.region} onValueChange={(value) => setFarmInputs({...farmInputs, region: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kerala">Kerala</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                        <SelectItem value="andhra">Andhra Pradesh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-krishi-dark mb-2">
                      Budget: ₹{farmInputs.budget.toLocaleString()}
                    </label>
                    <Slider
                      value={[farmInputs.budget]}
                      onValueChange={(value) => setFarmInputs({...farmInputs, budget: value[0]})}
                      max={200000}
                      min={10000}
                      step={5000}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-krishi-dark mb-2">
                      Market Preference
                    </label>
                    <Select value={farmInputs.marketPreference} onValueChange={(value) => setFarmInputs({...farmInputs, marketPreference: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local Market</SelectItem>
                        <SelectItem value="export">Export Quality</SelectItem>
                        <SelectItem value="processing">Processing Industry</SelectItem>
                        <SelectItem value="organic">Organic Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={regeneratePlans}
                    disabled={isGenerating}
                    className="bg-krishi-accent-orange hover:bg-orange-500 text-white gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Generating Plans...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Generate AI Recommendations
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="plans" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-krishi-dark">AI Crop Recommendations</h3>
                <p className="text-sm text-krishi-muted">Based on your farm conditions and market analysis</p>
              </div>
              {comparisonMode && (
                <div className="text-sm text-krishi-muted">
                  Select up to 3 plans to compare ({selectedPlans.length}/3)
                </div>
              )}
            </div>

            {/* AI Crop Plan Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {cropPlans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`p-6 hover:shadow-lg transition-all ${
                    selectedPlans.includes(plan.id) ? 'ring-2 ring-krishi-accent-orange' : ''
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-krishi-dark">{plan.crop}</h4>
                        <p className="text-sm text-krishi-muted">{plan.variety}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-sm font-medium ${getConfidenceColor(plan.aiConfidence)}`}>
                            AI Confidence: {plan.aiConfidence}%
                          </span>
                        </div>
                      </div>
                      {comparisonMode && (
                        <Button
                          variant={selectedPlans.includes(plan.id) ? "default" : "outline"}
                          size="sm"
                          onClick={() => togglePlanComparison(plan.id)}
                          disabled={!selectedPlans.includes(plan.id) && selectedPlans.length >= 3}
                        >
                          {selectedPlans.includes(plan.id) ? 'Selected' : 'Select'}
                        </Button>
                      )}
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-1" />
                        <div className="text-lg font-semibold text-green-600">{plan.expectedYield.toLocaleString()}</div>
                        <div className="text-xs text-green-700">{plan.yieldUnit}</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <DollarSign className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                        <div className="text-lg font-semibold text-blue-600">₹{plan.netProfit.toLocaleString()}</div>
                        <div className="text-xs text-blue-700">Net Profit</div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-krishi-muted" />
                        <span className="text-sm font-medium text-krishi-dark">Growing Period</span>
                      </div>
                      <div className="text-sm text-krishi-muted">
                        <div>Planting: {new Date(plan.plantingDate).toLocaleDateString()}</div>
                        <div>Harvest: {new Date(plan.harvestDate).toLocaleDateString()}</div>
                      </div>
                    </div>

                    {/* Status Badges */}
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getPestRiskColor(plan.pestRiskLevel)}>
                        {plan.pestRiskLevel} pest risk
                      </Badge>
                      <Badge className={getMarketDemandColor(plan.marketDemand)}>
                        {plan.marketDemand} demand
                      </Badge>
                    </div>

                    {/* Resource Requirements */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-krishi-muted">
                          <Droplets className="w-4 h-4" />
                          Water
                        </span>
                        <span className="font-medium">{plan.waterRequirement}mm</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-krishi-muted">
                          <TrendingUp className="w-4 h-4" />
                          Labor
                        </span>
                        <span className="font-medium">{plan.laborDays} days</span>
                      </div>
                    </div>

                    {/* Suitability Score */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-krishi-muted">Suitability Score</span>
                        <span className="font-medium">{plan.suitabilityScore}%</span>
                      </div>
                      <Progress value={plan.suitabilityScore} className="h-2" />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Market Prediction Widget */}
            <Card className="p-6">
              <h4 className="font-semibold text-krishi-dark mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-krishi-accent-orange" />
                Market Predictions
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cropPlans.slice(0, 3).map((plan) => (
                  <div key={plan.id} className="text-center p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-krishi-dark">{plan.crop}</h5>
                    <div className="text-2xl font-semibold text-green-600 mt-2">₹{plan.marketPrice}</div>
                    <div className="text-sm text-krishi-muted">per kg (predicted)</div>
                    <div className="text-xs text-green-600 mt-1">↗ 5% increase expected</div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            {selectedPlans.length === 0 ? (
              <Card className="p-8 text-center">
                <BarChart3 className="w-16 h-16 text-krishi-muted mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-krishi-dark mb-2">No Plans Selected</h3>
                <p className="text-krishi-muted mb-4">Go to AI Recommendations and select 2-3 plans to compare</p>
                <Button onClick={() => document.querySelector('[value="plans"]')?.click()}>
                  Select Plans to Compare
                </Button>
              </Card>
            ) : (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-krishi-dark mb-6">Crop Plan Comparison</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4 text-sm font-medium text-krishi-dark">Criteria</th>
                        {selectedPlans.map((planId) => {
                          const plan = cropPlans.find(p => p.id === planId);
                          return (
                            <th key={planId} className="text-center py-2 px-4 text-sm font-medium text-krishi-dark">
                              {plan?.crop}
                              <div className="text-xs text-krishi-muted font-normal">{plan?.variety}</div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Expected Yield</td>
                        {selectedPlans.map((planId) => {
                          const plan = cropPlans.find(p => p.id === planId);
                          return (
                            <td key={planId} className="text-center py-3 px-4">
                              {plan?.expectedYield.toLocaleString()} {plan?.yieldUnit}
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Net Profit</td>
                        {selectedPlans.map((planId) => {
                          const plan = cropPlans.find(p => p.id === planId);
                          return (
                            <td key={planId} className="text-center py-3 px-4 text-green-600 font-semibold">
                              ₹{plan?.netProfit.toLocaleString()}
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Duration</td>
                        {selectedPlans.map((planId) => {
                          const plan = cropPlans.find(p => p.id === planId);
                          const duration = plan ? Math.ceil((new Date(plan.harvestDate).getTime() - new Date(plan.plantingDate).getTime()) / (1000 * 60 * 60 * 24 * 30)) : 0;
                          return (
                            <td key={planId} className="text-center py-3 px-4">
                              {duration} months
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Water Requirement</td>
                        {selectedPlans.map((planId) => {
                          const plan = cropPlans.find(p => p.id === planId);
                          return (
                            <td key={planId} className="text-center py-3 px-4">
                              {plan?.waterRequirement}mm
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Labor Days</td>
                        {selectedPlans.map((planId) => {
                          const plan = cropPlans.find(p => p.id === planId);
                          return (
                            <td key={planId} className="text-center py-3 px-4">
                              {plan?.laborDays} days
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Pest Risk</td>
                        {selectedPlans.map((planId) => {
                          const plan = cropPlans.find(p => p.id === planId);
                          return (
                            <td key={planId} className="text-center py-3 px-4">
                              <Badge className={getPestRiskColor(plan?.pestRiskLevel || 'low')}>
                                {plan?.pestRiskLevel}
                              </Badge>
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium">AI Confidence</td>
                        {selectedPlans.map((planId) => {
                          const plan = cropPlans.find(p => p.id === planId);
                          return (
                            <td key={planId} className="text-center py-3 px-4">
                              <span className={getConfidenceColor(plan?.aiConfidence || 0)}>
                                {plan?.aiConfidence}%
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export Comparison
                  </Button>
                  <Button onClick={onChatbotClick} className="bg-krishi-accent-orange hover:bg-orange-500 text-white gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Discuss with AI
                  </Button>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-krishi-dark mb-6">Crop Timeline & Activities</h3>
              
              {cropPlans.slice(0, 2).map((plan) => (
                <div key={plan.id} className="mb-8 last:mb-0">
                  <h4 className="font-medium text-krishi-dark mb-4 flex items-center gap-2">
                    <span className="w-3 h-3 bg-krishi-accent-orange rounded-full"></span>
                    {plan.crop} ({plan.variety})
                  </h4>
                  
                  <div className="space-y-4">
                    {plan.timeline.map((activity, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                            {activity.week}
                          </div>
                          {index < plan.timeline.length - 1 && (
                            <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <h5 className="font-medium text-krishi-dark">{activity.activity}</h5>
                          <p className="text-sm text-krishi-muted mt-1">{activity.description}</p>
                          <p className="text-xs text-blue-600 mt-1">Week {activity.week}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}