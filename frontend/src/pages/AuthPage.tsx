
import React from 'react';
import { motion } from 'framer-motion';
// Re-importing to ensure named exports are correctly picked up by the build system
import { useNavigate, Link } from 'react-router-dom';
import { Terminal, Github, Chrome, ArrowLeft, Globe as GlobeIcon } from 'lucide-react';

interface AuthPageProps {
  mode: 'signin' | 'signup';
}

const AuthPage: React.FC<AuthPageProps> = ({ mode }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex overflow-hidden">
      {/* Branding Section (Left) */}
      <div className="hidden lg:flex flex-1 relative flex-col items-center justify-center p-12 bg-[#050505] overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full"></div>
        
        {/* Animated Globe/Orb Component */}
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative w-64 h-64 mb-12"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/20 via-cyan-500/20 to-purple-500/20 blur-xl animate-pulse"></div>
          <div className="absolute inset-2 rounded-full border border-white/10 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20">
               <svg viewBox="0 0 100 100" className="w-full h-full stroke-white/20 fill-none">
                 <circle cx="50" cy="50" r="45" />
                 <path d="M5,50 Q50,5 95,50 T5,50" />
                 <path d="M50,5 L50,95" />
                 <path d="M5,50 L95,50" />
               </svg>
            </div>
            <GlobeIcon size={120} className="text-indigo-400 opacity-20" />
          </div>
        </motion.div>

        <div className="relative text-center z-10">
          <h1 className="text-4xl font-black tracking-tighter mb-4 bg-gradient-to-r from-white via-indigo-200 to-indigo-500 bg-clip-text text-transparent">
            CODE LADDER
          </h1>
          <p className="text-zinc-500 font-medium max-w-sm mx-auto leading-relaxed">
            The professional standard for algorithm training and interview engineering.
          </p>
        </div>

        <div className="absolute bottom-12 flex items-center gap-2 text-zinc-600 text-xs font-black tracking-widest uppercase">
          <Terminal size={14} />
          SECURED BY ENCRYPTION
        </div>
      </div>

      {/* Auth Side (Right) */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative bg-black">
        <Link 
          to="/"
          className="absolute top-8 left-8 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-bold"
        >
          <ArrowLeft size={16} />
          Back to site
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-black tracking-tight mb-3">
              {mode === 'signin' ? 'Welcome Back' : 'Get Started'}
            </h2>
            <p className="text-zinc-500 font-medium">
              Choose your preferred method to {mode === 'signin' ? 'sign in' : 'create an account'}.
            </p>
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-4 bg-white text-black h-14 rounded-2xl font-black text-sm hover:bg-zinc-100 transition-all active:scale-[0.98] shadow-lg shadow-white/5">
              <Chrome size={20} />
              CONTINUE WITH GOOGLE
            </button>
            <button className="w-full flex items-center justify-center gap-4 bg-zinc-900 border border-white/5 text-white h-14 rounded-2xl font-black text-sm hover:bg-zinc-800 transition-all active:scale-[0.98]">
              <Github size={20} />
              CONTINUE WITH GITHUB
            </button>
          </div>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-black tracking-widest uppercase">
              <span className="bg-black px-4 text-zinc-600">Secure OAuth 2.0</span>
            </div>
          </div>

          <p className="text-center text-xs text-zinc-600 font-medium leading-relaxed">
            By continuing, you agree to Code Ladder's <a href="#" className="text-zinc-400 hover:underline">Terms of Service</a> and <a href="#" className="text-zinc-400 hover:underline">Privacy Policy</a>.
          </p>

          <div className="pt-8 text-center border-t border-white/5">
            <span className="text-sm text-zinc-500 font-medium">
              {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}
              <Link 
                to={mode === 'signin' ? '/signup' : '/signin'}
                className="ml-2 text-white font-black hover:text-indigo-400 transition-colors"
              >
                {mode === 'signin' ? 'Sign up' : 'Sign in'}
              </Link>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
