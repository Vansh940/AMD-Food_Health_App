import React from 'react';
import { useHealth } from '../contexts/HealthContext';
import { Activity, Flame, Utensils, Zap, Droplet, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { data, getTodayTotals } = useHealth();
  const navigate = useNavigate();
  const totals = getTodayTotals();
  const { dailyCaloriesTarget, dailyProteinTarget, dailyCarbsTarget, dailyFatTarget } = data.profile;

  const calPct = Math.min((totals.calories / dailyCaloriesTarget) * 100, 100);
  const proPct = Math.min((totals.protein / dailyProteinTarget) * 100, 100);
  const carbPct = Math.min((totals.carbs / dailyCarbsTarget) * 100, 100);
  const fatPct = Math.min((totals.fat / dailyFatTarget) * 100, 100);

  return (
    <div className="p-6 md:p-12 pb-32 max-w-7xl mx-auto w-full">
      <header className="mb-10 flex justify-between items-center animate-fade-in">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-zinc-200">
            Vitality
          </h1>
          <p className="text-zinc-400 mt-2 tracking-widest uppercase text-xs font-semibold">
            Health Intelligence Engine
          </p>
        </div>
        <div className="group relative cursor-pointer">
          <div className="absolute inset-0 bg-primary/30 blur-md rounded-full group-hover:bg-primary/50 transition duration-300"></div>
          <div className="w-14 h-14 relative bg-black/40 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
            <span className="font-display text-xl bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent font-bold">U</span>
          </div>
        </div>
      </header>

      {/* Hero Insight Card */}
      <div className="glass-panel p-8 mb-10 relative overflow-hidden group">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="relative">
            {/* Ambient Background Glow for the Ring */}
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full"></div>
            <PremiumProgressRing percentage={calPct} size={200} strokeWidth={8} color="rgba(99, 102, 241, 1)" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Flame className="text-primary w-8 h-8 mb-1" />
              <div className="font-display text-4xl font-bold text-zinc-300 tracking-tighter">
                {totals.calories}
              </div>
              <p className="text-zinc-400 text-xs uppercase tracking-widest font-bold">/ {dailyCaloriesTarget} kcal</p>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-display text-3xl font-light mb-2 text-zinc-300">Daily Synthesis</h2>
            <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent mb-6"></div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary"></div>
              <p className="text-sm leading-relaxed text-text">
                <strong className="text-primary font-medium mr-2 tracking-wide uppercase text-xs">AI Insight Insight:</strong>
                {totals.calories < dailyCaloriesTarget 
                  ? `You are in a ${dailyCaloriesTarget - totals.calories} kcal deficit. Optimize recovery with a protein-forward snack.`
                  : "You've reached your energetic threshold. Focus on hydration for the remainder of the day."}
              </p>
            </div>
            
            <button onClick={() => navigate('/log')} className="mt-8 group flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-primary hover:text-zinc-300 transition-colors duration-300">
               Log Intake <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Macro Grid */}
      <h3 className="font-display text-xl font-medium mb-5 text-zinc-300/90">Macronutrient Profile</h3>
      <div className="grid grid-cols-3 gap-6 mb-12">
        <MacroCard label="Protein" pct={proPct} curr={totals.protein} total={dailyProteinTarget} unit="g" icon={<Utensils className="text-indigo-400 w-5 h-5" />} color="rgba(99, 102, 241, 1)" />
        <MacroCard label="Carbs" pct={carbPct} curr={totals.carbs} total={dailyCarbsTarget} unit="g" icon={<Zap className="text-secondary w-5 h-5" />} color="rgba(14, 165, 233, 1)" />
        <MacroCard label="Fat" pct={fatPct} curr={totals.fat} total={dailyFatTarget} unit="g" icon={<Droplet className="text-purple-400 w-5 h-5" />} color="rgba(192, 132, 252, 1)" />
      </div>

      {/* Activity Log */}
      <div className="flex justify-between items-end mb-5">
        <h3 className="font-display text-xl font-medium text-zinc-300/90">Timeline</h3>
      </div>
      
      <div className="space-y-4 relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10"></div>
        {data.logs.length === 0 ? (
           <div className="glass-panel p-8 text-center text-zinc-400">No interactions recorded in the timeline.</div>
        ) : (
          data.logs.slice(0, 5).map((log, i) => (
            <div key={log.id} className="glass-panel p-4 flex justify-between items-center relative pl-16 hover:-translate-y-1 transition-transform cursor-pointer">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary z-10"></div>
              
              <div>
                <p className="font-medium text-zinc-300">{log.name}</p>
                <p className="text-xs text-zinc-400 tracking-wider uppercase">{new Date(log.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              </div>
              <div className="font-display font-bold text-xl text-primary">
                +{log.calories} <span className="text-xs font-normal text-zinc-400">kcal</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function MacroCard({ label, pct, curr, total, unit, icon, color }) {
  return (
    <div className="glass-panel p-5 flex flex-col items-center justify-center text-center group">
      <div className="mb-4 p-3 bg-white/5 rounded-full ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300 shadow-glow">
        {icon}
      </div>
      <PremiumProgressRing percentage={pct} size={70} strokeWidth={4} color={color} />
      <div className="mt-4">
        <p className="text-xs uppercase font-bold tracking-widest text-zinc-400 mb-1">{label}</p>
        <p className="font-display font-medium text-zinc-300">{curr}<span className="text-xs text-zinc-400">/{total}{unit}</span></p>
      </div>
    </div>
  );
}

function PremiumProgressRing({ percentage, size, strokeWidth, color }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        className="stroke-white/5 fill-none"
      />
      {/* Progress Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="fill-none transition-all duration-1000 ease-out"
        style={{ stroke: color, filter: `drop-shadow(0 0 8px ${color})` }}
      />
    </svg>
  );
}
