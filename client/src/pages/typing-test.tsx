import { Keyboard, Trophy, Settings } from "lucide-react";
import TypingGame from "@/components/typing-game";

export default function TypingTest() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Keyboard className="text-white text-sm" size={16} />
              </div>
              <h1 className="text-xl font-semibold text-slate-800">TypeRace</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-slate-600 hover:text-slate-800 transition-colors">
                <Settings size={18} />
              </button>
              <button className="text-slate-600 hover:text-slate-800 transition-colors">
                <Trophy size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <TypingGame />

        {/* Keyboard Shortcuts */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mt-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Keyboard Shortcuts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-700">Reset Test</span>
              <div className="flex items-center space-x-1">
                <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono">Ctrl</kbd>
                <span className="text-slate-400">+</span>
                <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono">R</kbd>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-700">New Test</span>
              <div className="flex items-center space-x-1">
                <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono">Ctrl</kbd>
                <span className="text-slate-400">+</span>
                <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono">N</kbd>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-700">Focus Input</span>
              <div className="flex items-center space-x-1">
                <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono">Tab</kbd>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-700">Toggle Settings</span>
              <div className="flex items-center space-x-1">
                <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono">Ctrl</kbd>
                <span className="text-slate-400">+</span>
                <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono">,</kbd>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-slate-600 text-sm">© 2025 TypeRace. Improve your typing skills.</p>
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-slate-600 hover:text-slate-800 transition-colors text-sm">
                About
              </button>
              <button className="text-slate-600 hover:text-slate-800 transition-colors text-sm">
                Privacy
              </button>
              <button className="text-slate-600 hover:text-slate-800 transition-colors text-sm">
                Contact
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
