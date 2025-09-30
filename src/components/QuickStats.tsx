import { TrendingUp, TrendingDown, Clock } from 'lucide-react';

export function QuickStats() {
  const stats = [
    {
      icon: TrendingUp,
      text: "Yield ↑ 20–30%",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      icon: TrendingDown,
      text: "Costs ↓ 10–25%", 
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: Clock,
      text: "24/7 Local Language Support",
      bgColor: "bg-orange-50", 
      iconColor: "text-orange-600"
    }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${stat.bgColor} border shadow-sm`}
        >
          <div className={`w-5 h-5 rounded-full ${stat.bgColor} flex items-center justify-center`}>
            <svg className={`w-3 h-3 ${stat.iconColor}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm font-medium text-krishi-dark">{stat.text}</span>
        </div>
      ))}
    </div>
  );
}