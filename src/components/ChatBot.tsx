import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Mic, MicOff, Download, Share2, History, HelpCircle, Volume2, Globe, User, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';

interface ChatBotProps {
  onBack: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  language: string;
  actionCards?: ActionCard[];
}

interface ActionCard {
  title: string;
  description: string;
  feasibility: 'easy' | 'moderate' | 'expert';
  icon: string;
  dosage?: string;
}

interface SuggestedQuery {
  text: string;
  category: string;
}

export function ChatBot({ onBack }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your Smart Farm Assistant. Ask me anything about farming, crops, or agriculture in Hindi, English, or Malayalam.',
      timestamp: new Date(),
      language: 'english'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState<'english' | 'hindi' | 'malayalam'>('english');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock conversation history
  const conversationHistory = [
    { id: 'conv1', title: 'Rice cultivation tips', date: '2024-01-15', preview: 'Best time to sow rice...' },
    { id: 'conv2', title: 'Tomato disease treatment', date: '2024-01-14', preview: 'How to treat leaf curl...' },
    { id: 'conv3', title: 'Fertilizer recommendations', date: '2024-01-13', preview: 'Organic vs chemical...' }
  ];

  const languages = {
    english: { name: 'English', code: 'EN' },
    hindi: { name: 'हिंदी', code: 'HI' },
    malayalam: { name: 'മലയാളം', code: 'ML' }
  };

  const suggestedQueries: Record<string, SuggestedQuery[]> = {
    english: [
      { text: 'Best time to sow rice?', category: 'planting' },
      { text: 'How to treat leaf rust?', category: 'disease' },
      { text: 'Organic fertilizer recommendations', category: 'fertilizer' },
      { text: 'Current wheat prices', category: 'market' },
      { text: 'Irrigation schedule for tomatoes', category: 'irrigation' }
    ],
    hindi: [
      { text: 'धान बोने का सबसे अच्छा समय?', category: 'planting' },
      { text: 'पत्ती के जंग का इलाज कैसे करें?', category: 'disease' },
      { text: 'जैविक खाद की सिफारिशें', category: 'fertilizer' },
      { text: 'गेहूं की वर्तमान कीमतें', category: 'market' }
    ],
    malayalam: [
      { text: 'നെല്ല് വിതയ്ക്കാൻ ഏറ്റവും നല്ല സമയം?', category: 'planting' },
      { text: 'ഇല തുരുമ്പ് എങ്ങനെ ചികിത്സിക്കാം?', category: 'disease' },
      { text: 'ജൈവിക വളത്തിന്റെ ശുപാർശകൾ', category: 'fertilizer' },
      { text: 'ഗോതമ്പിന്റെ നിലവിലെ വില', category: 'market' }
    ]
  };

  const placeholders = {
    english: 'Type your question here...',
    hindi: 'अपना प्रश्न यहाँ लिखें...',
    malayalam: 'നിങ്ങളുടെ ചോദ്യം ഇവിടെ ടൈപ്പ് ചെയ്യുക...'
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mock AI response generator
  const generateAIResponse = (userMessage: string): Message => {
    const mockActionCards: ActionCard[] = [
      {
        title: 'Neem Oil Spray',
        description: 'Natural pest control solution',
        feasibility: 'easy',
        icon: '🌿',
        dosage: '5ml per liter of water'
      },
      {
        title: 'Copper Fungicide',
        description: 'Effective against fungal diseases',
        feasibility: 'moderate',
        icon: '⚗️',
        dosage: '2-3ml per liter'
      }
    ];

    const responses = [
      'Based on your question about rice cultivation, the best time to sow rice is during the monsoon season (June-July). Ensure proper field preparation and seed treatment before sowing.',
      'For leaf rust treatment, I recommend using copper-based fungicides. Apply early in the morning and ensure good air circulation around plants.',
      'Organic fertilizers like compost, vermicompost, and neem cake are excellent for soil health. Apply 2-3 kg per plant during the growing season.',
    ];

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date(),
      language: currentLanguage,
      actionCards: Math.random() > 0.5 ? mockActionCards : undefined
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      language: currentLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Mock voice input - in real app, implement speech recognition
    if (!isListening) {
      setTimeout(() => {
        setInputMessage('How to treat tomato leaf curl disease?');
        setIsListening(false);
      }, 2000);
    }
  };

  const handleSuggestedQuery = (query: string) => {
    setInputMessage(query);
    inputRef.current?.focus();
  };

  const speakMessage = (message: string) => {
    // Mock text-to-speech - in real app, implement Web Speech API
    console.log('Speaking:', message);
  };

  const downloadConversation = () => {
    // Mock download functionality
    console.log('Downloading conversation as PDF...');
  };

  const shareConversation = () => {
    // Mock share functionality
    console.log('Sharing conversation...');
  };

  const getFeasibilityColor = (feasibility: ActionCard['feasibility']) => {
    switch (feasibility) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-krishi-pale-green to-krishi-pale-blue">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Back button and title */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-krishi-dark">Smart Farm Assistant</h1>
                <p className="text-sm text-krishi-muted">Ask your questions in English, Hindi, or Malayalam</p>
              </div>
            </div>

            {/* Right side - Controls */}
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Globe className="w-4 h-4" />
                    {languages[currentLanguage].code}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {Object.entries(languages).map(([key, lang]) => (
                    <DropdownMenuItem
                      key={key}
                      onClick={() => setCurrentLanguage(key as typeof currentLanguage)}
                      className={key === currentLanguage ? 'bg-krishi-pale-green' : ''}
                    >
                      <span className="font-medium">{lang.code}</span>
                      <span className="ml-2 text-krishi-muted">{lang.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Help */}
              <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                <HelpCircle className="w-4 h-4" />
              </Button>

              {/* User Profile */}
              <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-6">
            {/* Chat Interface */}
            <Card className="h-[60vh] flex flex-col">
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.type === 'user'
                            ? 'bg-blue-500 text-white ml-4'
                            : 'bg-white border border-gray-200 mr-4'
                        }`}
                      >
                        <p className={`${message.type === 'user' ? 'text-white' : 'text-krishi-dark'}`}>
                          {message.content}
                        </p>
                        
                        {/* AI Action Cards */}
                        {message.actionCards && (
                          <div className="mt-3 space-y-2">
                            {message.actionCards.map((card, index) => (
                              <div
                                key={index}
                                className="bg-gray-50 rounded-lg p-3 border"
                              >
                                <div className="flex items-start gap-3">
                                  <span className="text-2xl">{card.icon}</span>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-medium text-sm">{card.title}</h4>
                                      <Badge className={`text-xs ${getFeasibilityColor(card.feasibility)}`}>
                                        {card.feasibility}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-krishi-muted mb-1">{card.description}</p>
                                    {card.dosage && (
                                      <p className="text-xs font-medium text-krishi-dark">{card.dosage}</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Message Actions for AI responses */}
                        {message.type === 'ai' && (
                          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => speakMessage(message.content)}
                              className="h-6 px-2 text-xs"
                            >
                              <Volume2 className="w-3 h-3" />
                            </Button>
                            <span className="text-xs text-krishi-muted">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 mr-4">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-krishi-muted rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-krishi-muted rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-krishi-muted rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                          <span className="text-sm text-krishi-muted">AI is typing...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 relative">
                    <Input
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={placeholders[currentLanguage]}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="pr-24"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleVoiceInput}
                        className={`w-8 h-8 p-0 ${isListening ? 'text-red-500' : 'text-krishi-muted'}`}
                      >
                        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-krishi-accent-orange hover:bg-orange-500 text-white w-10 h-10 p-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={downloadConversation}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" onClick={shareConversation}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </Card>

            {/* Suggested Queries */}
            <Card className="p-4">
              <h3 className="font-medium text-krishi-dark mb-3">Quick Questions</h3>
              <div className="flex flex-wrap gap-2">
                {suggestedQueries[currentLanguage].map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestedQuery(query.text)}
                    className="text-xs h-8"
                  >
                    {query.text}
                  </Button>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-krishi-muted" />
                <h3 className="font-medium text-krishi-dark">Conversation History</h3>
              </div>
              <div className="space-y-3">
                {conversationHistory.map((conv) => (
                  <div
                    key={conv.id}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-krishi-dark">{conv.title}</h4>
                        <p className="text-xs text-krishi-muted mt-1">{conv.preview}</p>
                      </div>
                      <span className="text-xs text-krishi-muted">{conv.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Voice Input Overlay */}
      {isListening && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mic className="w-8 h-8 text-red-500 animate-pulse" />
            </div>
            <h3 className="font-medium text-krishi-dark mb-2">Listening...</h3>
            <p className="text-sm text-krishi-muted mb-4">Speak your question in {languages[currentLanguage].name}</p>
            <Button variant="outline" onClick={() => setIsListening(false)}>
              Stop Listening
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}