import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { calculateStats } from "@/lib/typing-utils";
import type { TextPassage } from "@shared/schema";

interface GameState {
  testText: string;
  userInput: string;
  currentIndex: number;
  isActive: boolean;
  startTime: number | null;
  timeElapsed: number;
  wpm: number;
  accuracy: number;
  errors: number;
  difficulty: string;
  passageId: number | null;
}

const initialGameState: GameState = {
  testText: "",
  userInput: "",
  currentIndex: 0,
  isActive: false,
  startTime: null,
  timeElapsed: 0,
  wpm: 0,
  accuracy: 100,
  errors: 0,
  difficulty: "easy",
  passageId: null,
};

export function useTypingTest() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [isTestComplete, setIsTestComplete] = useState(false);

  // Fetch text passage based on difficulty
  const { data: passage, refetch: fetchNewPassage } = useQuery<TextPassage>({
    queryKey: [`/api/passages/${gameState.difficulty}`],
    enabled: !!gameState.difficulty,
  });

  // Save test result mutation
  const saveResultMutation = useMutation({
    mutationFn: async (resultData: any) => {
      const response = await apiRequest("POST", "/api/results", resultData);
      return response.json();
    },
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState.isActive && gameState.startTime) {
      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - gameState.startTime!) / 1000);
        setGameState(prev => ({ ...prev, timeElapsed: elapsed }));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState.isActive, gameState.startTime]);

  // Set text when passage is loaded
  useEffect(() => {
    if (passage) {
      setGameState(prev => ({
        ...prev,
        testText: passage.content,
        passageId: passage.id,
        userInput: "",
        currentIndex: 0,
        isActive: false,
        startTime: null,
        timeElapsed: 0,
        wpm: 0,
        accuracy: 100,
        errors: 0,
      }));
      setIsTestComplete(false);
    }
  }, [passage]);

  const handleInput = useCallback((value: string) => {
    if (!gameState.testText) return;

    // Prevent input beyond text length
    if (value.length > gameState.testText.length) return;

    setGameState(prev => {
      const newState = { ...prev, userInput: value, currentIndex: value.length };

      // Start timer on first character
      if (!prev.isActive && value.length > 0) {
        newState.isActive = true;
        newState.startTime = Date.now();
      }

      // Calculate stats
      if (newState.isActive) {
        const stats = calculateStats(value, gameState.testText, newState.timeElapsed);
        newState.wpm = stats.wpm;
        newState.accuracy = stats.accuracy;
        newState.errors = stats.errors;
      }

      return newState;
    });

    // Check if test is complete
    if (value.length >= gameState.testText.length) {
      setGameState(prev => ({ ...prev, isActive: false }));
      setIsTestComplete(true);
    }
  }, [gameState.testText, gameState.timeElapsed]);

  const resetTest = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      userInput: "",
      currentIndex: 0,
      isActive: false,
      startTime: null,
      timeElapsed: 0,
      wpm: 0,
      accuracy: 100,
      errors: 0,
    }));
    setIsTestComplete(false);
  }, []);

  const newTest = useCallback(() => {
    fetchNewPassage();
    setIsTestComplete(false);
  }, [fetchNewPassage]);

  const setDifficulty = useCallback((difficulty: string) => {
    setGameState(prev => ({ ...prev, difficulty }));
    setIsTestComplete(false);
  }, []);

  const saveResult = useCallback(() => {
    if (gameState.passageId && isTestComplete) {
      saveResultMutation.mutate({
        wpm: gameState.wpm,
        accuracy: gameState.accuracy,
        errors: gameState.errors,
        timeSeconds: gameState.timeElapsed,
        difficulty: gameState.difficulty,
        passageId: gameState.passageId,
      });
    }
  }, [gameState, isTestComplete, saveResultMutation]);

  return {
    gameState,
    isTestComplete,
    resetTest,
    newTest,
    setDifficulty,
    handleInput,
    saveResult,
  };
}
