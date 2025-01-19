import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Building2, Stethoscope, Users, BookOpen, Map, ArrowRight } from 'lucide-react'

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 via-pink-500 to-indigo-800 relative overflow-hidden">
      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Welcome to SONIVALE
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Experience immersive learning in our virtual semi-rural Australian community. 
              Interact with local characters, explore real-world scenarios, and develop your skills through engaging storylines.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/sonivale"
                className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white/20 transition-all"
              >
                Explore SONIVALE
                <Map className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/support"
                className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white/20 transition-all"
              >
                Get Support
                <Heart className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Location Types */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 transform hover:scale-105 transition-all">
              <div className="p-3 bg-blue-500/20 rounded-lg w-fit mb-4">
                <Building2 className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Diverse Locations</h3>
              <ul className="text-white/80 space-y-2">
                <li className="flex items-center gap-2">Community Health Center</li>
                <li className="flex items-center gap-2">Primary School</li>
                <li className="flex items-center gap-2">Local Farms</li>
              </ul>
            </div>

            {/* Learning Areas */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 transform hover:scale-105 transition-all">
              <div className="p-3 bg-green-500/20 rounded-lg w-fit mb-4">
                <BookOpen className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Learning Areas</h3>
              <ul className="text-white/80 space-y-2">
                <li className="flex items-center gap-2">Rural Healthcare</li>
                <li className="flex items-center gap-2">Community Engagement</li>
                <li className="flex items-center gap-2">Cultural Competency</li>
              </ul>
            </div>

            {/* Interactive Features */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 transform hover:scale-105 transition-all">
              <div className="p-3 bg-pink-500/20 rounded-lg w-fit mb-4">
                <Heart className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Interactive Features</h3>
              <ul className="text-white/80 space-y-2">
                <li className="flex items-center gap-2">Virtual Environment</li>
                <li className="flex items-center gap-2">Character Interactions</li>
                <li className="flex items-center gap-2">Branching Storylines</li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Link
              to="/sonivale"
              className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition-all text-lg font-semibold"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}