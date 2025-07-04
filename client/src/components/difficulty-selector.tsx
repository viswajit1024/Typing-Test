interface DifficultySelectorProps {
  currentDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
}

export default function DifficultySelector({
  currentDifficulty,
  onDifficultyChange,
}: DifficultySelectorProps) {
  const difficulties = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">
            Difficulty Level
          </h3>
          <p className="text-slate-600 text-sm">Choose your challenge level</p>
        </div>
        <div className="flex items-center space-x-3">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty.value}
              onClick={() => onDifficultyChange(difficulty.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentDifficulty === difficulty.value
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              {difficulty.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
