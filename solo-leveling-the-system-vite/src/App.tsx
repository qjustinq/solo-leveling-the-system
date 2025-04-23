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

  const [quests, setQuests] = useState<Quest[]>([
    { id: 1, title: 'Complete 20 Push-ups', xpReward: 20, completed: false },
    { id: 2, title: 'Run 1 Mile', xpReward: 40, completed: false },
    { id: 3, title: 'Stretch for 10 minutes', xpReward: 15, completed: false },
  ]);

  const gainXp = (amount: number) => {
    const totalXp = xp + amount;
    if (totalXp >= xpPerLevel) {
      const leftover = totalXp % xpPerLevel;
      const levelsGained = Math.floor(totalXp / xpPerLevel);
      setLevel(prev => prev + levelsGained);
      setAbilityPoints(prev => prev + levelsGained * 3); // 3 pts per level
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
        <h2 className="text-xl font-bold text-purple-300 text-center">🧭 Quests</h2>
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
