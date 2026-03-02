import { cn } from "@/lib/utils";
import { Problem } from "@/types";
import { Clock } from "lucide-react";

export const DescriptionPannel = ({ problem, activeTab, setActiveTab }: { problem: Problem, activeTab: 'description' | 'submissions', setActiveTab: (tab: 'description' | 'submissions') => void }) => {
    return (
        <div className="w-[450px] border-r border-white/5 flex flex-col bg-zinc-950/20 shrink-0">
          <div className="flex p-2 bg-zinc-950/50 border-b border-white/5">
            <button 
              onClick={() => setActiveTab('description')}
              className={cn(
                "flex-1 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg",
                activeTab === 'description' ? "bg-white/5 text-white" : "text-zinc-600 hover:text-zinc-400"
              )}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab('submissions')}
              className={cn(
                "flex-1 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg",
                activeTab === 'submissions' ? "bg-white/5 text-white" : "text-zinc-600 hover:text-zinc-400"
              )}
            >
              Solutions
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Easy</span>
                <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                  <Clock size={12} />
                  15m
                </div>
              </div>
              <p className="text-zinc-400 leading-relaxed font-medium">
                {problem.description}  
              </p>
              {/* <p className="text-zinc-400 leading-relaxed font-medium">
                You may assume that each input would have exactly one solution, and you may not use the same element twice.
              </p> */}
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-600">Examples</h3>

              {
                problem.testCases.map((testcase, idx) => (
                  <div key={idx} className="p-5 rounded-3xl bg-zinc-900/30 border border-white/5 space-y-3">
                  <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Example {idx + 1}</div>
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono"><span className="text-zinc-600">Input:</span>{testcase.input}</div>
                    <div className="text-[11px] font-mono"><span className="text-zinc-600">Output:</span>{testcase.output}</div>
                    <div className="text-[11px] text-zinc-500 leading-relaxed italic">{testcase.explanation}</div>
                  </div>
                </div>
                ))
              }
            </div>

            <div className="space-y-4 pb-12">
               <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-600">Constraints</h3>
               <ul className="space-y-2">
                 {['2 <= nums.length <= 104', '-109 <= nums[i] <= 109', '-109 <= target <= 109'].map(c => (
                   <li key={c} className="flex items-center gap-3 text-zinc-500 text-[11px] font-mono">
                     <div className="w-1 h-1 rounded-full bg-indigo-500/40"></div>
                     {c}
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
    )
}