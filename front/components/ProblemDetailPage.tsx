"use client"

import React, { useState } from 'react';
import { useParams } from "next/navigation"
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Play, Send, ChevronDown, 
  Settings, Layout, Clock, CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';

const ProblemDetailPage: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'description' | 'submissions'>('description');
  const [code, setCode] = useState('// Your code here...');
  const [outputHeight, setOutputHeight] = useState(200);
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="h-screen bg-[#050505] text-white flex flex-col overflow-hidden selection:bg-indigo-500/30">
      
      {/* Top Bar Navigation & Actions */}
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-black/40 backdrop-blur-xl shrink-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/problems" className="p-2 hover:bg-white/5 rounded-xl transition-colors text-zinc-500 hover:text-white">
            <ArrowLeft size={18} />
          </Link>
          <div className="h-4 w-[1px] bg-white/10"></div>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-cyan-400 rounded-lg flex items-center justify-center text-[10px] font-black">
              {id}
            </div>
            <h1 className="font-black text-sm tracking-tight uppercase">Two Sum</h1>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 bg-zinc-950 border border-white/5 rounded-2xl shadow-2xl">
           <button 
             onClick={() => {
               setIsRunning(true);
               setTimeout(() => setIsRunning(false), 1500);
             }}
             className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-black tracking-widest uppercase text-zinc-400 hover:text-white hover:bg-white/5 transition-all group"
           >
             <Play size={14} className={cn("fill-current group-hover:text-emerald-400 transition-colors", isRunning && "animate-pulse")} />
             Run
           </button>
           <button className="flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-black tracking-widest uppercase bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all active:scale-[0.98]">
             <Send size={14} className="fill-current" />
             Submit
           </button>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-white/5 rounded-xl text-[10px] font-black tracking-widest uppercase text-zinc-400 hover:text-white transition-all">
            Javascript
            <ChevronDown size={14} />
          </button>
          <button className="p-2 text-zinc-500 hover:text-white transition-colors">
            <Settings size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Description */}
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
                Given an array of integers <code className="text-indigo-400 bg-indigo-400/10 px-1 rounded">nums</code> and an integer <code className="text-indigo-400 bg-indigo-400/10 px-1 rounded">target</code>, return indices of the two numbers such that they add up to <code className="text-indigo-400 bg-indigo-400/10 px-1 rounded">target</code>.
              </p>
              <p className="text-zinc-400 leading-relaxed font-medium">
                You may assume that each input would have exactly one solution, and you may not use the same element twice.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-600">Examples</h3>
              {[1, 2].map(ex => (
                <div key={ex} className="p-5 rounded-3xl bg-zinc-900/30 border border-white/5 space-y-3">
                  <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Example {ex}</div>
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono"><span className="text-zinc-600">Input:</span> nums = [2,7,11,15], target = 9</div>
                    <div className="text-[11px] font-mono"><span className="text-zinc-600">Output:</span> [0,1]</div>
                    <div className="text-[11px] text-zinc-500 leading-relaxed italic">Because nums[0] + nums[1] == 9, we return [0, 1].</div>
                  </div>
                </div>
              ))}
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

        {/* Right Side: IDE */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          
          {/* Main Code Area */}
          <div className="flex-1 relative flex overflow-hidden">
            <div className="w-12 bg-zinc-950/80 border-r border-white/5 flex flex-col items-center pt-8 gap-6 text-zinc-700 font-mono text-[10px] select-none">
              {Array.from({ length: 30 }).map((_, i) => <div key={i}>{i + 1}</div>)}
            </div>
            <div className="flex-1 p-8 bg-[#080808]">
              <textarea 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-transparent border-none outline-none resize-none font-mono text-sm leading-8 text-zinc-300 placeholder-zinc-800"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Bottom Terminal Section */}
          <motion.div 
            style={{ height: outputHeight }}
            className="border-t border-white/5 bg-zinc-950/80 backdrop-blur-3xl relative shrink-0"
          >
            {/* Resizer Handle */}
            <div 
              onMouseDown={(e) => {
                const startY = e.clientY;
                const startH = outputHeight;
                const onMove = (moveEvent: MouseEvent) => {
                  setOutputHeight(Math.max(100, Math.min(600, startH - (moveEvent.clientY - startY))));
                };
                const onUp = () => {
                  window.removeEventListener('mousemove', onMove);
                  window.removeEventListener('mouseup', onUp);
                };
                window.addEventListener('mousemove', onMove);
                window.addEventListener('mouseup', onUp);
              }}
              className="absolute top-0 left-0 right-0 h-1 cursor-ns-resize hover:bg-indigo-500/50 transition-colors z-50"
            />

            <div className="h-12 border-b border-white/5 flex items-center justify-between px-6">
              <div className="flex items-center gap-6">
                <button className="text-[10px] font-black uppercase tracking-widest text-white border-b border-white py-4 -mb-[1px]">Console</button>
                <button className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-zinc-400 py-4 -mb-[1px]">Test Cases</button>
              </div>
              <div className="flex items-center gap-3">
                 <button className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors">Clear</button>
                 <Layout size={14} className="text-zinc-600 cursor-pointer hover:text-white" />
              </div>
            </div>

            <div className="p-6 font-mono text-xs overflow-y-auto h-[calc(100%-48px)] custom-scrollbar">
              <AnimatePresence>
                {isRunning ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-2"
                  >
                    <div className="text-zinc-600 animate-pulse"># Running test cases...</div>
                    <div className="text-zinc-600"># Memory used: 12.4 MB</div>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      <span className="text-emerald-500 font-bold">Case 1: Accepted</span>
                      <span className="text-zinc-600 ml-auto">0ms</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      <span className="text-emerald-500 font-bold">Case 2: Accepted</span>
                      <span className="text-zinc-600 ml-auto">1ms</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-[11px] leading-relaxed text-zinc-500">
                      Output: [0, 1] <br/>
                      Expected: [0, 1]
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetailPage;
