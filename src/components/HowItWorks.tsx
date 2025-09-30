import { MessageSquare, MapPin, Brain, Target, ArrowRight } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: MessageSquare,
      title: "Ask",
      subtitle: "Voice/Text/Image",
      description: "Ask in your language",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: MapPin,
      title: "Context", 
      subtitle: "System adds location",
      description: "crop, soil & season",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Brain,
      title: "Answer",
      subtitle: "LLM + Rules",
      description: "Actionable steps & Crop Plan",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Target,
      title: "Act & Feedback",
      subtitle: "Farmer records outcome",
      description: "system learns",
      color: "bg-krishi-accent-orange/20 text-orange-600"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-krishi-dark mb-4">
            How It Works
          </h2>
          <p className="text-lg text-krishi-muted">
            Simple 4-step process to get personalized farming advice
          </p>
        </div>
        
        {/* Desktop View */}
        <div className="hidden md:flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="text-center">
                <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mx-auto mb-4`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border max-w-48">
                  <h3 className="font-semibold text-krishi-dark mb-1">{step.title}</h3>
                  <p className="text-sm text-krishi-muted mb-2">{step.subtitle}</p>
                  <p className="text-xs text-gray-600">{step.description}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex items-center mx-6">
                  {index === steps.length - 2 ? (
                    // Curved feedback arrow for last connection
                    <div className="relative">
                      <ArrowRight className="w-8 h-8 text-krishi-accent-orange" />
                      <div className="absolute -top-8 left-8 text-xs text-krishi-accent-orange transform rotate-180">
                        ↺
                      </div>
                    </div>
                  ) : (
                    <ArrowRight className="w-8 h-8 text-gray-400" />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Mobile View */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => (
            <div key={index}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center flex-shrink-0`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border flex-1">
                  <h3 className="font-semibold text-krishi-dark mb-1">{step.title}</h3>
                  <p className="text-sm text-krishi-muted mb-2">{step.subtitle}</p>
                  <p className="text-xs text-gray-600">{step.description}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex justify-center my-4">
                  <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-90" />
                </div>
              )}
            </div>
          ))}
          
          {/* Feedback Loop */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2 text-krishi-accent-orange bg-orange-50 px-4 py-2 rounded-full border border-orange-200">
              <span className="text-sm font-medium">Continuous Learning Loop</span>
              <span className="text-lg">↺</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}