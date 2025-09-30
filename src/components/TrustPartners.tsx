export function TrustPartners() {
  const partners = [
    { name: 'ICAR', logo: '🌾' },
    { name: 'KVK', logo: '🎓' },
    { name: 'Agmarknet', logo: '📊' },
    { name: 'eNAM', logo: '🛒' },
    { name: 'OpenWeatherMap', logo: '🌤️' }
  ];

  return (
    <section className="py-12 px-4 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-krishi-muted mb-6">
            Data sources: OpenWeatherMap • Agmarknet • ICAR/KVK
          </p>
          <h3 className="text-lg font-semibold text-krishi-dark mb-6">
            Trusted data sources & partners
          </h3>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
              <span className="text-2xl">{partner.logo}</span>
              <span className="font-medium text-krishi-dark">{partner.name}</span>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-700">Real-time data integration</span>
          </div>
        </div>
      </div>
    </section>
  );
}