import { useState } from 'react';
import { CheckCircle2, XCircle, Award, RefreshCcw, ArrowRight } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "In a patient presenting with Acute Respiratory Distress Syndrome (ARDS), which ventilator setting would you prioritize adjusting?",
    options: ["FiO2", "PEEP", "Respiratory Rate", "Tidal Volume"],
    correctAnswer: 3,
    explanation: "In ARDS, using low tidal volumes (4-6 mL/kg of ideal body weight) is crucial to prevent further lung injury through ventilator-induced lung injury (VILI)."
  },
  {
    id: 2,
    question: "A patient with diabetic ketoacidosis presents with Kussmaul breathing. What acid-base imbalance does this indicate?",
    options: ["Respiratory Alkalosis", "Metabolic Alkalosis", "Respiratory Acidosis", "Metabolic Acidosis"],
    correctAnswer: 3,
    explanation: "Kussmaul breathing (deep, rapid breathing) is a compensatory mechanism for metabolic acidosis, commonly seen in DKA."
  },
  {
    id: 3,
    question: "Which ECG change would be most concerning in a patient with hyperkalemia?",
    options: ["Prolonged PR interval", "Peaked T waves", "ST segment depression", "U waves"],
    correctAnswer: 1,
    explanation: "Peaked (tent-shaped) T waves are an early ECG manifestation of hyperkalemia and indicate urgent need for treatment."
  },
  {
    id: 4,
    question: "In the Glasgow Coma Scale, what is the lowest possible score that still indicates some brain function?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 0,
    explanation: "A score of 3 on the Glasgow Coma Scale is the lowest possible score, indicating deep coma or death."
  },
  {
    id: 5,
    question: "Which medication is contraindicated in a patient with suspected acute coronary syndrome who has a cocaine-induced myocardial infarction?",
    options: ["Aspirin", "Beta-blockers", "Nitroglycerin", "Morphine"],
    correctAnswer: 1,
    explanation: "Beta-blockers are contraindicated in cocaine-induced MI as they can worsen coronary vasospasm and hypertension."
  }
];

export function QuizGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswer = (selectedIndex: number) => {
    setSelectedAnswer(selectedIndex);
    setShowAnswer(true);
    
    const correct = selectedIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 100 * (streak + 1));
      setStreak(prev => {
        const newStreak = prev + 1;
        setHighestStreak(current => Math.max(current, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setShowAnswer(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-xl">
      <div className="flex justify-between mb-4">
        <div className="text-lg font-semibold">Score: {score}</div>
        <div className="flex gap-4">
          <div className="text-lg font-semibold">Streak: {streak} 🔥</div>
          <div className="text-lg font-semibold">Best: {highestStreak} 🏆</div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Question {currentQuestion + 1}/{questions.length}</h3>
        <p className="text-lg mb-4">{questions[currentQuestion].question}</p>
        
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showAnswer && handleAnswer(index)}
              disabled={showAnswer}
              className={`w-full p-3 text-left rounded-lg transition-colors ${
                showAnswer
                  ? index === questions[currentQuestion].correctAnswer
                    ? 'bg-green-100 border-green-500'
                    : index === selectedAnswer
                    ? 'bg-red-100 border-red-500'
                    : 'bg-gray-100'
                  : 'bg-gray-100 hover:bg-gray-200'
              } border-2 ${
                showAnswer && index === selectedAnswer
                  ? index === questions[currentQuestion].correctAnswer
                    ? 'border-green-500'
                    : 'border-red-500'
                  : 'border-transparent'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {showAnswer && (
        <div className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
          <p className="font-semibold mb-2">
            {isCorrect ? (
              <span className="flex items-center">
                <CheckCircle2 className="text-green-500 mr-2" />
                Correct! +{100 * streak} points
              </span>
            ) : (
              <span className="flex items-center">
                <XCircle className="text-red-500 mr-2" />
                Incorrect
              </span>
            )}
          </p>
          <p>{questions[currentQuestion].explanation}</p>
        </div>
      )}

      <div className="flex justify-between">
        {showAnswer && currentQuestion < questions.length - 1 && (
          <button
            onClick={nextQuestion}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
          >
            Next Question <ArrowRight className="ml-2" />
          </button>
        )}
        {(showAnswer && currentQuestion === questions.length - 1) && (
          <button
            onClick={resetQuiz}
            className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center"
          >
            Play Again <RefreshCcw className="ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}