import { useState } from 'react';
import { Search, Mic, Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function SearchBar() {
  const [isRecording, setIsRecording] = useState(false);

  const handleVoiceClick = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
  };

  const handleCameraClick = () => {
    // Image upload logic would go here
    console.log('Camera clicked');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative">
        <div className="relative flex items-center bg-white border-2 border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
          {/* Search Icon */}
          <div className="pl-6 pr-3">
            <Search className="w-6 h-6 text-krishi-muted" />
          </div>
          
          {/* Input Field */}
          <Input
            type="text"
            placeholder="Ask in Malayalam — e.g., 'Which pesticide for leaf spot in my banana?'"
            className="flex-1 border-0 bg-transparent text-lg py-4 px-0 placeholder:text-krishi-muted focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          
          {/* Action Icons */}
          <div className="flex items-center gap-2 pr-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVoiceClick}
              className={`w-10 h-10 rounded-full p-0 hover:bg-krishi-pale-green transition-colors ${
                isRecording ? 'bg-red-100 text-red-600' : 'text-krishi-muted hover:text-krishi-dark'
              }`}
            >
              <Mic className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCameraClick}
              className="w-10 h-10 rounded-full p-0 text-krishi-muted hover:text-krishi-dark hover:bg-krishi-pale-blue transition-colors"
            >
              <Camera className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Microcopy */}
      <p className="text-center text-sm text-krishi-muted mt-3">
        Speak, type, or upload a photo — get actionable advice.
      </p>
    </div>
  );
}