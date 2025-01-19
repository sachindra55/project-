import React from 'react';
import { Activity, X } from 'lucide-react';

interface VitalMonitorProps {
  patientId: number;
  onClose: () => void;
}

export function VitalMonitor({ patientId, onClose }: VitalMonitorProps) {
  return (
    <div className="absolute top-4 right-4 w-80 bg-black/90 text-green-400 p-4 rounded-lg shadow-lg font-mono">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Patient Vitals #{patientId}</h3>
        <button onClick={onClose} className="text-white hover:text-green-400">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          <span>HR: 72 bpm</span>
        </div>
        <div>BP: 120/80 mmHg</div>
        <div>SpO2: 98%</div>
        <div>Temp: 36.8°C</div>
        <div>RR: 16/min</div>
      </div>
    </div>
  );
}