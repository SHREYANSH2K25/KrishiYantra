import { useState } from 'react';
import { ChevronDown, Sun, Moon, Globe, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import logo from 'figma:asset/2644abc33363504825e93a1890345505e0903dcb.png';

interface HeaderProps {
  onFAQClick?: () => void;
}

export function Header({ onFAQClick }: HeaderProps) {
  const [currentLanguage, setCurrentLanguage] = useState('ML');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const languages = [
    { code: 'EN', name: 'English', sample: 'Your Digital Krishi Officer' },
    { code: 'HI', name: 'हिंदी', sample: 'आपका डिजिटल कृषि अधिकारी' },
    { code: 'ML', name: 'മലയാളം', sample: 'നിങ്ങളുടെ ഡിജിറ്റൽ കൃഷി ഓഫീസർ' }
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="KrishiYantra Logo" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="text-xl font-semibold text-krishi-dark">KrishiYantra</h1>
              <p className="text-xs text-krishi-muted">Digital Krishi Officer</p>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Globe className="w-4 h-4" />
                  {currentLanguage}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setCurrentLanguage(lang.code)}
                    className="flex flex-col items-start gap-1 p-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{lang.code}</span>
                      <span className="text-sm text-krishi-muted">{lang.name}</span>
                    </div>
                    <span className={`text-xs ${lang.code === 'ML' ? 'malayalam' : ''} text-krishi-muted`}>
                      {lang.sample}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="w-10 h-10 p-0"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            {/* FAQ Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onFAQClick}
              className="gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              FAQ
            </Button>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                Demo
              </Button>
              <Button size="sm" className="bg-krishi-accent-orange hover:bg-orange-500 text-white">
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}