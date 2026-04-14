import React, { useState } from 'react';
import { useHealth } from '../contexts/HealthContext';
import { Camera, Mic, Utensils, CheckCircle, Fingerprint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SmartLogger() {
  const { addLog } = useHealth();
  const navigate = useNavigate();
  const [method, setMethod] = useState('manual');
  const [logged, setLogged] = useState(false);
  const [scanning, setScanning] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  
  const handleLog = (e) => {
    e.preventDefault();
    if (!name || !calories) return;
    
    setScanning(true);
    setTimeout(() => {
        addLog({
          name,
          calories: parseInt(calories) || 0,
          protein: parseInt(protein) || 0,
          carbs: parseInt(carbs) || 0,
          fat: parseInt(fat) || 0
        });
        
        setScanning(false);
        setLogged(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
    }, 1000);
  };

  return (
    <div className="p-6 md:p-12 pb-32 max-w-5xl mx-auto w-full">
      <header className="mb-10 animate-fade-in relative">
        <h1 className="font-display text-4xl font-bold tracking-tight text-zinc-300">Capture</h1>
        <p className="text-primary mt-2 tracking-widest uppercase text-xs font-semibold">
          Data Intake Module
        </p>
      </header>

      {!logged ? (
        <>
          <div className="glass-panel p-1.5 flex mb-8 relative z-10 w-full max-w-sm rounded-2xl mx-auto backdrop-blur-3xl">
            <button 
              className={`flex-1 py-3 text-xs uppercase tracking-widest font-bold rounded-xl transition-all duration-300 ${method === 'camera' ? 'bg-primary/20 text-primary shadow-glow' : 'text-zinc-400 hover:bg-white/5'}`}
              onClick={() => setMethod('camera')}
            >
              <Camera className="w-4 h-4 mx-auto mb-2" /> Vision
            </button>
            <button 
              className={`flex-1 py-3 text-xs uppercase tracking-widest font-bold rounded-xl transition-all duration-300 ${method === 'voice' ? 'bg-primary/20 text-primary shadow-glow' : 'text-zinc-400 hover:bg-white/5'}`}
              onClick={() => setMethod('voice')}
            >
               <Mic className="w-4 h-4 mx-auto mb-2" /> NLP
            </button>
            <button 
              className={`flex-1 py-3 text-xs uppercase tracking-widest font-bold rounded-xl transition-all duration-300 ${method === 'manual' ? 'bg-primary/20 text-primary shadow-glow' : 'text-zinc-400 hover:bg-white/5'}`}
              onClick={() => setMethod('manual')}
            >
              <Utensils className="w-4 h-4 mx-auto mb-2" /> Manual
            </button>
          </div>

          <div className="glass-panel p-6 md:p-8 relative">
            {scanning && (
                <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-xl rounded-3xl flex flex-col items-center justify-center">
                   <Fingerprint className="w-16 h-16 text-primary animate-pulse-slow mb-4" />
                   <div className="font-display text-primary tracking-widest uppercase text-sm animate-pulse">Processing...</div>
                </div>
            )}
            
            {method !== 'manual' && (
              <div className="bg-black/40 border border-white/5 h-48 rounded-2xl flex flex-col items-center justify-center mb-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
                <div className="w-full absolute left-0 top-1/2 h-0.5 bg-primary/30 blur-sm animate-pulse-slow"></div>
                <p className="font-sans text-sm text-primary w-3/4 text-center font-medium z-10 relative">
                  {method === 'camera' ? ">> Awaiting visual feed..." : ">> Awaiting audio input..."}
                </p>
                <p className="text-xs text-zinc-400 mt-4 z-10 uppercase tracking-widest">Simulation Mode Active</p>
              </div>
            )}

            <form onSubmit={handleLog} className="flex flex-col gap-5">
              <div>
                <label className="text-xs uppercase font-bold tracking-widest text-zinc-500 mb-2 block">Item Identified</label>
                <input className="input-field" placeholder="e.g. Avocado Toast" value={name} onChange={e => setName(e.target.value)} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase font-bold tracking-widest text-primary mb-2 block">Calories (kcal)</label>
                  <input className="input-field focus:border-primary focus:ring-primary" type="number" placeholder="0" value={calories} onChange={e => setCalories(e.target.value)} required />
                </div>
                <div>
                  <label className="text-xs uppercase font-bold tracking-widest text-zinc-500 mb-2 block">Protein (g)</label>
                  <input className="input-field" type="number" placeholder="0" value={protein} onChange={e => setProtein(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs uppercase font-bold tracking-widest text-zinc-500 mb-2 block">Carbs (g)</label>
                  <input className="input-field" type="number" placeholder="0" value={carbs} onChange={e => setCarbs(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs uppercase font-bold tracking-widest text-zinc-500 mb-2 block">Fat (g)</label>
                  <input className="input-field" type="number" placeholder="0" value={fat} onChange={e => setFat(e.target.value)} />
                </div>
              </div>

              <button type="submit" className="btn-primary mt-4 w-full flex items-center justify-center gap-2">
                 Synchronize Data
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="glass-panel py-20 flex flex-col items-center justify-center text-center animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full"></div>
          <div className="relative z-10">
              <CheckCircle className="w-20 h-20 text-primary mx-auto mb-6 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              <h2 className="font-display text-3xl font-bold mb-3 text-zinc-300">Sync Complete</h2>
              <p className="text-zinc-400 tracking-wide text-sm">Data has been appended to the grid.</p>
          </div>
        </div>
      )}
    </div>
  );
}
