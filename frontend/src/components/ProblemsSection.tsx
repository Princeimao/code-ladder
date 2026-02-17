
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronRight } from 'lucide-react';
import { type Problem } from "../../types"
import { motion } from 'framer-motion';

const mockProblems: Problem[] = [
  { id: '1', title: 'Two Sum', difficulty: 'Easy', acceptance: '49.2%', category: 'Arrays' },
  { id: '2', title: 'Add Two Numbers', difficulty: 'Medium', acceptance: '40.1%', category: 'Linked List' },
  { id: '3', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', acceptance: '33.8%', category: 'Hash Table' },
  { id: '4', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', acceptance: '35.2%', category: 'Binary Search' },
  { id: '5', title: 'Longest Palindromic Substring', difficulty: 'Medium', acceptance: '32.4%', category: 'Dynamic Programming' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const ProblemsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="problems" className="py-24 max-w-7xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
      >
        <div>
          <h2 className="text-4xl font-bold mb-2">Featured Challenges</h2>
          <p className="text-zinc-500">Curated sets of problems to sharpen your skills.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text" 
              placeholder="Search problems..." 
              className="bg-zinc-900 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 w-full md:w-64"
            />
          </div>
          <button className="p-2 bg-zinc-900 border border-white/10 rounded-full text-zinc-400 hover:text-white transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-zinc-900/30 border border-white/10 rounded-3xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-zinc-900/50">
                <th className="px-6 py-4 text-xs font-semibold uppercase text-zinc-500">Title</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-zinc-500">Difficulty</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-zinc-500">Acceptance</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-zinc-500">Category</th>
              </tr>
            </thead>
            <motion.tbody 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="divide-y divide-white/5"
            >
              {mockProblems.map((problem) => (
                <motion.tr 
                  key={problem.id} 
                  variants={itemVariants}
                  onClick={() => navigate(`/problem/${problem.id}`)}
                  className="hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  
                  <td className="px-6 py-4 font-medium">{problem.title}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full border ${
                      problem.difficulty === 'Easy' ? 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5' :
                      problem.difficulty === 'Medium' ? 'border-amber-500/20 text-amber-500 bg-amber-500/5' :
                      'border-rose-500/20 text-rose-500 bg-rose-500/5'
                    }`}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-500">{problem.acceptance}</td>
                  <td className="px-6 py-4 text-zinc-500">{problem.category}</td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <button 
          onClick={() => navigate('/problems')}
          className="text-zinc-400 hover:text-white text-sm font-medium flex items-center gap-1 mx-auto transition-colors group"
        >
          View all 1,248 problems
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
};

export default ProblemsSection;
