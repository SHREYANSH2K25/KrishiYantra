import { useState } from 'react';
import { Play, Mic, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

export function Demo() {
  const [isRecording, setIsRecording] = useState(false);

  const chatMessages = [
    {
      type: 'user',
      text: 'വാഴയിലെ ഇല പുള്ളി രോഗത്തിന് എന്ത് മരുന്ന്?',
      isMalayalam: true
    },
    {
      type: 'ai',
      text: 'Leaf spot disease detected in banana. Apply copper-based fungicide spray (Copper Oxychloride 50% WP) at 3g/liter of water. Spray in early morning or evening.',
      hasLink: true
    },
    {
      type: 'card',
      title: 'Crop Plan Update',
      content: 'Added to your daily schedule: Apply copper spray today at 6 PM. Next checkup in 7 days.'
    }
  ];

  return (
    <section className="py-16 px-4 bg-krishi-pale-green/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-krishi-dark mb-4">
            See KrishiYantra in Action
          </h2>
          <p className="text-lg text-krishi-muted">
            Experience how farmers get instant, actionable advice
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {/* Chat Demo */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-krishi-dark mb-6 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              Live Chat Demo
            </h3>
            
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {chatMessages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.type === 'user' && (
                    <div className="bg-blue-500 text-white px-4 py-3 rounded-2xl rounded-br-md max-w-md">
                      <p className={`text-sm ${message.isMalayalam ? 'malayalam' : ''}`}>
                        {message.text}
                      </p>
                    </div>
                  )}
                  
                  {message.type === 'ai' && (
                    <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md max-w-md">
                      <p className="text-sm text-krishi-dark mb-2">{message.text}</p>
                      {message.hasLink && (
                        <button className="text-xs text-blue-600 underline hover:text-blue-800">
                          Why this recommendation?
                        </button>
                      )}
                    </div>
                  )}
                  
                  {message.type === 'card' && (
                    <div className="bg-krishi-pale-blue border border-blue-200 rounded-2xl p-4 max-w-md">
                      <h4 className="font-medium text-krishi-dark mb-2">{message.title}</h4>
                      <p className="text-sm text-krishi-muted">{message.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Voice Demo Button */}
          <div className="text-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-krishi-accent-orange hover:bg-orange-500 text-white px-8 py-3 rounded-full font-medium">
                  <Play className="w-5 h-5 mr-2" />
                  Try Voice Demo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Voice Demo</DialogTitle>
                </DialogHeader>
                <div className="text-center py-8">
                  <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center transition-all duration-200 ${
                    isRecording ? 'bg-red-100 animate-pulse' : 'bg-krishi-pale-green'
                  }`}>
                    <Mic className={`w-12 h-12 ${isRecording ? 'text-red-600' : 'text-green-600'}`} />
                  </div>
                  
                  <Button
                    onClick={() => setIsRecording(!isRecording)}
                    variant={isRecording ? "destructive" : "default"}
                    className="px-8 py-3 rounded-full"
                  >
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                  </Button>
                  
                  <p className="text-sm text-krishi-muted mt-4">
                    {isRecording ? 'Listening... Speak your farming question' : 'Press to record your question in any language'}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}