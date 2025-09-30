import { Button } from './ui/button';
import { SearchBar } from './SearchBar';
import { QuickStats } from './QuickStats';
import { DeviceMockup } from './DeviceMockup';

export function Hero() {
  return (
    <section className="relative py-16 px-4 bg-gradient-to-br from-krishi-pale-green/50 to-krishi-pale-blue/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-semibold text-krishi-dark leading-tight">
                Your Digital{' '}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Krishi Officer
                </span>
              </h1>
              
              <p className="text-xl text-krishi-muted leading-relaxed max-w-xl">
                Instant, localized farm advice via voice, text or image.
              </p>
            </div>
            
            {/* Search Bar */}
            <SearchBar />

            {/* CTAs + Quick Stats grouped together */}
            <div className="flex flex-col items-center lg:items-start ">
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-krishi-accent-orange hover:bg-orange-500 text-white px-8 py-3 rounded-full font-medium text-lg">
                  Ask KrishiYantra
                </Button>
                <Button variant="outline" className="border-2 border-krishi-dark text-krishi-dark hover:bg-krishi-dark hover:text-white px-8 py-3 rounded-full font-medium text-lg">
                  Get Crop Plan
                </Button>
              </div>

              {/* Quick Stats (Yields & Costs) */}
              <QuickStats />
            </div>
          </div>
          
          {/* Right Content - Device Mockup */}
          <div className="flex justify-center lg:justify-end">
            <DeviceMockup />
          </div>
        </div>
      </div>
      
      {/* Background Decorations */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-green-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
    </section>
  );
}
