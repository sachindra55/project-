import React, { useState } from 'react';
import { Activity, Heart, Thermometer, Stethoscope, Clock, AlertCircle } from 'lucide-react';

interface VitalSign {
  name: string;
  icon: React.ElementType;
  normalRange: string;
  currentValue: string;
  unit: string;
  color: string;
  isNormal: boolean;
}

export function VitalSignsAssessment() {
  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>([
    {
      name: "Blood Pressure",
      icon: Activity,
      normalRange: "120/80 mmHg",
      currentValue: "135/88",
      unit: "mmHg",
      color: "text-yellow-500",
      isNormal: false
    },
    {
      name: "Heart Rate",
      icon: Heart,
      normalRange: "60-100 bpm",
      currentValue: "88",
      unit: "bpm",
      color: "text-green-500",
      isNormal: true
    },
    {
      name: "Temperature",
      icon: Thermometer,
      normalRange: "36.5-37.5°C",
      currentValue: "37.2",
      unit: "°C",
      color: "text-green-500",
      isNormal: true
    },
    {
      name: "Respiratory Rate",
      icon: Stethoscope,
      normalRange: "12-20 breaths/min",
      currentValue: "22",
      unit: "breaths/min",
      color: "text-yellow-500",
      isNormal: false
    },
  ]);

  const [selectedVital, setSelectedVital] = useState<VitalSign | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);

  const handleVitalClick = (vital: VitalSign) => {
    setSelectedVital(vital);
    setShowAssessment(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {vitalSigns.map((vital, index) => (
          <div
            key={index}
            onClick={() => handleVitalClick(vital)}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${vital.isNormal ? 'bg-green-500/20' : 'bg-yellow-500/20'}`}>
                <vital.icon className={`w-8 h-8 ${vital.color}`} />
              </div>
              {!vital.isNormal && (
                <AlertCircle className="w-6 h-6 text-yellow-500" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{vital.name}</h3>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-white/60 mb-1">Current</p>
                <p className={`text-xl font-bold ${vital.color}`}>
                  {vital.currentValue} <span className="text-sm">{vital.unit}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/60 mb-1">Normal Range</p>
                <p className="text-sm text-white/80">{vital.normalRange}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Assessment Tips */}
      {showAssessment && selectedVital && (
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 text-blue-400 mr-2" />
            <h3 className="text-xl font-semibold text-white">Assessment Guidelines for {selectedVital.name}</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-lg font-medium text-white mb-2">Measurement Technique</h4>
              <ul className="list-disc list-inside text-white/80 space-y-2">
                {selectedVital.name === "Blood Pressure" && (
                  <>
                    <li>Ensure patient is seated with arm at heart level</li>
                    <li>Use appropriate cuff size</li>
                    <li>Patient should be resting for 5 minutes before measurement</li>
                    <li>Take multiple readings for accuracy</li>
                  </>
                )}
                {selectedVital.name === "Heart Rate" && (
                  <>
                    <li>Count for full 60 seconds for accuracy</li>
                    <li>Note rhythm and strength of pulse</li>
                    <li>Compare radial and apical pulse when appropriate</li>
                    <li>Document any irregularities</li>
                  </>
                )}
                {selectedVital.name === "Temperature" && (
                  <>
                    <li>Choose appropriate route (oral, tympanic, temporal)</li>
                    <li>Ensure proper placement of thermometer</li>
                    <li>Wait for device to signal completion</li>
                    <li>Clean equipment before and after use</li>
                  </>
                )}
                {selectedVital.name === "Respiratory Rate" && (
                  <>
                    <li>Count for full 60 seconds</li>
                    <li>Observe without patient's awareness if possible</li>
                    <li>Note depth and pattern of breathing</li>
                    <li>Document any signs of respiratory distress</li>
                  </>
                )}
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-lg font-medium text-white mb-2">Clinical Considerations</h4>
              <ul className="list-disc list-inside text-white/80 space-y-2">
                <li>Consider patient's baseline</li>
                <li>Note any recent medications or activities</li>
                <li>Document any symptoms or complaints</li>
                <li>Compare with previous readings</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Practice Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Practice Scenarios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-lg font-medium text-white mb-2">Scenario 1: Post-operative Assessment</h4>
            <p className="text-white/80 mb-4">
              Patient just returned from PACU after abdominal surgery. What vital signs would you prioritize and why?
            </p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Start Scenario
            </button>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-lg font-medium text-white mb-2">Scenario 2: Emergency Department Triage</h4>
            <p className="text-white/80 mb-4">
              Patient presents with chest pain. Practice taking and interpreting a complete set of vital signs.
            </p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Start Scenario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
