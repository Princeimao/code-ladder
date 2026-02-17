
import React from 'react';
// Re-importing to ensure named exports are correctly picked up by the build system
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight group">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-cyan-400 text-white flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <Terminal size={18} />
            </div>
            <span className="bg-gradient-to-r from-white via-white to-indigo-300 bg-clip-text text-transparent">Code Ladder</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#problems" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group">
              Problem Sets
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-indigo-500 transition-all group-hover:w-full"></span>
            </a>
            <a href="#contests" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group">
              Contests
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-indigo-500 transition-all group-hover:w-full"></span>
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
            <button 
              onClick={() => navigate('/signin')}
              className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="px-5 py-2 text-sm font-bold bg-white text-black rounded-full hover:bg-indigo-50 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Sign Up
            </button>
          </div>
          
          <button 
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-4 space-y-4 animate-in fade-in slide-in-from-top-2">
          <a href="#problems" className="block text-lg text-zinc-400 font-medium" onClick={() => setIsMenuOpen(false)}>Problem Sets</a>
          <a href="#contests" className="block text-lg text-zinc-400 font-medium" onClick={() => setIsMenuOpen(false)}>Contests</a>
          <hr className="border-white/10" />
          <button onClick={() => { navigate('/signin'); setIsMenuOpen(false); }} className="w-full text-left py-2 text-zinc-400 font-medium">Sign In</button>
          <button onClick={() => { navigate('/signup'); setIsMenuOpen(false); }} className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-3 rounded-xl font-bold">Sign Up</button>
        </div>
      )}
    </header>
  );
};

export default Header;
