
import React from 'react';
import { Cpu, Globe, Lock, ShieldCheck, Zap, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const Features: React.FC = () => {
  const features = [
    {
      title: "Real-time Compiling",
      description: "Submit code in 20+ languages and get instant feedback with our high-performance sandbox.",
      icon: <Zap className="text-indigo-400" size={24} />,
      className: "md:col-span-2",
      gradient: "from-indigo-500/10 to-transparent"
    },
    {
      title: "Custom IDE",
      description: "Vim, Emacs, and standard keybindings supported.",
      icon: <Cpu className="text-cyan-400" size={24} />,
      className: "md:col-span-1",
      gradient: "from-cyan-500/10 to-transparent"
    },
    {
      title: "Analytics",
      description: "Deep dive into your performance metrics and analysis.",
      icon: <BarChart3 className="text-purple-400" size={24} />,
      className: "md:col-span-1",
      gradient: "from-purple-500/10 to-transparent"
    },
    {
      title: "Global Contests",
      description: "Compete with engineers from Google, Meta, and OpenAI every single weekend.",
      icon: <Globe className="text-blue-400" size={24} />,
      className: "md:col-span-2",
      gradient: "from-blue-500/10 to-transparent"
    }
  ];

  return (
    <section className="py-32 max-w-7xl mx-auto px-4 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent uppercase">Everything you need</h2>
        <p className="text-zinc-500 max-w-xl mx-auto text-lg font-medium leading-relaxed">
          We've built the ultimate workspace for elite software engineers and competitive programmers.
        </p>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {features.map((feature, i) => (
          <motion.div 
            key={i}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.98 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            whileHover={{ y: -8 }}
            className={`p-10 rounded-[3rem] bg-zinc-900/40 border border-white/5 relative overflow-hidden group transition-all duration-500 backdrop-blur-sm ${feature.className}`}
          >
            {/* Background Gradient Accent */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
            
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-125 group-hover:opacity-[0.08] transition-all duration-1000">
                {feature.icon}
            </div>

            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-white/10 transition-all relative z-10 border border-white/5">
              {feature.icon}
            </div>
            
            <h3 className="text-3xl font-black mb-4 relative z-10 tracking-tight">{feature.title}</h3>
            <p className="text-zinc-500 leading-relaxed group-hover:text-zinc-300 transition-colors relative z-10 font-medium">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;
