declare module '@community/types' {
  export interface Character {
    id: string;
    name: string;
    role: string;
    background: string;
    age: number;
    connections: string[];
    location: string;
    storylines: string[];
    imageUrl: string;
  }

  export interface Location {
    id: string;
    name: string;
    type: 'residential' | 'business' | 'community' | 'healthcare' | 'education' | 'recreation';
    description: string;
    coordinates: [number, number];
    characters: string[];
    services: string[];
    imageUrl: string;
    scenes: string[];
  }

  export interface Storyline {
    id: string;
    title: string;
    description: string;
    characters: string[];
    locations: string[];
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
}
