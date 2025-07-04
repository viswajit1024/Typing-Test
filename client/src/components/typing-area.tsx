import { useRef, useEffect } from "react";
import { RotateCcw, Plus } from "lucide-react";

interface TypingAreaProps {
  testText: string;
  userInput: string;
  currentIndex: number;
  isActive: boolean;
  onInput: (value: string) => void;
  onReset: () => void;
  onNewTest: () => void;
  progress: number;
}

export default function TypingArea({
  testText,
  userInput,
  currentIndex,
  isActive,
  onInput,
  onReset,
  onNewTest,
  progress
}: TypingAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [testText]);

  const renderCharacters = () => {
    if (!testText) return null;

    return testText.split('').map((char, index) => {
      let className = 'char';
      
      if (index < userInput.length) {
        if (userInput[index] === char) {
          className += ' bg-green-100 text-green-800';
        } else {
          className += ' bg-red-100 text-red-800';
        }
      } else if (index === userInput.length) {
        className += ' bg-blue-200 text-blue-800';
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Typing Test</h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={onReset}
              className="flex items-center space-x-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-700 transition-colors"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
            <button
              onClick={onNewTest}
              className="flex items-center space-x-2 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 rounded-lg text-sm font-medium text-blue-700 transition-colors"
            >
              <Plus size={12} />
              <span>New Test</span>
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-2 mb-6">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Text Display Area */}
      <div className="relative">
        <div className="bg-slate-50 rounded-lg p-6 border-2 border-slate-200 focus-within:border-blue-400 transition-colors">
          <div className="font-mono text-lg leading-relaxed text-slate-800 mb-4 min-h-[120px]">
            {renderCharacters()}
          </div>
          
          {/* Input Area */}
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={userInput}
              onChange={(e) => onInput(e.target.value)}
              className="w-full h-32 p-4 border-2 border-slate-200 rounded-lg font-mono text-lg resize-none focus:outline-none focus:border-blue-400 transition-colors bg-white"
              placeholder="Start typing here..."
              disabled={!testText}
            />
            <div className="absolute top-4 right-4 text-slate-400 text-sm">
              {currentIndex} / {testText?.length || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
