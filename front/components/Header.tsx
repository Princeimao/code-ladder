"use client"

import React from 'react';
import { 
  Terminal, 
  Menu, 
  X, 
  List, 
  BookText, 
  PieChart, 
  Coins, 
  Beaker, 
  ShoppingBag, 
  SquareTerminal, 
  Settings, 
  SunMoon, 
  LogOut, 
  ChevronRight,
  User
} from 'lucide-react';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut } from "next-auth/react";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/app/store/authReducer';
import { RootState } from '@/app/store/store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Get auth state from Redux
  const auth = useSelector((state: RootState) => state);
  const { name, picture, isAuthenticated } = auth;

  const handleLogout = async () => {
    dispatch(logout());
    // Sign out from next-auth if used
    await signOut({ redirect: false });
    router.push('/');
  };

  const getInitials = (userName: string) => {
    return userName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || <User size={16} />;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight group">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-cyan-400 text-white flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <Terminal size={18} />
            </div>
            <span className="bg-gradient-to-r from-white via-white to-indigo-300 bg-clip-text text-transparent">Code Ladder</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/problems" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group">
              Problem Sets
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-indigo-500 transition-all group-hover:w-full"></span>
            </Link>
            <a href="#contests" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group">
              Contests
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-indigo-500 transition-all group-hover:w-full"></span>
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-offset-black transition-all hover:ring-2 hover:ring-white/20">
                    <Avatar className="h-9 w-9 border border-white/10">
                      <AvatarImage src={picture || ""} alt={name} />
                      <AvatarFallback className="bg-zinc-800 text-zinc-400 text-xs font-bold">
                        {getInitials(name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 p-0 bg-zinc-900 border-zinc-800 text-zinc-200 shadow-2xl rounded-2xl overflow-hidden" align="end" sideOffset={10}>
                  {/* Profile Header */}
                  <div className="p-5 flex items-start gap-4 bg-zinc-900">
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-orange-400 to-yellow-200 opacity-20 blur-[2px]"></div>
                      <Avatar className="h-14 w-14 border border-white/10 ring-2 ring-orange-500/20">
                        <AvatarImage src={picture || ""} alt={name} />
                        <AvatarFallback className="bg-zinc-800 text-zinc-400 text-lg">
                          {getInitials(name)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-bold text-lg text-white leading-tight">{name || "Coder"}</h3>
                      <p className="text-xs text-orange-400 font-medium mt-1 leading-relaxed">
                        Access all features with our Premium subscription!
                      </p>
                    </div>
                  </div>

                  {/* Grid Shortcuts */}
                  <div className="px-3 pb-4 grid grid-cols-3 gap-2">
                    {[
                      { icon: <List className="text-orange-400" size={20} />, label: "My Lists", bg: "bg-zinc-800/50" },
                      { icon: <BookText className="text-blue-400" size={20} />, label: "Notebook", bg: "bg-zinc-800/50" },
                      { icon: <PieChart className="text-emerald-400" size={20} />, label: "Progress", bg: "bg-zinc-800/50" },
                      { icon: <Coins className="text-yellow-400" size={20} />, label: "Points", bg: "bg-zinc-800/50" }
                    ].map((item, idx) => (
                      <button key={idx} className={`flex flex-col items-center justify-center p-3 rounded-xl ${item.bg} hover:bg-zinc-800 transition-colors group`}>
                        <div className="mb-2 p-1 rounded-lg bg-zinc-900/50 group-hover:scale-110 transition-transform">
                          {item.icon}
                        </div>
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">{item.label}</span>
                      </button>
                    ))}
                  </div>

                  <DropdownMenuSeparator className="bg-zinc-800/50" />

                  {/* List Actions */}
                  <div className="p-2 space-y-0.5">
                    {[
                      { icon: <Beaker size={18} />, label: "Try New Features" },
                      { icon: <ShoppingBag size={18} />, label: "Orders" },
                      { icon: <SquareTerminal size={18} />, label: "My Playgrounds" },
                      { icon: <Settings size={18} />, label: "Settings" },
                    ].map((item, idx) => (
                      <DropdownMenuItem key={idx} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white focus:bg-zinc-800 focus:text-white cursor-pointer transition-colors group">
                        <span className="text-zinc-500 group-hover:text-zinc-300">{item.icon}</span>
                        <span className="text-sm font-medium">{item.label}</span>
                      </DropdownMenuItem>
                    ))}
                    
                    <DropdownMenuItem className="flex items-center justify-between px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white focus:bg-zinc-800 focus:text-white cursor-pointer transition-colors group">
                      <div className="flex items-center gap-3">
                        <span className="text-zinc-500 group-hover:text-zinc-300"><SunMoon size={18} /></span>
                        <span className="text-sm font-medium">Appearance</span>
                      </div>
                      <ChevronRight size={14} className="text-zinc-600" />
                    </DropdownMenuItem>
                  </div>

                  <DropdownMenuSeparator className="bg-zinc-800/50" />

                  <div className="p-2">
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-3 rounded-lg text-rose-400 hover:text-rose-300 focus:bg-rose-500/10 focus:text-rose-300 cursor-pointer transition-colors group"
                    >
                      <LogOut size={18} />
                      <span className="text-sm font-bold">Sign Out</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <button 
                onClick={() => router.push('/signin')}
                className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button 
                onClick={() => router.push('/signup')}
                className="px-5 py-2 text-sm font-bold bg-white text-black rounded-full hover:bg-indigo-50 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          )}

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
          <Link href="/problems" className="block text-lg text-zinc-400 font-medium" onClick={() => setIsMenuOpen(false)}>Problem Sets</Link>
          <a href="#contests" className="block text-lg text-zinc-400 font-medium" onClick={() => setIsMenuOpen(false)}>Contests</a>
          <hr className="border-white/10" />
          {isAuthenticated ? (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 px-2">
                 <Avatar className="h-10 w-10 border border-white/10">
                    <AvatarImage src={picture || ""} alt={name} />
                    <AvatarFallback className="bg-zinc-800 text-zinc-400">
                      {getInitials(name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-white">{name}</div>
                    <div className="text-xs text-orange-400">Premium Member</div>
                  </div>
              </div>
              <button onClick={handleLogout} className="w-full text-left py-3 px-2 text-rose-400 font-bold flex items-center gap-2">
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          ) : (
            <>
              <button onClick={() => { router.push('/signin'); setIsMenuOpen(false); }} className="w-full text-left py-2 text-zinc-400 font-medium">Sign In</button>
              <button onClick={() => { router.push('/signup'); setIsMenuOpen(false); }} className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-3 rounded-xl font-bold">Sign Up</button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;

