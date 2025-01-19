import React from 'react';
import { Clipboard, X } from 'lucide-react';

interface MedicalChartProps {
  patientId: number;
  onClose: () => void;
}

export function MedicalChart({ patientId, onClose }: MedicalChartProps) {
  return (
    <div className="absolute top-4 left-4 w-96 bg-white p-6 rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">Patient Chart #{patientId}</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-700">Chief Complaint</h4>
          <p className="text-gray-600">Shortness of breath, chest pain</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700">History</h4>
          <p className="text-gray-600">Hypertension, Type 2 Diabetes</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700">Current Medications</h4>
          <ul className="list-disc list-inside text-gray-600">
            <li>Metformin 500mg BID</li>
            <li>Lisinopril 10mg daily</li>
          </ul>
        </div>
      </div>
    </div>
  );
}