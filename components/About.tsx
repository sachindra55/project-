import React from 'react';

export function About() {
  console.log('About component rendered');
  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-300 via-blue-400 to-purple-500 opacity-20 blur-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500 to-purple-600 opacity-20 blur-xl"></div>
            {/* Animated Water Flow */}
            <div className="absolute inset-0 animate-wave">
              <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-400 to-transparent opacity-30"></div>
            </div>
            {/* Mountain Silhouette */}
            <div className="absolute bottom-0 left-0 right-0">
              <svg viewBox="0 0 1440 320" className="w-full">
                <path 
                  fill="rgba(75, 85, 99, 0.3)" 
                  d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,234.7C960,235,1056,181,1152,170.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
            About SONIVALE
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                SONIVALE is dedicated to revolutionizing nursing education through innovative virtual learning experiences. 
                We envision a future where nursing students can develop their skills in a safe, immersive environment that 
                bridges the gap between theory and practice.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To provide cutting-edge virtual learning solutions that empower nursing students to build confidence, 
                critical thinking skills, and clinical reasoning through realistic scenarios and comprehensive support.
              </p>
            </div>

            <div className="md:col-span-2 space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Our Approach</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/50 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Innovation</h3>
                  <p className="text-gray-600">
                    Leveraging cutting-edge technology to create immersive learning experiences.
                  </p>
                </div>
                <div className="bg-white/50 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Support</h3>
                  <p className="text-gray-600">
                    Providing comprehensive resources and guidance throughout the learning journey.
                  </p>
                </div>
                <div className="bg-white/50 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Excellence</h3>
                  <p className="text-gray-600">
                    Maintaining high standards in education and student development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 