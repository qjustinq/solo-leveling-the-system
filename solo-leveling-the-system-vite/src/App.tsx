import { useState } from 'react';

type StatType = 'STR' | 'AGI' | 'VIT' | 'INT' | 'PER';

type Quest = {
  id: number;
  title: string;
  xpReward: number;
  completed: boolean;
};

export default function App() {
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [xpPerLevel] = useState(100);
  const [abilityPoints, setAbilityPoints] = useState(0);
  const [stats, setStats] = useState({
    STR: 5,
    AGI: 5,
    VIT: 5,
    INT: 5,
    PER: 5,
  });

  const generateQuests = (): Quest[] => {
    const questPool: Quest[] = [
      { id: 101, title: 'Do 30 Squats', xpReward: 25, completed: false },
      { id: 102, title: 'Drink 2L of Water', xpReward: 15, completed: false },
      { id: 103, title: 'Meditate for 10 Minutes', xpReward: 20, completed: false },
      { id: 104, title: 'Do 10 Pull-Ups', xpReward: 35, completed: false },
      { id: 105, title: 'Walk 5,000 Steps', xpReward: 30, completed: false },
      { id: 106, title: 'Hold a Plank for 1 Minute', xpReward: 20, completed: false },
      { id: 106, title: 'Do 10 Push-Ups', xpReward: 35, completed: false },
    ];
    const shuffled = [...questPool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const startCooldown = (seconds: number) => {
    setCooldown(seconds);
    const interval = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  

  const [quests, setQuests] = useState<Quest[]>(generateQuests());
  const [cooldown, setCooldown] = useState(0);

  const gainXp = (amount: number) => {
    const totalXp = xp + amount;
    if (totalXp >= xpPerLevel) {
      const leftover = totalXp % xpPerLevel;
      const levelsGained = Math.floor(totalXp / xpPerLevel);
      setLevel(prev => prev + levelsGained);
      setAbilityPoints(prev => prev + levelsGained * 3); // 3 points per level
      setXp(leftover);
    } else {
      setXp(totalXp);
    }
  };

  const completeQuest = (id: number) => {
    setQuests(prev =>
      prev.map(q => (q.id === id ? { ...q, completed: true } : q))
    );
    const quest = quests.find(q => q.id === id);
    if (quest) gainXp(quest.xpReward);
  };

  const increaseStat = (stat: StatType) => {
    if (abilityPoints <= 0) return;
    setStats(prev => ({ ...prev, [stat]: prev[stat] + 1 }));
    setAbilityPoints(prev => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col items-center justify-center font-mono p-4 space-y-6">
      {/* Status Panel */}
      <div className="relative w-full max-w-md bg-[#1a1a2e] bg-opacity-90 rounded-xl border border-purple-700 shadow-2xl p-6 space-y-4 animate-fadeIn">
        <h1 className="text-center text-3xl font-extrabold tracking-widest text-purple-400">STATUS</h1>
        <div className="text-center text-white text-2xl font-bold">Level {level}</div>
        <div className="text-center text-sm text-purple-400 mb-2">XP: {xp} / {xpPerLevel}</div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          {(Object.keys(stats) as StatType[]).map(stat => (
            <div key={stat} className="flex justify-between items-center bg-black bg-opacity-40 px-4 py-2 rounded-md border border-purple-700 animate-bounceIn">
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

        <div className="text-center text-purple-400">
          Ability Points: <span className="text-white font-bold">{abilityPoints}</span>
        </div>
      </div>

      {/* Quest Panel */}
      <div className="w-full max-w-md bg-[#141422] border border-purple-700 shadow-lg rounded-xl p-4 space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-purple-300">🧭 Quests</h2>
          <button
            disabled={cooldown > 0}
            onClick={() => {
              setQuests(generateQuests());
              startCooldown(3); // 10 second cooldown
            }}
            className={`text-sm px-3 py-1 rounded border transition
              ${cooldown > 0 
                ? 'border-gray-500 text-gray-400 cursor-not-allowed' 
                : 'border-blue-400 text-blue-300 hover:bg-blue-600 hover:text-white'}`}
          >
            {cooldown > 0 ? `Wait ${cooldown}s` : '🔄 Refresh'}
          </button>
        </div>
        {quests.map(q => (
          <div
            key={q.id}
            className={`flex justify-between items-center p-3 rounded-md border ${
              q.completed ? 'border-gray-600 bg-gray-800 text-gray-400' : 'border-purple-600 bg-black bg-opacity-50'
            }`}
          >
            <div className="flex flex-col">
              <span>{q.title}</span>
              <span className="text-xs text-purple-400">+{q.xpReward} XP</span>
            </div>
            <button
              disabled={q.completed}
              onClick={() => completeQuest(q.id)}
              className={`px-3 py-1 text-sm font-semibold border rounded ${
                q.completed
                  ? 'border-gray-500 text-gray-500 cursor-not-allowed'
                  : 'border-green-400 text-green-400 hover:bg-green-600 hover:text-white'
              }`}
            >
              {q.completed ? 'Done' : 'Complete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
