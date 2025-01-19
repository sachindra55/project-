import { Building2, Bed, Users, Stethoscope } from 'lucide-react';

export function HospitalWardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(66,153,225,0.1),_transparent_70%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-blue-500/20 rounded-full mb-4">
            <Building2 className="w-12 h-12 text-blue-300" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">General Hospital Ward</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Experience a realistic hospital ward environment and practice essential nursing skills
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <Bed className="w-12 h-12 text-blue-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Patient Care</h3>
            <p className="text-blue-200">Practice bedside care and patient monitoring in a virtual setting</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <Users className="w-12 h-12 text-blue-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Team Collaboration</h3>
            <p className="text-blue-200">Work with virtual healthcare team members and improve communication</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <Stethoscope className="w-12 h-12 text-blue-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Clinical Skills</h3>
            <p className="text-blue-200">Develop and refine your clinical assessment abilities</p>
          </div>
        </div>

        {/* Coming Soon Message */}
        <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Interactive Simulation Coming Soon</h2>
          <p className="text-blue-200 mb-6">
            We're working on bringing you a fully interactive 3D hospital ward environment. Stay tuned for updates!
          </p>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Get Notified
          </button>
        </div>
      </div>
    </div>
  );
}