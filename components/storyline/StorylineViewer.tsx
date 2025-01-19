import { useState } from 'react';
import { Storyline, Scene, Choice } from '../../data/communityData';

interface StorylineViewerProps {
  storyline: Storyline;
  onComplete?: () => void;
}

export function StorylineViewer({ storyline, onComplete }: StorylineViewerProps) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [choiceMade, setChoiceMade] = useState<string | null>(null);

  const currentChapter = storyline.chapters[currentChapterIndex];
  const currentScene = currentChapter?.scenes[currentSceneIndex];
  const currentDialogue = currentScene?.dialogue[dialogueIndex];

  const handleNext = () => {
    if (!currentChapter || !currentScene) return;

    // If there are more dialogue lines in the current scene
    if (dialogueIndex < currentScene.dialogue.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
      return;
    }

    // If there are choices and no choice has been made yet
    if (currentScene.dialogue[dialogueIndex].choices && !choiceMade) {
      return; // Wait for choice to be made
    }

    // If there are more scenes in the current chapter
    if (currentSceneIndex < currentChapter.scenes.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
      setDialogueIndex(0);
      setChoiceMade(null);
      return;
    }

    // If there are more chapters
    if (currentChapterIndex < storyline.chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
      setCurrentSceneIndex(0);
      setDialogueIndex(0);
      setChoiceMade(null);
      return;
    }

    // Storyline complete
    onComplete?.();
  };

  const handleChoice = (choice: Choice) => {
    setChoiceMade(choice.id);
    // You can add logic here to branch the story based on the choice
  };

  if (!currentChapter || !currentScene || !currentDialogue) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Story complete</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Scene Background */}
      <div className="relative h-96">
        <img
          src={currentScene.backgroundImage}
          alt="Scene"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-scene.jpg';
          }}
        />
        
        {/* Chapter Title */}
        <div className="absolute top-0 left-0 right-0 bg-black/50 p-4">
          <h2 className="text-white text-xl font-semibold">
            Chapter {currentChapterIndex + 1}: {currentChapter.title}
          </h2>
        </div>
      </div>

      {/* Dialogue Box */}
      <div className="p-6 bg-white">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            {currentDialogue.characterId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </h3>
          <p className="text-gray-700">{currentDialogue.text}</p>
        </div>

        {/* Choices */}
        {currentDialogue.choices && !choiceMade && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">Choose your response:</h4>
            {currentDialogue.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice)}
                className="block w-full text-left p-3 rounded-lg border border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-colors"
              >
                {choice.text}
              </button>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            disabled={!choiceMade && currentDialogue.choices}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-gray-100 p-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Chapter {currentChapterIndex + 1}/{storyline.chapters.length}</span>
          <span>Scene {currentSceneIndex + 1}/{currentChapter.scenes.length}</span>
          <span>Dialogue {dialogueIndex + 1}/{currentScene.dialogue.length}</span>
        </div>
      </div>
    </div>
  );
}
