import React, { createContext, useContext, useState, useEffect } from 'react';

const HealthContext = createContext();

const initialData = {
  profile: {
    age: 30,
    gender: 'female',
    height: 165,
    weight: 65,
    bmr: 1450,
    dailyCaloriesTarget: 2000,
    dailyProteinTarget: 120,
    dailyCarbsTarget: 200,
    dailyFatTarget: 60,
  },
  logs: [], // Array of meal logs { id, name, calories, protein, carbs, fat, timestamp }
};

export const HealthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem('vitality_data');
    return stored ? JSON.parse(stored) : initialData;
  });

  useEffect(() => {
    localStorage.setItem('vitality_data', JSON.stringify(data));
  }, [data]);

  const addLog = (log) => {
    setData(prev => ({
      ...prev,
      logs: [{ ...log, id: Date.now(), timestamp: new Date().toISOString() }, ...prev.logs]
    }));
  };

  const updateProfile = (profileData) => {
    setData(prev => ({ ...prev, profile: { ...prev.profile, ...profileData } }));
  };

  const getTodayTotals = () => {
    const today = new Date().toDateString();
    const todaysLogs = data.logs.filter(log => new Date(log.timestamp).toDateString() === today);
    return todaysLogs.reduce((acc, log) => ({
      calories: acc.calories + log.calories,
      protein: acc.protein + log.protein,
      carbs: acc.carbs + log.carbs,
      fat: acc.fat + log.fat,
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  return (
    <HealthContext.Provider value={{ data, addLog, updateProfile, getTodayTotals }}>
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => useContext(HealthContext);
