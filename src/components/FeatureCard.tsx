import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  bgColor: 'green' | 'blue';
  onClick?: () => void;
  isClickable?: boolean;
}

export function FeatureCard({ icon: Icon, title, description, bgColor, onClick, isClickable }: FeatureCardProps) {
  const bgClass = bgColor === 'green' ? 'bg-krishi-pale-green' : 'bg-krishi-pale-blue';
  const iconColorClass = bgColor === 'green' ? 'text-green-600' : 'text-blue-600';

  return (
    <div 
      className={`${bgClass} p-6 rounded-2xl shadow-sm hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 ${isClickable ? 'cursor-pointer' : 'cursor-default'} border border-gray-100 ${isClickable ? 'hover:border-krishi-accent-orange' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm`}>
          <Icon className={`w-6 h-6 ${iconColorClass}`} />
        </div>
        <div className="flex-1">
          <h3 className={`font-semibold text-krishi-dark mb-2 ${isClickable ? 'flex items-center gap-2' : ''}`}>
            {title}
            {isClickable && <span className="text-krishi-accent-orange">→</span>}
          </h3>
          <p className="text-sm text-krishi-muted leading-relaxed">{description}</p>
          {isClickable && (
            <p className="text-xs text-krishi-accent-orange mt-2 font-medium">
              {title === "Market & Policy Hub" && "Click to explore market trends"}
              {title === "On-device Pest Detection" && "Click to detect crop diseases"}
              {title === "Multilingual Voice & Chatbot" && "Click to start chatting"}
              {title === "Natural Remedies" && "Click for eco-friendly solutions"}
              {title === "AI Crop Plan Card" && "Click for smart crop planning"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}