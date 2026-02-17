
import React, { useState, useEffect } from 'react';
import { 
  FileJson, 
  FileText, 
  Sparkles, 
  Code2, 
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Language = 'java' | 'python' | 'javascript' | 'cpp';
type EditorMode = 'standard' | 'doc' | 'markdown';

const CODE_SNIPPETS: Record<Language, string> = {
  java: `public class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int comp = target - nums[i];\n            if (map.containsKey(comp)) return new int[] { map.get(comp), i };\n            map.put(nums[i], i);\n        }\n        return null;\n    }\n}`,
  python: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        prevMap = {} # val : index\n        for i, n in enumerate(nums):\n            diff = target - n\n            if diff in prevMap:\n                return [prevMap[diff], i]\n            prevMap[n] = i\n        return`,
  javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n */\nvar twoSum = function(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const comp = target - nums[i];\n        if (map.has(comp)) return [map.get(comp), i];\n        map.set(nums[i], i);\n    }\n};`,
  cpp: `#include <unordered_map>\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> m;\n        for (int i = 0; i < nums.size(); i++) {\n            int comp = target - nums[i];\n            if (m.count(comp)) return {m[comp], i};\n            m[nums[i]] = i;\n        }\n        return {};\n    }\n};`
};

const StatsOverview: React.FC = () => {
  const [language, setLanguage] = useState<Language>('javascript');
  const [editorMode, setEditorMode] = useState<EditorMode>('standard');
  const [suggestionsEnabled, setSuggestionsEnabled] = useState(true);
  const [code, setCode] = useState(CODE_SNIPPETS['javascript']);
  const [isSuggesting, setIsSuggesting] = useState(false);

  useEffect(() => {
    setCode(CODE_SNIPPETS[language]);
  }, [language]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    if (suggestionsEnabled && editorMode === 'standard') {
      setIsSuggesting(true);
      setTimeout(() => setIsSuggesting(false), 1200);
    }
  };

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
      
      {/* Subtle glow behind IDE */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/3 space-y-10"
          >
            <div>
              <h2 className="text-5xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-white to-indigo-400 bg-clip-text text-transparent">
                Fluid <br/> Workspace
              </h2>
              <p className="text-zinc-500 text-lg leading-relaxed max-w-sm">
                A high-performance environment designed for modern engineers. Seamlessly switch between focus modes and languages.
              </p>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4 block">Programming Language</label>
              <div className="grid grid-cols-2 gap-3">
                {(['javascript', 'python', 'java', 'cpp'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-4 py-3 rounded-2xl text-xs font-bold transition-all border ${
                      language === lang 
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-[0_0_20px_rgba(79,70,229,0.3)]' 
                      : 'bg-zinc-900/50 text-zinc-500 border-white/5 hover:border-white/10'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-zinc-900/30 border border-white/5 space-y-8 backdrop-blur-xl relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-zinc-200 block">IntelliSense</span>
                    <span className="text-[10px] text-zinc-500">AI-powered suggestions</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSuggestionsEnabled(!suggestionsEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${suggestionsEnabled ? 'bg-indigo-500' : 'bg-zinc-800'}`}
                >
                  <motion.div 
                    animate={{ x: suggestionsEnabled ? 24 : 0 }}
                    className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-colors ${suggestionsEnabled ? 'bg-white' : 'bg-zinc-600'}`}
                  ></motion.div>
                </button>
              </div>

              <div className="space-y-4 relative z-10">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block">Environment Mode</label>
                <div className="flex p-1.5 bg-black/50 rounded-2xl border border-white/5">
                  {(['standard', 'doc', 'markdown'] as EditorMode[]).map((mode) => (
                    <button 
                      key={mode}
                      onClick={() => setEditorMode(mode)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black transition-all ${editorMode === mode ? 'bg-zinc-800 text-white shadow-xl' : 'text-zinc-600 hover:text-zinc-400'}`}
                    >
                      {mode === 'standard' && <Code2 size={12} />}
                      {mode === 'doc' && <FileText size={12} />}
                      {mode === 'markdown' && <FileJson size={12} />}
                      {mode === 'standard' ? 'IDE' : mode.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-2/3 w-full"
          >
            <div className={`relative rounded-[3rem] overflow-hidden border transition-all duration-700 h-[700px] flex flex-col ${
              editorMode === 'doc' 
              ? 'bg-[#ffffff] border-zinc-200 shadow-2xl' 
              : 'bg-zinc-950 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]'
            }`}>
              
              <div className={`px-10 py-6 flex items-center justify-between border-b ${
                editorMode === 'doc' ? 'border-zinc-100' : 'border-white/5'
              }`}>
                <div className="flex items-center gap-8">
                  <div className="flex gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-rose-500/50"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-500/50"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/50"></div>
                  </div>
                  <div className={`px-5 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase ${
                    editorMode === 'doc' ? 'bg-zinc-50 text-zinc-400' : 'bg-white/5 text-zinc-500'
                  }`}>
                    {editorMode === 'doc' ? 'scratchpad.gdoc' : `Solution.${language === 'cpp' ? 'cpp' : language === 'python' ? 'py' : language === 'java' ? 'java' : 'js'}`}
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-9 h-9 rounded-full border-2 border-black bg-zinc-900 flex items-center justify-center overflow-hidden ring-1 ring-white/10 shadow-lg">
                        <img src={`https://i.pravatar.cc/100?u=${i + 20}`} alt="user" className="opacity-80" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-2.5 rounded-full border transition-all ${
                        editorMode === 'doc' ? 'border-zinc-200 text-zinc-400 hover:bg-zinc-50' : 'border-white/10 text-zinc-500 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Share2 size={16} />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-8 py-2.5 rounded-full text-xs font-black tracking-widest transition-all ${
                      editorMode === 'doc' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-white text-black hover:bg-indigo-50'
                    }`}>
                      SUBMIT
                    </motion.button>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex overflow-hidden relative">
                <AnimatePresence>
                  {editorMode === 'standard' && (
                    <motion.div 
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 80 }}
                      exit={{ opacity: 0, width: 0 }}
                      className="w-20 pt-10 text-right pr-8 font-mono text-zinc-800 text-xs select-none bg-black/40 border-r border-white/5 overflow-hidden"
                    >
                      {Array.from({ length: 25 }).map((_, i) => (
                        <div key={i} className="leading-8">{i + 1}</div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className={`flex-1 relative p-10 transition-all duration-500 ${editorMode === 'doc' ? 'mx-auto max-w-2xl' : ''}`}>
                  <textarea
                    value={code}
                    onChange={handleTextChange}
                    spellCheck={false}
                    className={`w-full h-full bg-transparent border-none outline-none resize-none font-mono text-sm leading-8 transition-all duration-500 ${
                      editorMode === 'doc' ? 'text-zinc-900 font-sans text-xl leading-relaxed font-light' : 'text-zinc-300'
                    }`}
                    placeholder={editorMode === 'doc' ? 'Begin documentation...' : '// Code here'}
                  />

                  <AnimatePresence>
                    {isSuggesting && (
                      <motion.div 
                        initial={{ opacity: 0, y: 15, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.9 }}
                        className="absolute top-1/4 left-1/4 w-80 bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl p-4 z-50 overflow-hidden ring-1 ring-white/20"
                      >
                        <div className="text-[10px] font-black text-indigo-400 px-3 py-1 uppercase tracking-widest mb-3 border-b border-white/5">Auto-complete</div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between px-4 py-3 bg-white text-black rounded-2xl text-xs font-bold font-mono shadow-xl">
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> filter()</span>
                            <span className="opacity-40 text-[9px]">METHOD</span>
                          </div>
                          <div className="flex items-center justify-between px-4 py-3 text-zinc-400 text-xs font-mono rounded-2xl hover:bg-white/5 transition-colors">
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-zinc-700"></div> find()</span>
                            <span className="opacity-40 text-[9px]">METHOD</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="absolute bottom-10 right-10 flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-2xl text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] shadow-2xl">
                  <div className={`w-2 h-2 rounded-full ${isSuggesting ? 'bg-indigo-400 animate-pulse shadow-[0_0_8px_rgba(129,140,248,0.8)]' : 'bg-emerald-500'}`}></div>
                  SYSTEM: {editorMode.toUpperCase()}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsOverview;
