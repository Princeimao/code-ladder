"use client"

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Play, Send, ChevronDown, 
  Settings, Layout, Clock, CheckCircle2,
  Sparkles, Zap, Moon, Sun, Cpu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Editor, Language } from '@/components/Editor';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { getQuestion } from '@/app/api/question.api';
import { Problem } from '@/types';
import { DescriptionPannel } from '@/components/DescriptionPannel';

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState<'description' | 'submissions'>('description');
  const [code, setCode] = useState('// Your code here...');
  const [outputHeight, setOutputHeight] = useState(250);
  const [isRunning, setIsRunning] = useState(false);
  const [bottomTab, setBottomTab] = useState<'console' | 'testcases'>('testcases');
  const [testCases, setTestCases] = useState([{ input: '123', output: '12' }]);
  const [problem, setProblem] = useState<Problem | null>(null)
  
  // Editor Settings
  const [language, setLanguage] = useState<string>("javascript");
  const [theme, setTheme] = useState<string>("vs-dark");
  const [suggestion, setSuggestion] = useState(true);
  const [intellisense, setIntellisense] = useState(true);

  const handleCodeChange = (val: string | undefined) => {
    if (val !== undefined) setCode(val);
  };

  useEffect(() => {
    if (id) { 
      getQuestion.getQuestionById(id).then(res => {
        setProblem(res.data);
      });
      const savedCode = localStorage.getItem(`code_${id}`);
      if (savedCode) setCode(savedCode);
    }
  }, [id])

  if (!problem) {
    return <>
     <div className='flex items-center justify-center h-screen'>
      <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500'></div>
     </div>
    </>
  }

  return (
    <div className="h-screen pt-16 bg-[#050505] text-white flex flex-col overflow-hidden ion:bg-indigo-500/30">

      <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-black/40 backdrop-blur-xl shrink-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/problems" className="p-2 hover:bg-white/5 rounded-xl transition-colors text-zinc-500 hover:text-white">
            <ArrowLeft size={18} />
          </Link>
          <div className="h-4 w-[1px] bg-white/10"></div>
          <div className="flex items-center gap-3">
            <h1 className="font-black text-sm tracking-tight uppercase">{problem.title}</h1>
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

        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-white/5 rounded-xl text-[10px] font-black tracking-widest uppercase text-zinc-400 hover:text-white transition-all">
                {language}
                <ChevronDown size={14} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
              <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
                <DropdownMenuRadioItem value="javascript">Javascript</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="typescript">Typescript</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="java">Java</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="cpp">C++</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="python">Python</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Editor Settings */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 text-zinc-500 hover:text-white transition-colors">
                <Settings size={18} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-4 bg-zinc-950 border-zinc-800 text-zinc-200 rounded-2xl shadow-2xl" align="end">
              <DropdownMenuLabel className="px-0 pt-0 pb-3 text-[10px] font-black uppercase tracking-widest text-zinc-500">Editor Settings</DropdownMenuLabel>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-zinc-900">
                      {theme === 'vs-dark' ? <Moon size={14} /> : <Sun size={14} />}
                    </div>
                    <Label className="text-sm font-medium">Dark Theme</Label>
                  </div>
                  <Switch 
                    checked={theme === 'vs-dark'} 
                    onCheckedChange={(checked) => setTheme(checked ? 'vs-dark' : 'light')} 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-zinc-900">
                      <Sparkles size={14} className="text-yellow-500" />
                    </div>
                    <Label className="text-sm font-medium">Suggestions</Label>
                  </div>
                  <Switch 
                    checked={suggestion} 
                    onCheckedChange={setSuggestion} 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-zinc-900">
                      <Cpu size={14} className="text-indigo-400" />
                    </div>
                    <Label className="text-sm font-medium">Intellisense</Label>
                  </div>
                  <Switch 
                    checked={intellisense} 
                    onCheckedChange={setIntellisense} 
                  />
                </div>
              </div>

              <DropdownMenuSeparator className="my-4 bg-white/5" />
              <div className="text-[10px] text-zinc-600 font-medium">
                Adjust your coding experience for maximum productivity.
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <DescriptionPannel problem={problem} activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 flex flex-col overflow-hidden relative px-5">
          <div className="flex-1 relative flex overflow-hidden">
            <Editor 
              language={language} 
              theme={theme}
              suggestion={suggestion}
              intellisense={intellisense}
              value={code}
              onValChange={handleCodeChange}
            />
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
                <button 
                  onClick={() => setBottomTab('console')}
                  className={cn("text-[10px] font-black uppercase tracking-widest py-4 -mb-[1px] transition-colors", bottomTab === 'console' ? "text-white border-b border-white" : "text-zinc-600 hover:text-zinc-400")}
                >
                  Console
                </button>
                <button 
                  onClick={() => setBottomTab('testcases')}
                  className={cn("text-[10px] font-black uppercase tracking-widest py-4 -mb-[1px] transition-colors", bottomTab === 'testcases' ? "text-white border-b border-white" : "text-zinc-600 hover:text-zinc-400")}
                >
                  Test Cases
                </button>
              </div>
              <div className="flex items-center gap-3">
                 <button className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors">Clear</button>
                 <Layout size={14} className="text-zinc-600 cursor-pointer hover:text-white" />
              </div>
            </div>

            <div className="p-6 font-mono text-xs overflow-y-auto h-[calc(100%-48px)] custom-scrollbar">
              <AnimatePresence>
                {bottomTab === 'testcases' ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-6"
                  >
                     {testCases.map((tc, idx) => (
                       <div key={idx} className="space-y-3 p-4 rounded-xl bg-black/40 border border-white/5 relative group">
                          <button 
                            onClick={() => setTestCases(testCases.filter((_, i) => i !== idx))} 
                            className="absolute top-4 right-4 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Remove
                          </button>
                          <div className="text-zinc-400 font-bold">Test Case {idx + 1}</div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <span className="text-zinc-600 text-[10px] uppercase font-black">Input</span>
                              <textarea 
                                value={tc.input}
                                onChange={(e) => {
                                  const newTc = [...testCases];
                                  newTc[idx].input = e.target.value;
                                  setTestCases(newTc);
                                }}
                                className="w-full bg-black/20 border border-white/5 rounded-lg p-3 text-zinc-300 focus:outline-none focus:border-indigo-500/50 mt-1.5 resize-none h-20 custom-scrollbar" 
                              />
                            </div>
                            <div>
                               <span className="text-zinc-600 text-[10px] uppercase font-black">Expected Output</span>
                               <textarea 
                                value={tc.output}
                                onChange={(e) => {
                                  const newTc = [...testCases];
                                  newTc[idx].output = e.target.value;
                                  setTestCases(newTc);
                                }}
                                className="w-full bg-black/20 border border-white/5 rounded-lg p-3 text-zinc-300 focus:outline-none focus:border-indigo-500/50 mt-1.5 resize-none h-20 custom-scrollbar" 
                              />
                            </div>
                          </div>
                       </div>
                     ))}
                     <button 
                       onClick={() => setTestCases([...testCases, { input: '', output: '' }])}
                       className="text-[10px] uppercase font-black tracking-widest text-indigo-400 hover:text-indigo-300 py-3 px-4 rounded-xl border border-dashed border-indigo-500/30 hover:bg-indigo-500/10 transition-colors self-start"
                     >
                       + Add Test Case
                     </button>
                  </motion.div>
                ) : isRunning ? (
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
}
