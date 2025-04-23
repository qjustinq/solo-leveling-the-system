import { useState } from 'react';

type StatType = 'STR' | 'AGI' | 'VIT' | 'INT' | 'PER';

export default function App() {
  const [level, setLevel] = useState(12);
  const [abilityPoints, setAbilityPoints] = useState(3);
  const [stats, setStats] = useState({
    STR: 239,
    AGI: 235,
    VIT: 211,
    INT: 240,
    PER: 207,
  });

  const increaseStat = (stat: StatType) => {
    if (abilityPoints <= 0) return;

    setStats(prev => ({
      ...prev,
      [stat]: prev[stat] + 1,
    }));
    setAbilityPoints(prev => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex items-center justify-center font-mono px-4">
      <div className="relative w-full max-w-md bg-[#1a1a2e] bg-opacity-90 rounded-xl border border-purple-700 shadow-2xl p-6 space-y-4 animate-fadeIn">
        {/* Glowing Top Border */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-purple-500 blur-md animate-pulse" />

        {/* STATUS */}
        <h1 className="text-center text-3xl font-extrabold tracking-widest text-purple-400">STATUS</h1>

        {/* LEVEL */}
        <div className="flex justify-center items-center text-5xl font-extrabold text-white gap-3">
          {level}
          <span className="text-lg font-semibold tracking-widest">LEVEL</span>
        </div>

        {/* CLASS + TITLE */}
        <div className="text-center text-purple-300 italic text-sm">
          <p className="font-semibold">Shadow Monarch</p>
          <p>"The One Who Overcame Adversity"</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
          {(Object.keys(stats) as StatType[]).map((stat) => (
            <div
              key={stat}
              className="flex justify-between items-center bg-black bg-opacity-40 px-4 py-2 rounded-md border border-purple-700 animate-bounceIn"
            >
              <span className="font-semibold">{stat}</span>
              <div className="flex items-center gap-2">
                <span>{stats[stat]}</span>
                <button
                  disabled={abilityPoints <= 0}
                  onClick={() => increaseStat(stat)}
                  className={`text-green-400 text-xs px-2 py-0.5 rounded border border-green-500 hover:bg-green-700 transition ${
                    abilityPoints <= 0 ? 'opacity-30 cursor-not-allowed' : ''
                  }`}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ABILITY POINTS */}
        <div className="mt-4 text-center text-purple-400">
          Ability Points: <span className="text-white font-bold">{abilityPoints}</span>
        </div>

        {/* Glowing Bottom Border */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-500 blur-md animate-pulse" />
      </div>
    </div>
  );
}
