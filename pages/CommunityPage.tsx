import { Link } from 'react-router-dom';
import { Laptop, GraduationCap, Activity, ArrowRight } from 'lucide-react';
import { QuizGame } from '../components/quiz/QuizGame';

const virtualEnvironments = [
  {
    title: "Interactive Patient Simulations",
    description: "Practice real-world scenarios with virtual patients",
    icon: Activity,
    color: "from-blue-300 to-blue-500",
    shadowColor: "shadow-blue-400/50",
    path: "/simulations"
  },
  {
    title: "Virtual Skills Training",
    description: "Master clinical skills through interactive tutorials",
    icon: GraduationCap,
    color: "from-pink-300 to-pink-500",
    shadowColor: "shadow-pink-400/50",
    path: "/skills-training"
  }
];

export function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 via-pink-500 to-indigo-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-300 via-pink-400 to-blue-800 opacity-50"></div>
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-grid-8"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Virtual Community</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Step into our immersive learning environments and experience realistic healthcare scenarios
            </p>
          </div>

          {/* Virtual Learning Environment Section */}
          <div className="mb-20">
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mb-4">
                <Laptop className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Virtual Learning Environment</h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-8">
                Immerse yourself in our state-of-the-art virtual learning platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {virtualEnvironments.map((env, index) => (
                <Link
                  key={index}
                  to={env.path}
                  className="group relative bg-white/10 backdrop-blur-md rounded-xl p-6 transform transition-all duration-500 hover:scale-105 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${env.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  <div className="relative mb-4">
                    <div className={`absolute inset-0 bg-gradient-to-r ${env.color} blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500`}></div>
                    <div className={`relative z-10 w-16 h-16 rounded-lg bg-gradient-to-r ${env.color} p-3 ${env.shadowColor} transform group-hover:scale-110 transition-transform duration-500`}>
                      <env.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 relative z-10">
                    {env.title}
                  </h3>
                  <p className="text-white/80 relative z-10">
                    {env.description}
                  </p>

                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex items-center text-white/90">
                      <span className="mr-2 text-sm">Explore</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quiz Section */}
          <section className="mb-20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Nursing Knowledge Challenge</h2>
              <p className="text-lg text-white/90 mb-2">Test your nursing knowledge with our interactive quiz!</p>
              <p className="text-md text-white/80">Build your streak and compete with fellow nursing students</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <QuizGame />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}