import React, { useState } from 'react';
import { Stethoscope, Syringe, Thermometer, Activity, Heart } from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}

const equipment: Equipment[] = [
  {
    id: 'stethoscope',
    name: 'Stethoscope',
    icon: Stethoscope,
    description: 'Used for listening to heart and lung sounds'
  },
  {
    id: 'syringe',
    name: 'Syringe',
    icon: Syringe,
    description: 'Used for administering medications'
  },
  {
    id: 'thermometer',
    name: 'Thermometer',
    icon: Thermometer,
    description: 'Used for measuring body temperature'
  },
  {
    id: 'bp-cuff',
    name: 'BP Cuff',
    icon: Activity,
    description: 'Used for measuring blood pressure'
  },
  {
    id: 'ecg',
    name: 'ECG Leads',
    icon: Heart,
    description: 'Used for monitoring heart activity'
  }
];

export function EquipmentSimulation() {
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);

  const handleEquipmentClick = (equipmentId: string) => {
    setSelectedEquipment(equipmentId);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-6">Medical Equipment Training</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {equipment.map((item) => (
          <button
            key={item.id}
            onClick={() => handleEquipmentClick(item.id)}
            className={`p-4 rounded-lg transition-all ${
              selectedEquipment === item.id
                ? 'bg-blue-100 border-2 border-blue-500'
                : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
            }`}
          >
            <div className="flex flex-col items-center">
              {React.createElement(item.icon, { 
                className: `w-8 h-8 mb-2 ${
                  selectedEquipment === item.id ? 'text-blue-500' : 'text-gray-600'
                }` 
              })}
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            {selectedEquipment === item.id && (
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Instructions</h3>
        <p className="text-gray-600">
          Click on each piece of medical equipment to learn more about its purpose and usage.
        </p>
      </div>
    </div>
  );
}
