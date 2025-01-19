import { useState } from 'react';
import { Character } from '../../data/communityData';

interface CharacterProfileProps {
  character: Character;
  onInteract?: (characterId: string) => void;
}

export function CharacterProfile({ character, onInteract }: CharacterProfileProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <img
          src={character.imageUrl}
          alt={character.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-character.jpg';
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white text-xl font-semibold">{character.name}</h3>
          <p className="text-white/80">{character.role}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <p className="text-gray-600">{character.background}</p>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-orange-500 hover:text-orange-600 font-medium"
        >
          {showDetails ? 'Show Less' : 'Show More'}
        </button>

        {showDetails && (
          <div className="mt-4 space-y-3">
            <div>
              <h4 className="text-sm font-semibold text-gray-700">Age</h4>
              <p className="text-gray-600">{character.age} years old</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700">Location</h4>
              <p className="text-gray-600">{character.location.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700">Storylines</h4>
              <ul className="list-disc list-inside text-gray-600">
                {character.storylines.map(storyline => (
                  <li key={storyline}>
                    {storyline.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </li>
                ))}
              </ul>
            </div>

            {onInteract && (
              <button
                onClick={() => onInteract(character.id)}
                className="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Interact with {character.name.split(' ')[0]}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
