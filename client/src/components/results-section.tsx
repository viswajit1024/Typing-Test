import { Check, Play, Share } from "lucide-react";
import { formatTime } from "@/lib/typing-utils";
import { useToast } from "@/hooks/use-toast";

interface ResultsSectionProps {
  wpm: number;
  accuracy: number;
  time: number;
  errors: number;
  onTryAgain: () => void;
  onSaveResult: () => void;
}

export default function ResultsSection({
  wpm,
  accuracy,
  time,
  errors,
  onTryAgain,
  onSaveResult
}: ResultsSectionProps) {
  const { toast } = useToast();

  const handleShare = async () => {
    const text = `I just completed a typing test with ${wpm} WPM and ${accuracy}% accuracy!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'TypeRace Results',
          text,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        toast({
          title: "Results copied!",
          description: "Your typing test results have been copied to clipboard.",
        });
      } catch (error) {
        toast({
          title: "Copy failed",
          description: "Unable to copy results to clipboard.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 shadow-sm border border-blue-200 animate-[fadeIn_0.3s_ease-in]">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-[bounceGentle_0.6s_ease-out]">
          <Check className="text-white" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Test Complete!</h3>
        <p className="text-slate-600">Great job! Here are your results:</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 text-center shadow-sm">
          <div className="text-3xl font-bold text-blue-600 mb-2">{wpm}</div>
          <div className="text-slate-600 font-medium">Words Per Minute</div>
          <div className="text-sm text-slate-500 mt-1">Average typing speed</div>
        </div>
        
        <div className="bg-white rounded-lg p-6 text-center shadow-sm">
          <div className="text-3xl font-bold text-green-600 mb-2">{accuracy}%</div>
          <div className="text-slate-600 font-medium">Accuracy</div>
          <div className="text-sm text-slate-500 mt-1">Characters typed correctly</div>
        </div>
        
        <div className="bg-white rounded-lg p-6 text-center shadow-sm">
          <div className="text-3xl font-bold text-orange-600 mb-2">{formatTime(time)}</div>
          <div className="text-slate-600 font-medium">Time</div>
          <div className="text-sm text-slate-500 mt-1">Total test duration</div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => {
            onSaveResult();
            onTryAgain();
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Play size={16} />
          <span>Try Again</span>
        </button>
        <button
          onClick={handleShare}
          className="px-6 py-3 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center justify-center space-x-2"
        >
          <Share size={16} />
          <span>Share Results</span>
        </button>
      </div>
    </div>
  );
}
