
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search,ChevronRight } from 'lucide-react';
import { type Problem } from "../../types"

const PROBLEMS: Problem[] = Array.from({ length: 20 }, (_, i) => ({
  id: (i + 1).toString(),
  title: [
    'Two Sum', 'Add Two Numbers', 'Longest Substring', 'Median of Arrays', 
    'Zigzag Conversion', 'Reverse Integer', 'String to Integer', 'Palindrome Number',
    'Container With Most Water', 'Integer to Roman', 'Roman to Integer', 'Longest Common Prefix',
    '3Sum', '3Sum Closest', 'Letter Combinations', '4Sum', 'Remove Nth Node', 'Valid Parentheses',
    'Merge Two Sorted Lists', 'Generate Parentheses'
  ][i % 20],
  difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)] as any,
  acceptance: `${(Math.random() * 60 + 30).toFixed(1)}%`,
  category: ['Arrays', 'Strings', 'Linked List', 'DP', 'Math'][Math.floor(Math.random() * 5)]
}));

const ProblemsPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = PROBLEMS.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-black tracking-tighter mb-4 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent uppercase">
          Problem Sets
        </h1>
        <p className="text-zinc-500 text-lg font-medium">Browse our library of challenges across various categories.</p>
      </motion.div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search problems by name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {['All', 'Arrays', 'Strings', 'Linked List', 'DP'].map(cat => (
            <button key={cat} className="px-5 py-2.5 rounded-full bg-zinc-900 border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:border-white/20 transition-all whitespace-nowrap">
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-900/30 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-zinc-950/50">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-600">ID</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-600">Title</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-600">Difficulty</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-600">Acceptance</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-600">Category</th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {filtered.map((problem) => (
                <tr 
                  key={problem.id} 
                  onClick={() => navigate(`/problem/${problem.id}`)}
                  className="hover:bg-indigo-500/[0.02] transition-colors cursor-pointer group"
                >
                  <td className="px-8 py-6 text-zinc-700 font-mono text-sm">#{problem.id.padStart(3, '0')}</td>
                  <td className="px-8 py-6 font-bold text-zinc-200 group-hover:text-white transition-colors">{problem.title}</td>
                  <td className="px-8 py-6">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                      problem.difficulty === 'Easy' ? 'border-emerald-500/10 text-emerald-400 bg-emerald-500/5' :
                      problem.difficulty === 'Medium' ? 'border-amber-500/10 text-amber-400 bg-amber-500/5' :
                      'border-rose-500/10 text-rose-400 bg-rose-500/5'
                    }`}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-zinc-500 font-medium">{problem.acceptance}</td>
                  <td className="px-8 py-6 text-zinc-500 font-medium">{problem.category}</td>
                  <td className="px-8 py-6 text-right">
                    <ChevronRight size={18} className="text-zinc-800 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ProblemsPage;
