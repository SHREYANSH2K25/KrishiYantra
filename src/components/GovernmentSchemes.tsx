import { Building2, Users, Banknote, Leaf, Tractor, Shield } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';

const schemes = [
  {
    id: 1,
    name: "PM-KISAN",
    description: "Direct income support to all farmer families",
    amount: "₹6,000/year",
    eligibility: "All farmer families",
    status: "Active",
    icon: Banknote,
    color: "green"
  },
  {
    id: 2,
    name: "Soil Health Card",
    description: "Free soil testing and nutrient management",
    amount: "Free",
    eligibility: "All farmers",
    status: "Available",
    icon: Leaf,
    color: "blue"
  },
  {
    id: 3,
    name: "Kisan Credit Card",
    description: "Credit support for agriculture and allied activities",
    amount: "Up to ₹3 lakh",
    eligibility: "Landowners & tenants",
    status: "Apply Now",
    icon: Shield,
    color: "orange"
  },
  {
    id: 4,
    name: "Farm Mechanization",
    description: "Subsidy on agricultural equipment",
    amount: "25-50% subsidy",
    eligibility: "Small & marginal farmers",
    status: "Seasonal",
    icon: Tractor,
    color: "green"
  }
];

const recommendedSchemes = [
  {
    title: "Based on your profile",
    schemes: ["PM-KISAN", "Soil Health Card"],
    savings: "₹12,000+ annually"
  },
  {
    title: "Trending in your area",
    schemes: ["Kisan Credit Card", "Farm Mechanization"],
    savings: "₹50,000+ savings"
  }
];

export function GovernmentSchemes() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-krishi-dark mb-4">
            Schemes & Policy Advisor
          </h2>
          <p className="text-2xl text-krishi-dark mb-2">
            Never Miss a Subsidy or Support.
          </p>
          <p className="text-lg text-krishi-muted max-w-2xl mx-auto">
            Stay updated with government schemes, subsidies, and policies. Get personalized recommendations based on your farm profile.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Recommended schemes */}
          <div className="lg:col-span-2">
            {/* Recommended for you section */}
            <div className="mb-8">
              <h3 className="font-semibold text-krishi-dark mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-krishi-accent-orange" />
                Recommended for You
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedSchemes.map((rec, index) => (
                  <div key={index} className="bg-gradient-to-r from-krishi-pale-blue to-krishi-pale-green p-6 rounded-2xl border border-gray-100">
                    <h4 className="font-medium text-krishi-dark mb-2">{rec.title}</h4>
                    <div className="space-y-2 mb-3">
                      {rec.schemes.map((scheme, idx) => (
                        <Badge key={idx} variant="secondary" className="mr-2 mb-1">
                          {scheme}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm font-medium text-green-600">{rec.savings}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* All schemes grid */}
            <div>
              <h3 className="font-semibold text-krishi-dark mb-6 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-krishi-accent-orange" />
                Available Schemes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {schemes.map((scheme) => {
                  const Icon = scheme.icon;
                  const bgColor = scheme.color === 'green' ? 'bg-green-100' : 
                                 scheme.color === 'blue' ? 'bg-blue-100' : 'bg-orange-100';
                  const iconColor = scheme.color === 'green' ? 'text-green-600' : 
                                   scheme.color === 'blue' ? 'text-blue-600' : 'text-orange-600';
                  
                  return (
                    <div key={scheme.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center shadow-sm`}>
                          <Icon className={`w-6 h-6 ${iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-krishi-dark">{scheme.name}</h4>
                            <Badge 
                              variant={scheme.status === 'Active' ? 'default' : scheme.status === 'Apply Now' ? 'destructive' : 'secondary'}
                              className="text-xs"
                            >
                              {scheme.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-krishi-muted mb-3">{scheme.description}</p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-krishi-muted">Benefit:</span>
                              <span className="font-medium text-krishi-dark">{scheme.amount}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-krishi-muted">Eligibility:</span>
                              <span className="font-medium text-krishi-dark">{scheme.eligibility}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right side - Benefits & Image */}
          <div className="space-y-6">
            {/* Benefits card */}
            <div className="bg-krishi-pale-green p-6 rounded-2xl border border-gray-100">
              <h4 className="font-semibold text-krishi-dark mb-4">Why Use Our Scheme Advisor?</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                  <span className="text-sm text-krishi-muted">Personalized recommendations based on your farm size and crops</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                  <span className="text-sm text-krishi-muted">Real-time updates on new schemes and deadlines</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                  <span className="text-sm text-krishi-muted">Step-by-step application guidance in your language</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                  <span className="text-sm text-krishi-muted">Track application status and receive notifications</span>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1712599799786-9b2a7538f6a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBhZ3JpY3VsdHVyZSUyMHNjaGVtZXxlbnwxfHx8fDE3NTkxNTkzNTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Government building representing agricultural schemes and policies"
                className="w-full rounded-2xl shadow-lg"
              />
              {/* Floating notification */}
              <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <div className="text-xs">
                    <div className="font-medium">New Scheme Alert!</div>
                    <div className="text-krishi-muted">PM-Kisan payment ₹2,000</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="font-semibold text-krishi-dark mb-4 text-center">Success Stories</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-semibold text-krishi-accent-orange">₹2.3L+</div>
                  <div className="text-xs text-krishi-muted">Average savings per farmer</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-krishi-accent-orange">95%</div>
                  <div className="text-xs text-krishi-muted">Successful applications</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}