import { MessageSquare, Calendar, CheckCircle, Mic } from 'lucide-react';

export function DeviceMockup() {
  return (
    <div className="relative">
      {/* Phone Frame */}
      <div className="relative mx-auto w-64 h-[520px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
          {/* Status Bar */}
          <div className="bg-gray-50 px-6 py-3 flex justify-between items-center text-xs">
            <span className="font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
              <div className="w-6 h-3 border border-gray-400 rounded-sm relative">
                <div className="absolute right-0 top-0 w-1 h-full bg-gray-800 rounded-r-sm"></div>
              </div>
            </div>
          </div>
          
          {/* App Header */}
          <div className="bg-krishi-pale-green px-4 py-3 border-b">
            <h3 className="font-semibold text-krishi-dark">KrishiYantra Chat</h3>
          </div>
          
          {/* Chat Messages */}
          <div className="p-4 space-y-4 bg-gray-50 h-80 overflow-y-auto">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-br-md max-w-48 malayalam">
                <p className="text-sm">വാഴയിലെ ഇല പുള്ളി രോഗത്തിന് എന്ത് മരുന്ന്?</p>
              </div>
            </div>
            
            {/* AI Response */}
            <div className="flex justify-start">
              <div className="bg-white border px-4 py-3 rounded-2xl rounded-bl-md max-w-52 shadow-sm">
                <p className="text-sm text-krishi-dark mb-2">
                  Leaf spot disease detected. Use copper-based fungicide spray.
                </p>
                <button className="text-xs text-blue-600 underline">Why this?</button>
              </div>
            </div>
            
            {/* Crop Plan Card */}
            <div className="bg-krishi-pale-blue border border-blue-200 rounded-2xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-krishi-dark">Today's Plan</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span className="text-krishi-muted">Morning: Apply copper spray</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 border border-gray-300 rounded-full"></div>
                  <span className="text-krishi-muted">Evening: Check soil moisture</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Input Area */}
          <div className="p-3 bg-white border-t">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
              <MessageSquare className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500 flex-1">Type a message...</span>
              <Mic className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Chat Bubble */}
      <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
        Live Chat
      </div>
    </div>
  );
}