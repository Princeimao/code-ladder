
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowRight, Code2, Rocket, BrainCircuit } from 'lucide-react';
import { motion} from 'motion/react';
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";


const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-20 bg-black">
      <div className="absolute inset-0 z-0">
        <BackgroundRippleEffect />
      </div>
      <div className="max-w-7xl mx-auto px-4 text-center relative z-10 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 backdrop-blur-md border border-indigo-500/20 text-[10px] font-bold tracking-widest uppercase text-indigo-400 mb-8"
        >
          Climb to FAANG status this month
          <ChevronRight size={12} className="text-indigo-500/50" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9] bg-gradient-to-br from-white via-white to-indigo-500 bg-clip-text text-transparent"
        >
          Climb the Ladder <br className="hidden md:block" /> of Code Mastery
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-xl mx-auto text-sm md:text-base text-zinc-400 mb-10 leading-relaxed font-medium"
        >
          Solve real-world coding challenges, track your progress, and prepare for top tech interviews — all in one powerful platform.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 pointer-events-auto"
        >
          <motion.button 
            onClick={() => navigate('/signup')}
            whileHover={{ scale: 1.05, backgroundColor: '#f8fafc' }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-6 py-3 bg-white text-black rounded-full font-bold text-sm transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            Start Solving
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.button 
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.2)' }}
            className="px-6 py-3 bg-zinc-900/40 backdrop-blur-md border border-white/5 text-white rounded-full font-bold text-sm transition-all"
          >
            Explore Contests
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto pt-10 border-t border-white/5 pointer-events-auto"
        >
            <FeatureIcon icon={<Code2 size={18} className="text-indigo-400" />} label="1000+ Tasks" index={0} />
            <FeatureIcon icon={<BrainCircuit size={18} className="text-cyan-400" />} label="AI Debugger" index={1} />
            <FeatureIcon icon={<Rocket size={18} className="text-purple-400" />} label="FAANG Tracks" index={2} />
            <FeatureIcon icon={<Rocket size={18} className="text-blue-400" />} label="Live Ranking" index={3} />
        </motion.div>
      </div>
    </section>
  );
};

const FeatureIcon = ({ icon, label, index }: { icon: React.ReactNode, label: string, index: number }) => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 + index * 0.1 }}
      className="flex flex-col items-center gap-2 group"
    >
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-900/50 border border-white/5 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/5 transition-all">
            {icon}
        </div>
        <span className="text-[9px] font-black tracking-widest text-zinc-500 uppercase group-hover:text-zinc-300 transition-colors">{label}</span>
    </motion.div>
)

export default Hero;
