import React from 'react';
import { Stethoscope, Clipboard, Activity, MessageCircle } from 'lucide-react';

interface ControlPanelProps {
  onViewVitals: () => void;
  onViewChart: () => void;
  selectedPatient: number;
}

export function ControlPanel({ onViewVitals, onViewChart, selectedPatient }: ControlPanelProps) {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="text-gray-700">
        {selectedPatient ? (
          <span className="font-semibold">Patient #{selectedPatient} Selected</span>
        ) : (
          <span>Select a patient to begin</span>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={onViewVitals}
          disabled={!selectedPatient}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Activity className="w-5 h-5" />
          View Vitals
        </button>
        <button
          onClick={onViewChart}
          disabled={!selectedPatient}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Clipboard className="w-5 h-5" />
          View Chart
        </button>
        <button
          disabled={!selectedPatient}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MessageCircle className="w-5 h-5" />
          Start Assessment
        </button>
      </div>
    </div>
  );
}