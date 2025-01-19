import React, { useState } from 'react';
import { AlertCircle, CheckCircle, ArrowRight, Heart, Activity, Thermometer, Clock, Stethoscope } from 'lucide-react';

interface VitalSigns {
  heartRate: number;
  bloodPressure: string;
  temperature: number;
  respiratoryRate: number;
  oxygenSaturation: number;
}

interface PatientScenario {
  id: number;
  name: string;
  age: number;
  gender: string;
  chiefComplaint: string;
  history: string;
  vitalSigns: VitalSigns;
  nursingActions: {
    action: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

const scenarios: PatientScenario[] = [
  {
    id: 1,
    name: "Maria Rodriguez",
    age: 65,
    gender: "Female",
    chiefComplaint: "Chest pain and shortness of breath",
    history: "History of hypertension and type 2 diabetes. Reports sudden onset of chest pain radiating to left arm, accompanied by shortness of breath for the past hour.",
    vitalSigns: {
      heartRate: 110,
      bloodPressure: "165/95",
      temperature: 37.2,
      respiratoryRate: 24,
      oxygenSaturation: 92
    },
    nursingActions: [
      {
        action: "Place patient in semi-Fowler's position",
        isCorrect: true,
        feedback: "Correct! This position helps reduce respiratory distress and makes breathing easier."
      },
      {
        action: "Obtain 12-lead ECG",
        isCorrect: true,
        feedback: "Correct! ECG is crucial for assessing potential cardiac events."
      },
      {
        action: "Administer aspirin",
        isCorrect: false,
        feedback: "Wait for physician's orders before administering any medications."
      },
      {
        action: "Start IV line and draw blood samples",
        isCorrect: true,
        feedback: "Correct! This allows for immediate medication administration if needed and helps assess cardiac markers."
      },
      {
        action: "Apply ice pack to chest",
        isCorrect: false,
        feedback: "This won't help with cardiac chest pain and may waste valuable time."
      }
    ]
  },
  {
    id: 2,
    name: "James Wilson",
    age: 45,
    gender: "Male",
    chiefComplaint: "Severe abdominal pain and vomiting",
    history: "No significant medical history. Sudden onset of severe epigastric pain radiating to back, with multiple episodes of vomiting over the past 4 hours.",
    vitalSigns: {
      heartRate: 108,
      bloodPressure: "142/88",
      temperature: 37.8,
      respiratoryRate: 20,
      oxygenSaturation: 98
    },
    nursingActions: [
      {
        action: "Assess pain characteristics",
        isCorrect: true,
        feedback: "Correct! Detailed pain assessment helps determine the cause and appropriate treatment."
      },
      {
        action: "Start IV fluid therapy",
        isCorrect: true,
        feedback: "Correct! IV fluids help prevent dehydration from vomiting and support pancreatic rest if pancreatitis is suspected."
      },
      {
        action: "Give oral pain medication",
        isCorrect: false,
        feedback: "Nothing by mouth is appropriate when acute abdomen is suspected."
      },
      {
        action: "Position patient with knees flexed",
        isCorrect: true,
        feedback: "Correct! This position helps relieve abdominal tension and discomfort."
      },
      {
        action: "Apply heating pad to abdomen",
        isCorrect: false,
        feedback: "Heat application may worsen inflammation and mask important diagnostic signs."
      }
    ]
  }
];

export function ClinicalSimulation() {
  const [currentScenario, setCurrentScenario] = useState<PatientScenario>(scenarios[0]);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const handleActionSelect = (action: string) => {
    if (!selectedActions.includes(action)) {
      setSelectedActions([...selectedActions, action]);
    }
  };

  const handleSubmit = () => {
    const correctActions = selectedActions.filter(action => 
      currentScenario.nursingActions.find(na => na.action === action)?.isCorrect
    );
    setScore((correctActions.length / currentScenario.nursingActions.filter(na => na.isCorrect).length) * 100);
    setShowFeedback(true);
  };

  const handleNextScenario = () => {
    const nextScenario = scenarios.find(s => s.id === currentScenario.id + 1) || scenarios[0];
    setCurrentScenario(nextScenario);
    setSelectedActions([]);
    setShowFeedback(false);
    setScore(0);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      {/* Patient Information */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-4">Patient Assessment</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-600">Name: {currentScenario.name}</p>
              <p className="text-gray-600">Age: {currentScenario.age}</p>
              <p className="text-gray-600">Gender: {currentScenario.gender}</p>
            </div>
            <div>
              <p className="text-gray-600">Chief Complaint:</p>
              <p className="font-medium">{currentScenario.chiefComplaint}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-600">History:</p>
            <p className="font-medium">{currentScenario.history}</p>
          </div>
        </div>

        {/* Vital Signs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-pink-50 p-4 rounded-lg text-center">
            <Heart className="w-6 h-6 mx-auto mb-2 text-pink-500" />
            <p className="text-sm text-gray-600">Heart Rate</p>
            <p className="font-bold">{currentScenario.vitalSigns.heartRate} bpm</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <Activity className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <p className="text-sm text-gray-600">Blood Pressure</p>
            <p className="font-bold">{currentScenario.vitalSigns.bloodPressure} mmHg</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <Thermometer className="w-6 h-6 mx-auto mb-2 text-red-500" />
            <p className="text-sm text-gray-600">Temperature</p>
            <p className="font-bold">{currentScenario.vitalSigns.temperature}°C</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <Clock className="w-6 h-6 mx-auto mb-2 text-purple-500" />
            <p className="text-sm text-gray-600">Respiratory Rate</p>
            <p className="font-bold">{currentScenario.vitalSigns.respiratoryRate} /min</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <Stethoscope className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <p className="text-sm text-gray-600">O2 Saturation</p>
            <p className="font-bold">{currentScenario.vitalSigns.oxygenSaturation}%</p>
          </div>
        </div>
      </div>

      {/* Nursing Actions */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3">Select Nursing Actions:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentScenario.nursingActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleActionSelect(action.action)}
              disabled={selectedActions.includes(action.action) || showFeedback}
              className={`p-3 rounded-lg text-left transition-colors ${
                selectedActions.includes(action.action)
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-50 hover:bg-gray-100'
              } ${showFeedback ? 'cursor-not-allowed' : ''}`}
            >
              {action.action}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Actions */}
      {selectedActions.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Selected Actions:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedActions.map((action, index) => (
              <div
                key={index}
                className={`px-3 py-1 rounded-full text-sm ${
                  showFeedback
                    ? currentScenario.nursingActions.find(na => na.action === action)?.isCorrect
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {action}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit/Next Buttons */}
      <div className="flex justify-between items-center">
        {!showFeedback ? (
          <button
            onClick={handleSubmit}
            disabled={selectedActions.length === 0}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Actions
          </button>
        ) : (
          <button
            onClick={handleNextScenario}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
          >
            Next Scenario
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        )}
        {showFeedback && (
          <div className="text-lg font-semibold">
            Score: {score.toFixed(0)}%
          </div>
        )}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-3">Feedback:</h4>
          <div className="space-y-3">
            {selectedActions.map((action, index) => {
              const actionInfo = currentScenario.nursingActions.find(na => na.action === action);
              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg flex items-start gap-3 ${
                    actionInfo?.isCorrect ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  {actionInfo?.isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium">{action}</p>
                    <p className="text-sm text-gray-600">{actionInfo?.feedback}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
