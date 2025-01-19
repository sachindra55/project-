import React from 'react';
import { EquipmentSimulation } from '../components/interactive/EquipmentSimulation';
import { Brain, Sparkles } from 'lucide-react';

export function InteractiveLearningPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 via-pink-500 to-red-500">
      {/* Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Brain className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Interactive Learning Hub
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Practice with medical equipment and learn through interactive exercises.
          </p>
        </div>

        {/* Equipment Training Section */}
        <div className="mb-12">
          <div className="bg-white rounded-xl p-8">
            <div className="flex items-center mb-6">
              <Sparkles className="w-8 h-8 text-purple-500 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Medical Equipment Training</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Learn about different medical equipment and their uses in nursing practice.
            </p>
            <EquipmentSimulation />
          </div>
        </div>

        {/* Learning Tips */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Learning Tips</h2>
          <ul className="text-white/90 space-y-3">
            <li>• Study each piece of equipment and its specific use case</li>
            <li>• Understand the proper application of medical tools</li>
            <li>• Review the descriptions to learn about each tool's purpose</li>
            <li>• Connect the equipment knowledge with your clinical practice</li>
            <li>• Use this knowledge to enhance your practical skills</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
