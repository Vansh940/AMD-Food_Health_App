import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Camera, User, Activity } from 'lucide-react';

export default function Navigation() {
  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col fixed inset-y-0 left-0 w-64 glass-panel rounded-none border-y-0 border-l-0 border-r border-white/10 z-50 py-8 px-6 bg-black/20">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Activity className="w-6 h-6 text-zinc-300" />
          </div>
          <h1 className="font-display font-bold text-2xl text-zinc-200">Vitality</h1>
        </div>
        
        <p className="text-xs uppercase font-bold tracking-widest text-zinc-400 mb-4 pl-4">Platform</p>
        <div className="flex flex-col gap-2">
          <NavItem to="/" icon={<LayoutDashboard className="w-5 h-5" />} label="Synthesize" />
          <NavItem to="/log" icon={<Camera className="w-5 h-5" />} label="Capture Data" />
          <NavItem to="/profile" icon={<User className="w-5 h-5" />} label="Digital Twin" />
        </div>

        <div className="mt-auto pt-8 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-2 opacity-50 cursor-not-allowed">
            <div className="w-8 h-8 rounded-full bg-white/10"></div>
            <div>
              <p className="text-xs font-semibold text-zinc-300">System Online</p>
              <p className="text-xs text-primary tracking-widest uppercase">Active</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Bar (Fallback) */}
      <nav className="md:hidden fixed bottom-0 w-full left-0 right-0 z-50">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
        <div className="relative glass-panel rounded-b-none border-b-0 border-x-0 w-full px-6 bg-black/40">
          <div className="flex justify-around items-center h-20">
            <NavItemMobile to="/" icon={<LayoutDashboard className="w-5 h-5" />} label="Synthesize" />
            <NavItemMobile to="/log" icon={<Camera className="w-5 h-5" />} label="Capture" />
            <NavItemMobile to="/profile" icon={<User className="w-5 h-5" />} label="Twin" />
          </div>
        </div>
      </nav>
    </>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 transition-all duration-300 relative group px-4 py-3 rounded-xl overflow-hidden ${
          isActive ? 'text-zinc-300 bg-white/10 shadow-[inset_0_1px_rgba(255,255,255,0.1)] border border-white/10' : 'text-zinc-400 hover:text-zinc-300 hover:bg-white/5'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
          )}
          <div className={`transition-transform duration-300 ${isActive ? 'scale-110 text-primary' : 'group-hover:scale-110 group-hover:text-zinc-300'}`}>
            {icon}
          </div>
          <span className="font-sans text-sm font-semibold tracking-wide">
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
}

function NavItemMobile({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center gap-1.5 transition-all duration-300 relative group w-20 py-2 ${
          isActive ? 'text-primary' : 'text-text-muted hover:text-zinc-300'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
          )}
          <div className={`transition-transform duration-300 ${isActive ? '-translate-y-1' : 'group-hover:-translate-y-1'}`}>
            {icon}
          </div>
          <span className={`font-sans text-[10px] uppercase font-bold tracking-widest transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
}
