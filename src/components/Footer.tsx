import { Phone, Mail, MessageCircle, Youtube } from 'lucide-react';
import logo from 'figma:asset/2644abc33363504825e93a1890345505e0903dcb.png';

export function Footer() {
  return (
    <footer className="bg-krishi-dark text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="KrishiYantra Logo" className="w-12 h-12 object-contain" />
              <span className="text-xl font-semibold">KrishiYantra</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your Digital Krishi Officer - Empowering farmers with AI-driven agricultural insights and advice.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it works</a></li>
              <li><a href="#demo" className="text-gray-300 hover:text-white transition-colors">Demo</a></li>
              <li><a href="#partners" className="text-gray-300 hover:text-white transition-colors">Data sources</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">support@krishiyantra.com</span>
              </div>
              
              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-2">
                <a href="#" className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2024 KrishiYantra. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Designed for accessibility • WCAG 2.1 AA compliant
          </p>
        </div>
      </div>
    </footer>
  );
}