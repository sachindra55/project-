import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Storyline, DialogueLine } from '../../data/communityData';

interface StorylinePreviewProps {
  storyline: Storyline;
  onStart?: () => void;
}

export function StorylinePreview({ storyline, onStart }: StorylinePreviewProps) {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  const firstScene = storyline.chapters[0]?.scenes[0];
  const dialogues = firstScene?.dialogue || [];
  const currentDialogue = dialogues[currentDialogueIndex];

  useEffect(() => {
    if (!currentDialogue) return;

    setIsTyping(true);
    setDisplayedText('');

    let currentChar = 0;
    const text = currentDialogue.text;

    const typingInterval = setInterval(() => {
      if (currentChar < text.length) {
        setDisplayedText(prev => prev + text[currentChar]);
        currentChar++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [currentDialogue]);

  const handleNext = () => {
    if (isTyping) {
      // Show full text immediately if still typing
      setIsTyping(false);
      setDisplayedText(currentDialogue.text);
      return;
    }

    if (currentDialogueIndex < dialogues.length - 1) {
      setCurrentDialogueIndex(prev => prev + 1);
    } else {
      // Reset to beginning
      setCurrentDialogueIndex(0);
    }
  };

  if (!firstScene) return null;

  return (
    <div className="relative bg-white/10 backdrop-blur-md rounded-xl overflow-hidden">
      {/* Scene Background */}
      <div className="relative h-48 md:h-64">
        <img
          src={firstScene.backgroundImage}
          alt="Scene"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-scene.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Dialogue Box */}
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-white/10">
            <img
              src={`/characters/${currentDialogue?.characterId}.jpg`}
              alt="Character"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-character.jpg';
              }}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">
              {currentDialogue?.characterId.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </h3>
            <div className="relative min-h-[4rem] text-white/90">
              <p className="leading-relaxed">{displayedText}</p>
              {isTyping && (
                <span className="inline-block w-2 h-4 ml-1 bg-white/90 animate-blink" />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            {isTyping ? 'Skip' : 'Next'}
          </button>
          
          {onStart && (
            <button
              onClick={onStart}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors flex items-center gap-2"
            >
              Start Story
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
