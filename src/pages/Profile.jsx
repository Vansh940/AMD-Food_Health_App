import React, { useState } from 'react';
import { useHealth } from '../contexts/HealthContext';
import { User, Activity, Settings, Save } from 'lucide-react';

export default function Profile() {
  const { data, updateProfile } = useHealth();
  const [profileData, setProfileData] = useState(data.profile);
  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateProfile(profileData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 md:p-12 pb-32 max-w-5xl mx-auto w-full">
      <header className="mb-10">
        <h1 className="font-display text-4xl font-bold tracking-tight text-zinc-200">Digital Twin</h1>
        <p className="text-zinc-500 mt-2 tracking-widest uppercase text-xs font-semibold">
          Biometric Configuration
        </p>
      </header>

      <div className="space-y-8">
        <div className="glass-panel p-6 md:p-8">
           <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
             <div className="p-2 bg-emerald-900/20 rounded-lg"><User className="w-5 h-5 text-emerald-500" /></div>
             <h2 className="font-display text-xl text-zinc-300">Core Metrics</h2>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="text-xs uppercase font-bold tracking-widest text-zinc-500 mb-2 block">Age</label>
                <input className="input-field" type="number" value={profileData.age} onChange={e => handleChange('age', parseInt(e.target.value))} />
              </div>
              <div>
                <label className="text-xs uppercase font-bold tracking-widest text-zinc-500 mb-2 block">Weight (kg)</label>
                <input className="input-field" type="number" value={profileData.weight} onChange={e => handleChange('weight', parseInt(e.target.value))} />
              </div>
              <div>
                <label className="text-xs uppercase font-bold tracking-widest text-zinc-500 mb-2 block">Height (cm)</label>
                <input className="input-field" type="number" value={profileData.height} onChange={e => handleChange('height', parseInt(e.target.value))} />
              </div>
              <div>
                <label className="text-xs uppercase font-bold tracking-widest text-zinc-500 mb-2 block">Base BMR</label>
                <input className="input-field text-emerald-500 focus:border-emerald-700 focus:ring-emerald-700" type="number" value={profileData.bmr} onChange={e => handleChange('bmr', parseInt(e.target.value))} />
              </div>
           </div>
        </div>

        <div className="glass-panel p-6 md:p-8 relative overflow-hidden">
           <div className="absolute inset-0 bg-emerald-900/5 blur-2xl"></div>
           <div className="relative z-10 flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
             <div className="p-2 bg-emerald-900/20 rounded-lg"><Settings className="w-5 h-5 text-emerald-500" /></div>
             <h2 className="font-display text-xl text-zinc-300">Algorithms & Targets</h2>
           </div>
           <div className="grid grid-cols-2 gap-6 relative z-10">
              <div>
                <label className="text-xs uppercase font-bold tracking-widest text-zinc-500 mb-2 block">Caloric Ceiling</label>
                <input className="input-field font-bold font-display text-lg" type="number" value={profileData.dailyCaloriesTarget} onChange={e => handleChange('dailyCaloriesTarget', parseInt(e.target.value))} />
              </div>
              <div>
                <label className="text-xs uppercase font-bold tracking-widest text-zinc-500 mb-2 block">Protein Target</label>
                <input className="input-field font-bold font-display text-lg" type="number" value={profileData.dailyProteinTarget} onChange={e => handleChange('dailyProteinTarget', parseInt(e.target.value))} />
              </div>
           </div>
        </div>

        <div className="glass-panel p-6 md:p-8">
           <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-zinc-800/50 rounded-lg"><Activity className="w-5 h-5 text-zinc-400" /></div>
             <h2 className="font-display text-xl text-zinc-300">Data Sources</h2>
           </div>
           
           <div className="space-y-3">
               <div className="bg-zinc-950/50 border border-emerald-900/30 rounded-xl p-4 flex justify-between items-center transition-all hover:bg-zinc-950 hover:border-emerald-900/50 relative overflow-hidden">
                 <div className="absolute right-0 top-0 bottom-0 w-32 bg-emerald-900/10 blur-xl"></div>
                 <div className="flex items-center gap-4 relative z-10">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm"></div>
                     <span className="font-medium text-zinc-300 text-sm">Apple HealthKit</span>
                 </div>
                 <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest relative z-10">Active</span>
               </div>
               
               <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-xl p-4 flex justify-between items-center opacity-50 hover:opacity-80 transition-all cursor-not-allowed">
                 <div className="flex items-center gap-4">
                     <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                     <span className="font-medium text-zinc-400 text-sm">Dexcom G7</span>
                 </div>
                 <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Connect</span>
               </div>
           </div>
        </div>

        <button className={`btn-primary w-full flex items-center justify-center gap-2 ${saved ? 'bg-emerald-700 hover:bg-emerald-700 text-emerald-50' : ''}`} onClick={handleSave}>
          <Save className="w-4 h-4" /> {saved ? "Preferences Locked" : "Commit Changes"}
        </button>
      </div>
    </div>
  );
}
