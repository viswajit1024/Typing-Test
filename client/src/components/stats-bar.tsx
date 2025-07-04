import { Clock, Target, AlertTriangle, Gauge } from "lucide-react";
import { formatTime } from "@/lib/typing-utils";

interface StatsBarProps {
  wpm: number;
  accuracy: number;
  time: number;
  errors: number;
}

export default function StatsBar({ wpm, accuracy, time, errors }: StatsBarProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 animate-[fadeIn_0.3s_ease-in]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-sm font-medium">WPM</p>
            <p className="text-2xl font-bold text-slate-800">{wpm}</p>
          </div>
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Gauge className="text-blue-600" size={20} />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 animate-[fadeIn_0.3s_ease-in] [animation-delay:0.1s]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-sm font-medium">Accuracy</p>
            <p className="text-2xl font-bold text-slate-800">{accuracy}%</p>
          </div>
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Target className="text-green-600" size={20} />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 animate-[fadeIn_0.3s_ease-in] [animation-delay:0.2s]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-sm font-medium">Time</p>
            <p className="text-2xl font-bold text-slate-800">{formatTime(time)}</p>
          </div>
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Clock className="text-orange-600" size={20} />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 animate-[fadeIn_0.3s_ease-in] [animation-delay:0.3s]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-sm font-medium">Errors</p>
            <p className="text-2xl font-bold text-slate-800">{errors}</p>
          </div>
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <AlertTriangle className="text-red-600" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
