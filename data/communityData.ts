export interface Character {
  id: string;
  name: string;
  role: string;
  background: string;
  age: number;
  connections: string[]; // IDs of connected characters
  location: string; // ID of their primary location
  storylines: string[]; // IDs of storylines they're involved in
  imageUrl: string;
}

export interface Location {
  id: string;
  name: string;
  type: 'residential' | 'business' | 'community' | 'healthcare' | 'education' | 'recreation';
  description: string;
  coordinates: [number, number]; // [x, z] coordinates on the map
  characters: string[]; // IDs of characters frequently at this location
  services: string[];
  imageUrl: string;
  scenes: string[]; // IDs of available scenes at this location
}

export interface Storyline {
  id: string;
  title: string;
  description: string;
  characters: string[]; // IDs of involved characters
  locations: string[]; // IDs of involved locations
  chapters: Chapter[];
  learningOutcomes: string[];
  tags: string[];
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  scenes: Scene[];
  choices?: Choice[];
}

export interface Scene {
  id: string;
  location: string;
  characters: string[];
  dialogue: DialogueLine[];
  backgroundImage: string;
}

export interface DialogueLine {
  characterId: string;
  text: string;
  choices?: Choice[];
}

export interface Choice {
  id: string;
  text: string;
  consequences: string;
  nextSceneId: string;
}

// Sample data representing a typical semi-rural Australian community
export const communityData = {
  characters: [
    {
      id: 'sarah_nurse',
      name: 'Sarah Thompson',
      role: 'Community Nurse',
      background: 'A dedicated nurse who moved from Melbourne to serve the rural community',
      age: 32,
      connections: ['dr_miller', 'jenny_teacher'],
      location: 'health_center',
      storylines: ['healthcare_access', 'mental_health'],
      imageUrl: '/characters/sarah.jpg'
    },
    {
      id: 'dr_miller',
      name: 'Dr. James Miller',
      role: 'General Practitioner',
      background: 'Local GP for 15 years, passionate about rural healthcare',
      age: 45,
      connections: ['sarah_nurse', 'tom_farmer'],
      location: 'health_center',
      storylines: ['healthcare_access'],
      imageUrl: '/characters/dr_miller.jpg'
    },
    {
      id: 'jenny_teacher',
      name: 'Jenny Williams',
      role: 'Primary School Teacher',
      background: 'Born and raised in Sonivale, teaching for 10 years',
      age: 35,
      connections: ['sarah_nurse', 'tom_farmer'],
      location: 'primary_school',
      storylines: ['education_equity'],
      imageUrl: '/characters/jenny.jpg'
    },
    {
      id: 'tom_farmer',
      name: 'Tom Anderson',
      role: 'Local Farmer',
      background: 'Third-generation farmer dealing with climate challenges',
      age: 50,
      connections: ['dr_miller', 'jenny_teacher'],
      location: 'anderson_farm',
      storylines: ['sustainable_farming'],
      imageUrl: '/characters/tom.jpg'
    }
  ],
  locations: [
    {
      id: 'health_center',
      name: 'Sonivale Community Health Center',
      type: 'healthcare',
      description: 'The main healthcare facility serving Sonivale and surrounding areas',
      coordinates: [10, 15],
      characters: ['sarah_nurse', 'dr_miller'],
      services: ['GP Services', 'Community Nursing', 'Mental Health Support'],
      imageUrl: '/locations/health_center.jpg',
      scenes: ['health_center_reception', 'consultation_room']
    },
    {
      id: 'primary_school',
      name: 'Sonivale Primary School',
      type: 'education',
      description: 'The local primary school with a strong community focus',
      coordinates: [15, 20],
      characters: ['jenny_teacher'],
      services: ['Primary Education', 'After School Care', 'Community Events'],
      imageUrl: '/locations/primary_school.jpg',
      scenes: ['classroom', 'playground']
    },
    {
      id: 'anderson_farm',
      name: 'Anderson Family Farm',
      type: 'business',
      description: 'A family-owned farm implementing sustainable practices',
      coordinates: [5, 25],
      characters: ['tom_farmer'],
      services: ['Local Produce', 'Farm Tours', 'Agricultural Education'],
      imageUrl: '/locations/anderson_farm.jpg',
      scenes: ['farm_fields', 'barn']
    }
  ],
  storylines: [
    {
      id: 'healthcare_access',
      title: 'Rural Healthcare Access',
      description: 'Exploring challenges and solutions in rural healthcare delivery',
      characters: ['sarah_nurse', 'dr_miller'],
      locations: ['health_center'],
      chapters: [
        {
          id: 'chapter1',
          title: 'A Day in the Life',
          description: 'Follow Sarah Thompson through her daily rounds',
          scenes: [
            {
              id: 'scene1',
              location: 'health_center',
              characters: ['sarah_nurse'],
              dialogue: [
                {
                  characterId: 'sarah_nurse',
                  text: 'Rural healthcare presents unique challenges, but it\'s incredibly rewarding.'
                }
              ],
              backgroundImage: '/scenes/health_center_morning.jpg'
            }
          ]
        }
      ],
      learningOutcomes: [
        'Understand rural healthcare challenges',
        'Learn about telehealth solutions',
        'Explore community health initiatives'
      ],
      tags: ['healthcare', 'rural', 'community']
    }
  ]
};
