import { useState, useRef } from 'react';
import { Camera, Upload, X, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isAnalyzing: boolean;
  selectedImage?: string;
  onClearImage: () => void;
}

export function ImageUpload({ onImageUpload, isAnalyzing, selectedImage, onClearImage }: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      onImageUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageUpload(files[0]);
    }
  };

  if (selectedImage) {
    return (
      <Card className="relative">
        <CardContent className="p-0">
          <div className="relative">
            <ImageWithFallback
              src={selectedImage}
              alt="Selected crop image for analysis"
              className="w-full h-64 object-cover rounded-lg"
            />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <div className="text-center text-white">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                  <p>Analyzing image...</p>
                  <p className="text-sm opacity-80">This may take a few seconds</p>
                </div>
              </div>
            )}
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={onClearImage}
              disabled={isAnalyzing}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Step-by-step instructions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-krishi-pale-green rounded-lg">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-green-600 font-semibold">1</span>
          </div>
          <h4 className="font-medium text-krishi-dark mb-1">Choose Crop</h4>
          <p className="text-sm text-krishi-muted">Select affected plant part</p>
        </div>
        <div className="text-center p-4 bg-krishi-pale-blue rounded-lg">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-blue-600 font-semibold">2</span>
          </div>
          <h4 className="font-medium text-krishi-dark mb-1">Take Clear Photo</h4>
          <p className="text-sm text-krishi-muted">Ensure good lighting</p>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-orange-600 font-semibold">3</span>
          </div>
          <h4 className="font-medium text-krishi-dark mb-1">Get Results</h4>
          <p className="text-sm text-krishi-muted">Instant AI analysis</p>
        </div>
      </div>

      {/* Upload area */}
      <Card 
        className={`transition-all duration-200 ${
          isDragOver ? 'border-krishi-accent-orange border-2 bg-orange-50' : 'border-dashed border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-krishi-pale-green rounded-full flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8 text-green-600" />
            </div>
            
            <div>
              <h3 className="font-semibold text-krishi-dark mb-2">Upload Crop Image</h3>
              <p className="text-sm text-krishi-muted mb-4">
                Drag and drop an image here, or click to browse
              </p>
              <p className="text-xs text-gray-500">
                💡 Tip: Make sure the leaf or affected area is clearly visible
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Browse Files
              </Button>
              <Button
                onClick={() => cameraInputRef.current?.click()}
                className="flex items-center gap-2 bg-krishi-accent-orange hover:bg-orange-400"
              >
                <Camera className="w-4 h-4" />
                Take Photo
              </Button>
            </div>

            <p className="text-xs text-gray-500">
              Supports JPG, PNG, WEBP up to 10MB
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}