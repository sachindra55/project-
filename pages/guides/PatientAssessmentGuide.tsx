import { Stethoscope, Clipboard, Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PatientAssessmentGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-12">
        <Link 
          to="/community" 
          className="inline-flex items-center text-white hover:text-blue-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Guides
        </Link>

        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-blue-500/20 rounded-full mb-4">
            <Clipboard className="w-12 h-12 text-blue-300" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Patient Assessment Guide</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Learn systematic approaches to patient assessment and monitoring
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <Heart className="w-12 h-12 text-blue-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Vital Signs</h3>
            <p className="text-blue-200">Master the techniques for accurate vital sign measurement</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <Stethoscope className="w-12 h-12 text-blue-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Physical Assessment</h3>
            <p className="text-blue-200">Learn comprehensive physical examination techniques</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <Clipboard className="w-12 h-12 text-blue-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Documentation</h3>
            <p className="text-blue-200">Practice proper clinical documentation methods</p>
          </div>
        </div>
      </div>
    </div>
  );
} 