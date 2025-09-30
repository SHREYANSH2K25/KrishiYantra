import { useState } from 'react';
import { ArrowLeft, Search, MessageCircle, ThumbsUp, ChevronDown, ChevronUp, TrendingUp, Bug, Leaf, DollarSign, BookOpen, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';

interface FAQProps {
  onBack: () => void;
  onChatbotClick: () => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'crops' | 'pests' | 'ai' | 'market' | 'government';
  popularity: number;
  helpful: number;
  relatedPages?: string[];
  tags: string[];
  isPopular?: boolean;
}

export function FAQ({ onBack, onChatbotClick }: FAQProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [helpfulQuestions, setHelpfulQuestions] = useState<string[]>([]);

  const faqData: FAQItem[] = [
    {
      id: '1',
      question: 'How accurate are KrishiYantra crop recommendations?',
      answer: 'KrishiYantra uses advanced machine learning models trained on extensive agricultural data from India. Our recommendations achieve 85-92% accuracy based on local soil, climate, and market conditions. The AI considers factors like historical yield data, weather patterns, soil analysis, and current market trends to provide personalized suggestions for your specific location and farm conditions.',
      category: 'ai',
      popularity: 95,
      helpful: 234,
      relatedPages: ['AI Crop Plan', 'Chatbot'],
      tags: ['accuracy', 'recommendations', 'machine learning'],
      isPopular: true
    },
    {
      id: '2',
      question: 'What is the best time to plant rice in Kerala?',
      answer: 'In Kerala, rice planting depends on the monsoon seasons. For Kharif season, plant during May-June before monsoon arrival. For Rabi season, plant during November-December. Ensure seedbed preparation 3-4 weeks before transplanting. The ideal temperature for rice germination is 20-35°C with adequate water availability.',
      category: 'crops',
      popularity: 88,
      helpful: 156,
      relatedPages: ['Natural Remedies'],
      tags: ['rice', 'planting', 'kerala', 'season'],
      isPopular: true
    },
    {
      id: '3',
      question: 'How do I identify and treat tomato leaf curl disease?',
      answer: 'Tomato leaf curl is caused by whitefly-transmitted viruses. Symptoms include upward curling of leaves, yellowing, and stunted growth. Treatment: Use neem oil spray (5ml per liter), install yellow sticky traps for whiteflies, remove infected plants, and use reflective mulch. Apply copper-based fungicides as preventive measure.',
      category: 'pests',
      popularity: 82,
      helpful: 189,
      relatedPages: ['Pest Detection', 'Natural Remedies'],
      tags: ['tomato', 'leaf curl', 'disease', 'treatment'],
      isPopular: true
    },
    {
      id: '4',
      question: 'How can I check current market prices for my crops?',
      answer: 'Use KrishiYantra Market Hub to access real-time mandi prices across India. You can filter by crop type, location, and date range. The system provides price trends, wholesale rates, and demand forecasts. We also send price alerts for crops you\'re interested in selling.',
      category: 'market',
      popularity: 91,
      helpful: 267,
      relatedPages: ['Market Trends'],
      tags: ['market prices', 'mandi', 'selling'],
      isPopular: true
    },
    {
      id: '5',
      question: 'What government schemes are available for organic farming?',
      answer: 'Key schemes include: 1) Paramparagat Krishi Vikas Yojana (PKVY) - ₹50,000/ha for 3 years, 2) National Mission for Sustainable Agriculture (NMSA), 3) Rashtriya Krishi Vikas Yojana (RKVY). Benefits include certification support, input assistance, and market linkage. Apply through state agriculture departments or online portals.',
      category: 'government',
      popularity: 78,
      helpful: 145,
      relatedPages: ['Government Schemes'],
      tags: ['organic farming', 'subsidies', 'government schemes'],
      isPopular: false
    },
    {
      id: '6',
      question: 'Why is my AI crop plan showing low confidence score?',
      answer: 'Low confidence scores (below 75%) typically occur due to: 1) Limited historical data for your specific location, 2) Unusual weather patterns, 3) Insufficient farm information provided. To improve: Complete your farm profile, add soil test results, provide previous crop history, and update weather preferences.',
      category: 'ai',
      popularity: 65,
      helpful: 98,
      relatedPages: ['AI Crop Plan'],
      tags: ['confidence score', 'data quality', 'farm profile']
    },
    {
      id: '7',
      question: 'How do I prepare neem oil spray for pest control?',
      answer: 'Mix 5ml neem oil + 2ml liquid soap + 1 liter water. Stir well and strain. Apply during early morning or evening. Effective against aphids, whiteflies, and caterpillars. Reapply every 7-10 days. Store prepared solution in cool place and use within 8 hours for best results.',
      category: 'pests',
      popularity: 75,
      helpful: 178,
      relatedPages: ['Natural Remedies'],
      tags: ['neem oil', 'pest control', 'organic', 'spray']
    },
    {
      id: '8',
      question: 'What is the ideal soil pH for growing vegetables?',
      answer: 'Most vegetables grow best in slightly acidic to neutral soil (pH 6.0-7.0). Tomatoes prefer 6.0-6.8, leafy greens 6.0-7.0, and root vegetables 6.0-6.5. Test soil pH using digital meter or test strips. Add lime to increase pH or organic compost to lower pH gradually.',
      category: 'crops',
      popularity: 70,
      helpful: 134,
      relatedPages: ['Natural Remedies'],
      tags: ['soil pH', 'vegetables', 'soil testing']
    },
    {
      id: '9',
      question: 'How can I access PM-KISAN scheme benefits?',
      answer: 'PM-KISAN provides ₹6,000 annually in 3 installments to eligible farmers. Register online at pmkisan.gov.in with Aadhaar, land records, and bank details. Benefits are directly transferred to bank accounts. Check status using Aadhaar number on official website.',
      category: 'government',
      popularity: 89,
      helpful: 211,
      relatedPages: ['Government Schemes'],
      tags: ['PM-KISAN', 'direct benefit transfer', 'registration']
    },
    {
      id: '10',
      question: 'Which crops are most profitable for small farmers?',
      answer: 'High-value crops for small farms include: 1) Leafy vegetables (spinach, coriander) - quick returns, 2) Mushrooms - year-round production, 3) Flowers (marigold, jasmine) - local demand, 4) Herbs (mint, basil) - premium prices. Consider local market demand and transportation costs.',
      category: 'market',
      popularity: 85,
      helpful: 192,
      relatedPages: ['Market Trends', 'AI Crop Plan'],
      tags: ['profitable crops', 'small farmers', 'high value']
    },
    {
      id: '11',
      question: 'How does the pest detection feature work?',
      answer: 'Upload or capture plant images using your phone camera. Our AI analyzes the image using computer vision and identifies diseases/pests with 85%+ accuracy. Results show top 3 possible issues with confidence scores, treatment recommendations, and prevention tips. Works offline for basic detection.',
      category: 'ai',
      popularity: 73,
      helpful: 167,
      relatedPages: ['Pest Detection'],
      tags: ['pest detection', 'image analysis', 'AI diagnosis']
    },
    {
      id: '12',
      question: 'What are the best organic fertilizers for fruit trees?',
      answer: 'Effective organic fertilizers include: 1) Compost (2-3 kg per tree), 2) Vermicompost (1-2 kg), 3) Bone meal (200-300g), 4) Neem cake (500g). Apply during active growing season. For citrus, add Epsom salt for magnesium. Combine with bio-fertilizers for enhanced nutrient uptake.',
      category: 'crops',
      popularity: 68,
      helpful: 143,
      relatedPages: ['Natural Remedies'],
      tags: ['organic fertilizer', 'fruit trees', 'compost']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: BookOpen, count: faqData.length },
    { id: 'crops', name: 'Crops & Cultivation', icon: Leaf, count: faqData.filter(f => f.category === 'crops').length },
    { id: 'pests', name: 'Pests & Diseases', icon: Bug, count: faqData.filter(f => f.category === 'pests').length },
    { id: 'ai', name: 'AI Recommendations', icon: HelpCircle, count: faqData.filter(f => f.category === 'ai').length },
    { id: 'market', name: 'Market & Pricing', icon: DollarSign, count: faqData.filter(f => f.category === 'market').length },
    { id: 'government', name: 'Government Schemes', icon: TrendingUp, count: faqData.filter(f => f.category === 'government').length }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.popularity - a.popularity;
      case 'helpful':
        return b.helpful - a.helpful;
      case 'recent':
        return 0; // Mock recent sorting
      default:
        return 0;
    }
  });

  const popularFAQs = faqData.filter(faq => faq.isPopular).slice(0, 5);

  const markHelpful = (faqId: string) => {
    if (!helpfulQuestions.includes(faqId)) {
      setHelpfulQuestions([...helpfulQuestions, faqId]);
      // In real app, send to backend
    }
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
                <h1 className="text-xl font-semibold text-krishi-dark">Frequently Asked Questions</h1>
                <p className="text-sm text-krishi-muted">Find answers to common queries about crops, pests, and advisory services</p>
              </div>
            </div>
            
            <Button
              onClick={onChatbotClick}
              className="bg-krishi-accent-orange hover:bg-orange-500 text-white gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Still have questions?
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="browse">Browse FAQs</TabsTrigger>
            <TabsTrigger value="popular">Popular Questions</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filters */}
            <Card className="p-6">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-krishi-muted w-4 h-4" />
                  <Input
                    placeholder="Type your question or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Filter Chips */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="gap-2"
                    >
                      <category.icon className="w-4 h-4" />
                      {category.name}
                      <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs">
                        {category.count}
                      </span>
                    </Button>
                  ))}
                </div>

                {/* Sort Options */}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-krishi-muted">Sort by:</span>
                  <div className="flex gap-2">
                    {[
                      { value: 'popular', label: 'Most Relevant' },
                      { value: 'helpful', label: 'Most Viewed' },
                      { value: 'recent', label: 'Recent' }
                    ].map((option) => (
                      <Button
                        key={option.value}
                        variant={sortBy === option.value ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setSortBy(option.value)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Results Count */}
            <div className="text-sm text-krishi-muted">
              Found {filteredFAQs.length} questions
              {searchQuery && ` for "${searchQuery}"`}
            </div>

            {/* FAQ Accordion */}
            <Card className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border-b border-gray-100">
                    <AccordionTrigger className="text-left hover:no-underline">
                      <div className="flex items-start gap-3 w-full">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-krishi-dark">{faq.question}</h3>
                            {faq.isPopular && (
                              <Badge variant="secondary" className="text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-krishi-muted">
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              {faq.popularity}% relevance
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              {faq.helpful} found helpful
                            </span>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="space-y-4">
                        <p className="text-krishi-dark leading-relaxed">{faq.answer}</p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {faq.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Related Pages */}
                        {faq.relatedPages && faq.relatedPages.length > 0 && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-sm font-medium text-blue-800 mb-2">Related Features:</p>
                            <div className="flex flex-wrap gap-2">
                              {faq.relatedPages.map((page) => (
                                <Button key={page} variant="outline" size="sm" className="text-xs h-7">
                                  {page}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markHelpful(faq.id)}
                              disabled={helpfulQuestions.includes(faq.id)}
                              className="gap-2"
                            >
                              <ThumbsUp className={`w-4 h-4 ${helpfulQuestions.includes(faq.id) ? 'fill-green-500 text-green-500' : ''}`} />
                              {helpfulQuestions.includes(faq.id) ? 'Marked helpful' : 'Helpful?'}
                            </Button>
                          </div>
                          <Button variant="outline" size="sm" onClick={onChatbotClick}>
                            Ask follow-up
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </TabsContent>

          <TabsContent value="popular" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-krishi-dark mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-krishi-accent-orange" />
                Most Popular Questions
              </h3>
              
              <div className="space-y-4">
                {popularFAQs.map((faq, index) => (
                  <Card key={faq.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-krishi-accent-orange text-white rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-krishi-dark mb-2">{faq.question}</h4>
                        <p className="text-sm text-krishi-muted line-clamp-2">{faq.answer}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-4 text-xs text-krishi-muted">
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              {faq.popularity}% relevance
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              {faq.helpful} helpful
                            </span>
                          </div>
                          <Button variant="ghost" size="sm">
                            Read More
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.filter(cat => cat.id !== 'all').map((category) => (
                <Card key={category.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-krishi-pale-green rounded-full flex items-center justify-center mx-auto mb-4">
                      <category.icon className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-krishi-dark mb-2">{category.name}</h3>
                    <p className="text-sm text-krishi-muted mb-4">
                      {category.count} questions available
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedCategory(category.id);
                        document.querySelector('[value="browse"]')?.click();
                      }}
                      className="w-full"
                    >
                      Browse Questions
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Quick Access to Top Questions by Category */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-krishi-dark mb-6">Quick Access to Top Questions</h3>
              <div className="space-y-4">
                {categories.filter(cat => cat.id !== 'all').map((category) => {
                  const topQuestions = faqData.filter(faq => faq.category === category.id).slice(0, 2);
                  return (
                    <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-krishi-dark mb-3 flex items-center gap-2">
                        <category.icon className="w-4 h-4 text-krishi-accent-orange" />
                        {category.name}
                      </h4>
                      <div className="space-y-2">
                        {topQuestions.map((faq) => (
                          <div key={faq.id} className="text-sm">
                            <Button
                              variant="ghost"
                              className="h-auto p-2 text-left justify-start w-full"
                              onClick={() => {
                                setSelectedCategory(category.id);
                                setSearchQuery(faq.question);
                                document.querySelector('[value="browse"]')?.click();
                              }}
                            >
                              <span className="text-krishi-dark hover:text-krishi-accent-orange">
                                {faq.question}
                              </span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Still Have Questions Card */}
        <Card className="p-6 bg-gradient-to-r from-krishi-pale-green to-krishi-pale-blue border-krishi-accent-orange">
          <div className="text-center">
            <MessageCircle className="w-12 h-12 text-krishi-accent-orange mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-krishi-dark mb-2">Still have a question?</h3>
            <p className="text-krishi-muted mb-4">
              Can't find what you're looking for? Our AI assistant is here to help with personalized answers.
            </p>
            <Button
              onClick={onChatbotClick}
              className="bg-krishi-accent-orange hover:bg-orange-500 text-white gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Ask AI Assistant
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}