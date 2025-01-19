import { Users, Award, BookOpen, Heart } from 'lucide-react';

export function AboutPage() {
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
          <div className="absolute w-96 h-96 -top-10 -right-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute w-96 h-96 -bottom-10 -left-10 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute w-96 h-96 top-1/2 left-1/2 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Enhanced Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white/10 to-transparent backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">About SONIVALE</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Transforming healthcare education through innovative virtual learning experiences
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 mb-12">
            <div className="text-center mb-8">
              <Heart className="h-12 w-12 text-pink-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-white/90 max-w-2xl mx-auto">
                To revolutionize healthcare education by providing immersive, accessible, and engaging learning experiences that prepare the next generation of healthcare professionals.
              </p>
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 transform transition-all duration-300 hover:scale-105">
              <Users className="h-12 w-12 text-pink-300 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Expert Team</h3>
              <p className="text-white/80">
                Our team consists of experienced healthcare professionals and education specialists dedicated to your success.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 transform transition-all duration-300 hover:scale-105">
              <Award className="h-12 w-12 text-yellow-300 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Quality Education</h3>
              <p className="text-white/80">
                Industry-leading curriculum designed to meet the highest standards of healthcare education.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 transform transition-all duration-300 hover:scale-105">
              <BookOpen className="h-12 w-12 text-blue-300 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Innovative Learning</h3>
              <p className="text-white/80">
                Cutting-edge virtual simulations and interactive content for an engaging learning experience.
              </p>
            </div>
          </div>

          {/* Vision Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              To be the leading platform in virtual healthcare education, empowering students and professionals worldwide with the knowledge and skills they need to provide exceptional patient care.
            </p>
            <button className="px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              Join Our Community
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 200" className="w-full">
          <defs>
            <linearGradient id="wave-gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            fill="url(#wave-gradient)"
            d="M0,32L48,37.3C96,43,192,53,288,80C384,107,480,149,576,154.7C672,160,768,128,864,112C960,96,1056,96,1152,90.7C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
    
  );
}