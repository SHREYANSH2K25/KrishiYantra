import { Brain, Bug, CalendarCheck, Leaf, TrendingUp, Mic } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

interface FeaturesProps {
  onMarketClick?: () => void;
  onPestClick?: () => void;
  onChatbotClick?: () => void;
  onRemediesClick?: () => void;
  onCropPlanClick?: () => void;
}

export function Features({ onMarketClick, onPestClick, onChatbotClick, onRemediesClick, onCropPlanClick }: FeaturesProps) {
  const features = [
    {
      icon: Brain,
      title: "Intelligent Query Engine",
      description: "LLM-powered answers for voice, text, and images with context.",
      bgColor: 'green' as const
    },
    {
      icon: Bug,
      title: "On-device Pest Detection", 
      description: "TFLite CNN: offline top-3 disease diagnosis + IPM steps.",
      bgColor: 'blue' as const
    },
    {
      icon: CalendarCheck,
      title: "AI Crop Plan Card",
      description: "Auto daily plan: sowing, irrigation, fertilizer & pest checks.",
      bgColor: 'green' as const
    },
    {
      icon: Leaf,
      title: "Natural Remedies",
      description: "Eco-friendly inputs & organic remedies to cut input cost.",
      bgColor: 'blue' as const
    },
    {
      icon: TrendingUp,
      title: "Market & Policy Hub",
      description: "Live mandi prices, loan & subsidy alerts personalized to you.",
      bgColor: 'green' as const
    },
    {
      icon: Mic,
      title: "Multilingual Voice & Chatbot",
      description: "Conversational UI for low-literacy users.",
      bgColor: 'blue' as const
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-krishi-dark mb-4">
            Everything You Need for Smart Farming
          </h2>
          <p className="text-lg text-krishi-muted max-w-2xl mx-auto">
            Advanced AI tools designed specifically for Indian farmers, available in your local language.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const getClickHandler = () => {
              if (feature.title === "Market & Policy Hub") return onMarketClick;
              if (feature.title === "On-device Pest Detection") return onPestClick;
              if (feature.title === "Multilingual Voice & Chatbot") return onChatbotClick;
              if (feature.title === "Natural Remedies") return onRemediesClick;
              if (feature.title === "AI Crop Plan Card") return onCropPlanClick;
              return undefined;
            };
            
            const isClickable = feature.title === "Market & Policy Hub" || feature.title === "On-device Pest Detection" || feature.title === "Multilingual Voice & Chatbot" || feature.title === "Natural Remedies" || feature.title === "AI Crop Plan Card";
            
            return (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                bgColor={feature.bgColor}
                onClick={getClickHandler()}
                isClickable={isClickable}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}