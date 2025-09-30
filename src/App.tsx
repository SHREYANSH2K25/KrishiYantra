import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { WeatherSoilInsights } from './components/WeatherSoilInsights';
import { GovernmentSchemes } from './components/GovernmentSchemes';
import { HowItWorks } from './components/HowItWorks';
import { Demo } from './components/Demo';
import { TrustPartners } from './components/TrustPartners';
import { Footer } from './components/Footer';
import { MarketTrends } from './components/MarketTrends';
import { PestDetection } from './components/PestDetection';
import { ChatBot } from './components/ChatBot';
import { NaturalRemedies } from './components/NaturalRemedies';
import { AICropPlan } from './components/AICropPlan';
import { FAQ } from './components/FAQ';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isNavigating, setIsNavigating] = useState(false);

  // Initialize page based on current hash
  useEffect(() => {
    const getPageFromHash = () => {
      const hash = window.location.hash.slice(1); // Remove the '#'
      switch (hash) {
        case 'market':
          return 'market';
        case 'pest':
          return 'pest';
        case 'chatbot':
          return 'chatbot';
        case 'remedies':
          return 'remedies';
        case 'cropplan':
          return 'cropplan';
        case 'faq':
          return 'faq';
        default:
          return 'home';
      }
    };

    setCurrentPage(getPageFromHash());

    // Listen for hash changes (back/forward browser navigation)
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update document title and meta description based on current page
  useEffect(() => {
    const pageData = {
      home: {
        title: 'KrishiYantra - The Digital Krishi Officer',
        description:
          'AI-powered farming assistance with localized agricultural advice via voice, text, and image inputs',
      },
      market: {
        title: 'Market Trends & Insights - KrishiYantra',
        description:
          'Real-time crop prices, market trends, and agricultural policy insights for Indian farmers',
      },
      pest: {
        title: 'Pest & Disease Detection - KrishiYantra',
        description:
          'AI-powered crop disease detection and treatment recommendations using image analysis',
      },
      chatbot: {
        title: 'Smart Farm Assistant - KrishiYantra',
        description:
          'Multilingual AI chatbot for crop advisory, farming tips, and agricultural guidance',
      },
      remedies: {
        title: 'Natural Remedies - KrishiYantra',
        description:
          'Eco-friendly pest control and soil health solutions for sustainable farming',
      },
      cropplan: {
        title: 'AI Crop Planning - KrishiYantra',
        description:
          'Personalized crop recommendations and planning with AI-powered insights',
      },
      faq: {
        title: 'FAQ - KrishiYantra',
        description:
          'Frequently asked questions about farming, pest control, and agricultural advice',
      },
    };

    const { title, description } = pageData[currentPage];
    document.title = title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
  }, [currentPage]);

  const navigateToMarket = () => {
    setIsNavigating(true);
    window.location.hash = 'market';
    setCurrentPage('market');
    setTimeout(() => setIsNavigating(false), 100);
  };

  const navigateToPest = () => {
    setIsNavigating(true);
    window.location.hash = 'pest';
    setCurrentPage('pest');
    setTimeout(() => setIsNavigating(false), 100);
  };

  const navigateToChatbot = () => {
    setIsNavigating(true);
    window.location.hash = 'chatbot';
    setCurrentPage('chatbot');
    setTimeout(() => setIsNavigating(false), 100);
  };

  const navigateToRemedies = () => {
    setIsNavigating(true);
    window.location.hash = 'remedies';
    setCurrentPage('remedies');
    setTimeout(() => setIsNavigating(false), 100);
  };

  const navigateToCropPlan = () => {
    setIsNavigating(true);
    window.location.hash = 'cropplan';
    setCurrentPage('cropplan');
    setTimeout(() => setIsNavigating(false), 100);
  };

  const navigateToFAQ = () => {
    setIsNavigating(true);
    window.location.hash = 'faq';
    setCurrentPage('faq');
    setTimeout(() => setIsNavigating(false), 100);
  };

  const navigateToHome = () => {
    setIsNavigating(true);
    window.location.hash = '';
    setCurrentPage('home');
    setTimeout(() => setIsNavigating(false), 100);
  };

  // Simple loading state during navigation
  if (isNavigating) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-krishi-accent-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-krishi-muted">Loading...</p>
        </div>
      </div>
    );
  }

  if (currentPage === 'market') {
    return <MarketTrends onBack={navigateToHome} />;
  }

  if (currentPage === 'pest') {
    return <PestDetection onBack={navigateToHome} />;
  }

  if (currentPage === 'chatbot') {
    return <ChatBot onBack={navigateToHome} />;
  }

  if (currentPage === 'remedies') {
    return (
      <NaturalRemedies onBack={navigateToHome} onChatbotClick={navigateToChatbot} />
    );
  }

  if (currentPage === 'cropplan') {
    return <AICropPlan onBack={navigateToHome} onChatbotClick={navigateToChatbot} />;
  }

  if (currentPage === 'faq') {
    return <FAQ onBack={navigateToHome} onChatbotClick={navigateToChatbot} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onFAQClick={navigateToFAQ} />
      <main>
        <Hero />
        <Features
          onMarketClick={navigateToMarket}
          onPestClick={navigateToPest}
          onChatbotClick={navigateToChatbot}
          onRemediesClick={navigateToRemedies}
          onCropPlanClick={navigateToCropPlan}
        />
        <WeatherSoilInsights />
        <GovernmentSchemes />
        <HowItWorks />
        <Demo />
        <TrustPartners />
      </main>
      <Footer />
    </div>
  );
}
