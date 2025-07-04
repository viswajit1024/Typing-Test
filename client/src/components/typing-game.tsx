import { useEffect } from "react";
import StatsBar from "./stats-bar";
import DifficultySelector from "./difficulty-selector";
import TypingArea from "./typing-area";
import ResultsSection from "./results-section";
import { useTypingTest } from "@/hooks/use-typing-test";

export default function TypingGame() {
  const {
    gameState,
    isTestComplete,
    resetTest,
    newTest,
    setDifficulty,
    handleInput,
    saveResult
  } = useTypingTest();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        switch (e.key) {
          case 'r':
            e.preventDefault();
            resetTest();
            break;
          case 'n':
            e.preventDefault();
            newTest();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [resetTest, newTest]);

  return (
    <div className="space-y-6">
      <StatsBar 
        wpm={gameState.wpm}
        accuracy={gameState.accuracy}
        time={gameState.timeElapsed}
        errors={gameState.errors}
      />
      
      <DifficultySelector 
        currentDifficulty={gameState.difficulty}
        onDifficultyChange={setDifficulty}
      />
      
      <TypingArea
        testText={gameState.testText}
        userInput={gameState.userInput}
        currentIndex={gameState.currentIndex}
        isActive={gameState.isActive}
        onInput={handleInput}
        onReset={resetTest}
        onNewTest={newTest}
        progress={(gameState.currentIndex / (gameState.testText?.length || 1)) * 100}
      />
      
      {isTestComplete && (
        <ResultsSection
          wpm={gameState.wpm}
          accuracy={gameState.accuracy}
          time={gameState.timeElapsed}
          errors={gameState.errors}
          onTryAgain={newTest}
          onSaveResult={saveResult}
        />
      )}
    </div>
  );
}
