import { Pill, Stethoscope, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MedicationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-blue-500/20 rounded-full mb-4">
            <Pill className="w-12 h-12 text-blue-300" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Medication Administration</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Practice safe medication administration in a virtual environment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <ClipboardList className="w-12 h-12 text-blue-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Medication Safety</h3>
            <p className="text-blue-200">Learn proper medication verification and safety protocols</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <Stethoscope className="w-12 h-12 text-blue-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Patient Assessment</h3>
            <p className="text-blue-200">Monitor patient responses and vital signs</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <Pill className="w-12 h-12 text-blue-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Drug Knowledge</h3>
            <p className="text-blue-200">Study medication types, effects, and interactions</p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/community"
            className="inline-flex items-center text-white hover:text-blue-300 transition-colors"
          >
            ← Back to Scenarios
          </Link>
        </div>
      </div>
    </div>
  );
} 