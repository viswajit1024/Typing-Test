export function calculateStats(userInput: string, testText: string, timeElapsed: number) {
  if (!userInput || !testText) {
    return { wpm: 0, accuracy: 100, errors: 0 };
  }

  // Calculate errors
  let errors = 0;
  let correctChars = 0;
  
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === testText[i]) {
      correctChars++;
    } else {
      errors++;
    }
  }

  // Calculate accuracy
  const accuracy = userInput.length > 0 ? Math.round((correctChars / userInput.length) * 100) : 100;

  // Calculate WPM (words per minute)
  // Standard calculation: (characters typed / 5) / minutes elapsed
  const timeInMinutes = timeElapsed / 60;
  const wpm = timeInMinutes > 0 ? Math.round((userInput.length / 5) / timeInMinutes) : 0;

  return { wpm, accuracy, errors };
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function getCharacterClass(index: number, userInput: string, testText: string): string {
  if (index < userInput.length) {
    return userInput[index] === testText[index] ? 'correct' : 'incorrect';
  } else if (index === userInput.length) {
    return 'current';
  }
  return 'pending';
}
