import React from 'react';
import { ClinicalSimulation } from '../components/simulation/ClinicalSimulation';
import { Stethoscope, BookOpen } from 'lucide-react';

export function SimulationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-500 to-indigo-800 py-12 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Stethoscope className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Clinical Simulation Lab
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Practice your clinical decision-making skills with realistic patient scenarios. 
            Assess patients, select appropriate nursing interventions, and receive immediate feedback.
          </p>
        </div>

        {/* Simulation Component */}
        <div className="mb-12">
          <ClinicalSimulation />
        </div>

        {/* Instructions */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 max-w-2xl mx-auto">
          <div className="flex items-center mb-4">
            <BookOpen className="w-8 h-8 text-white mr-3" />
            <h2 className="text-2xl font-bold text-white">How to Use the Simulation</h2>
          </div>
          <ul className="text-white/90 space-y-3">
            <li>1. Review the patient's information and vital signs carefully</li>
            <li>2. Consider the patient's chief complaint and medical history</li>
            <li>3. Select appropriate nursing interventions based on your assessment</li>
            <li>4. Submit your actions to receive feedback</li>
            <li>5. Review the feedback to understand correct and incorrect choices</li>
            <li>6. Progress through different scenarios to practice various clinical situations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
