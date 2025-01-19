import React from 'react';
import { User } from 'lucide-react';

interface PatientBedProps {
  patientId: number;
  position: 'left' | 'right';
  selected: boolean;
  onSelect: () => void;
}

export function PatientBed({ patientId, position, selected, onSelect }: PatientBedProps) {
  return (
    <div
      className={`relative h-full transform-gpu transition-transform duration-500 cursor-pointer
        ${position === 'left' ? '-rotate-y-15' : 'rotate-y-15'}
        ${selected ? 'scale-105' : 'scale-100'}
      `}
      onClick={onSelect}
    >
      {/* Bed Frame */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-96">
        <div className="absolute bottom-0 w-full h-32 bg-gray-200 rounded-lg transform-gpu rotate-x-60 origin-bottom" />
        <div className="absolute bottom-32 w-full h-64 bg-white border-2 border-gray-300 rounded-t-lg shadow-lg">
          {/* Patient Icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <User className="w-16 h-16 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Selection Indicator */}
      {selected && (
        <div className="absolute inset-0 border-4 border-indigo-500 rounded-lg animate-pulse" />
      )}
    </div>
  );
}