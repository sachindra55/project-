import React from 'react';
import { Link } from 'react-router-dom';
import { VitalSignsAssessment } from '../components/skills/VitalSignsAssessment';
import { Activity, ArrowLeft } from 'lucide-react';

export function VitalSignsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-500 to-indigo-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Back Navigation */}
        <Link 
          to="/skills-training" 
          className="inline-flex items-center text-white/90 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Skills Training
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mb-4">
            <Activity className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Vital Signs Assessment</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Master the essential skills of measuring and interpreting vital signs with our interactive training module
          </p>
        </div>

        {/* Main Content */}
        <VitalSignsAssessment />

        {/* Additional Resources */}
        <div className="mt-12">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">Quick Reference Guide</h3>
                <p className="text-white/80 mb-4">Download our comprehensive vital signs reference guide.</p>
                <button className="text-blue-400 hover:text-blue-300 transition-colors">
                  Download PDF
                </button>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">Video Tutorials</h3>
                <p className="text-white/80 mb-4">Watch detailed demonstrations of proper measurement techniques.</p>
                <button className="text-blue-400 hover:text-blue-300 transition-colors">
                  View Videos
                </button>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">Assessment Tools</h3>
                <p className="text-white/80 mb-4">Access printable assessment forms and checklists.</p>
                <button className="text-blue-400 hover:text-blue-300 transition-colors">
                  View Tools
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
