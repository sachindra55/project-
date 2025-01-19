import { Vector3 } from 'three';

export interface InteractiveObject {
  id: string;
  name: string;
  description: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  type: '3d-model' | 'info-point' | 'portal';
  color?: string;
  targetLocation?: string;
}

export interface TourLocation {
  id: string;
  name: string;
  description: string;
  image360: string;
  hotspots: Hotspot[];
  interactiveObjects: InteractiveObject[];
}

const tourLocations: TourLocation[] = [
  {
    id: 'nursing-station',
    name: 'Nursing Station',
    description: 'Central hub for nursing staff coordination and patient monitoring.',
    image360: '/images/nursing-station-360.jpg',
    hotspots: [
      {
        id: 'to-patient-room',
        type: 'navigation',
        position: new Vector3(5, 0, -5),
        title: 'Patient Room',
        targetLocation: 'patient-room'
      },
      {
        id: 'to-library',
        type: 'navigation',
        position: new Vector3(-5, 0, 5),
        title: 'Medical Library',
        targetLocation: 'library'
      }
    ],
    interactiveObjects: [
      {
        id: 'computer-station',
        name: 'Computer Workstation',
        description: 'Electronic health records and patient management system.',
        position: [2, 0, -3],
        type: '3d-model',
        color: '#4a90e2'
      },
      {
        id: 'emergency-kit',
        name: 'Emergency Response Kit',
        description: 'Contains essential equipment for emergency response.',
        position: [-2, 1, -2],
        type: 'info-point',
        color: '#e74c3c'
      },
      {
        id: 'patient-room-portal',
        name: 'To Patient Room',
        description: 'Click to enter the patient room area',
        position: [5, 1, -5],
        type: 'portal',
        color: '#2ecc71',
        targetLocation: 'patient-room'
      },
      {
        id: 'library-portal',
        name: 'To Medical Library',
        description: 'Enter the medical library',
        position: [-5, 1, 5],
        type: 'portal',
        color: '#2196f3',
        targetLocation: 'library'
      }
    ]
  },
  {
    id: 'library',
    name: 'Medical Library',
    description: 'Comprehensive medical library with research materials and study areas.',
    image360: '/images/library-360.jpg',
    hotspots: [
      {
        id: 'to-nursing-station',
        type: 'navigation',
        position: new Vector3(5, 0, -5),
        title: 'Back to Nursing Station',
        targetLocation: 'nursing-station'
      }
    ],
    interactiveObjects: [
      {
        id: 'study-desk',
        name: 'Study Area',
        description: 'Quiet study space with medical reference materials.',
        position: [-3, 0, -4],
        type: '3d-model',
        color: '#8e44ad',
        scale: 1.2
      },
      {
        id: 'medical-journals',
        name: 'Medical Journals',
        description: 'Latest medical journals and research publications.',
        position: [-4, 1, -2],
        type: 'info-point',
        color: '#27ae60'
      },
      {
        id: 'research-computer',
        name: 'Research Computer',
        description: 'Access to medical databases and online resources.',
        position: [3, 0, -3],
        type: '3d-model',
        color: '#3498db'
      },
      {
        id: 'anatomy-models',
        name: 'Anatomy Models',
        description: 'Detailed anatomical models for study.',
        position: [4, 1, -4],
        type: 'info-point',
        color: '#e67e22'
      },
      {
        id: 'nursing-station-portal',
        name: 'To Nursing Station',
        description: 'Return to the nursing station',
        position: [5, 1, -5],
        type: 'portal',
        color: '#2196f3',
        targetLocation: 'nursing-station'
      }
    ]
  },
  {
    id: 'patient-room',
    name: 'Patient Room',
    description: 'Standard patient room equipped with modern medical facilities.',
    image360: '/images/patient-room-360.jpg',
    hotspots: [
      {
        id: 'to-nursing-station',
        type: 'navigation',
        position: new Vector3(-5, 0, -5),
        title: 'Back to Nursing Station',
        targetLocation: 'nursing-station'
      }
    ],
    interactiveObjects: [
      {
        id: 'patient-bed',
        name: 'Hospital Bed',
        description: 'Electric adjustable bed with patient monitoring system.',
        position: [0, -1, -4],
        type: '3d-model',
        scale: 1.5,
        color: '#95a5a6'
      },
      {
        id: 'vital-monitor',
        name: 'Vital Signs Monitor',
        description: 'Displays patient vital signs and health metrics.',
        position: [2, 1, -3],
        type: 'info-point',
        color: '#3498db'
      },
      {
        id: 'medical-cart',
        name: 'Medical Supply Cart',
        description: 'Contains commonly used medical supplies and equipment.',
        position: [-2, 0, -3],
        type: '3d-model',
        color: '#7f8c8d'
      },
      {
        id: 'nursing-station-portal',
        name: 'To Nursing Station',
        description: 'Return to the nursing station',
        position: [-5, 1, -5],
        type: 'portal',
        color: '#2196f3',
        targetLocation: 'nursing-station'
      }
    ]
  }
];

export default tourLocations;
