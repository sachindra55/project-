import { useState } from 'react';
import { LiveChat } from '../components/support/LiveChat';
import { MessageCircle, Mail } from 'lucide-react';

export function SupportPage() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 via-pink-500 to-indigo-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 perspective-1000">
        {/* Sky Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-300 via-pink-400 to-blue-800">
          {/* Ambient Light */}
          <div className="absolute left-1/2 top-1/4 w-96 h-96 -translate-x-1/2 -translate-y-1/4">
            <div className="absolute inset-0 bg-gradient-radial from-pink-300/30 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Enhanced Animated Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 -top-10 -right-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute w-96 h-96 -bottom-10 -left-10 bg-gradient-to-tr from-blue-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-delayed"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8">Support Center</h1>
          <p className="text-xl text-orange-100 mb-12">
            How can we help you today?
          </p>
        </div>

        {!showChat ? (
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <button
              onClick={() => setShowChat(true)}
              className="group bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20"
            >
              <div className="flex flex-col items-center">
                <div className="p-3 bg-orange-500/10 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-12 h-12 text-orange-300" />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-white">Live Chat</h2>
                <p className="text-orange-100 text-center">
                  Connect with our support team in real-time
                </p>
              </div>
            </button>

            <a
              href="mailto:support@sonivale.com"
              className="group bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20"
            >
              <div className="flex flex-col items-center">
                <div className="p-3 bg-orange-500/10 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-12 h-12 text-orange-300" />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-white">Email Support</h2>
                <p className="text-orange-100 text-center">
                  Send us an email for detailed assistance
                </p>
              </div>
            </a>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowChat(false)}
                className="text-orange-100 hover:text-white transition-colors"
              >
                Close Chat
              </button>
            </div>
            <LiveChat />
          </div>
        )}
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 200" className="w-full">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,32L48,37.3C96,43,192,53,288,80C384,107,480,149,576,154.7C672,160,768,128,864,112C960,96,1056,96,1152,90.7C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}