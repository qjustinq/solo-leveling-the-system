import { useEffect, useState } from 'react';
import SoloLevelingLogo from './assets/solo-leveling-logo.png';
import ShopPanel from './components/ShopPanel';


type StatType = 'STR' | 'AGI' | 'VIT' | 'INT' | 'PER';

type Quest = {
  id: number;
  title: string;
  xpReward: number;
  coinReward: number;
  completed: boolean;
  isCustom: boolean;
};



export default function App() {
  const [level, setLevel] = useState(0);
  const [xp, setXp] = useState(0);
  const [xpPerLevel] = useState(100);
  const [abilityPoints, setAbilityPoints] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    STR: 0,
    AGI: 0,
    VIT: 0,
    INT: 0,
    PER: 0,
  });

  
  const [newQuestTitle, setNewQuestTitle] = useState('');
  const [newQuestXp, setNewQuestXp] = useState(10);
  const [coins, setCoins] = useState(0);
  const [showShop, setShowShop] = useState(false);


  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  

  const generateQuests = (): Quest[] => {
    const questPool: Quest[] = [
      { id: 1, title: 'Do 30 Squats', xpReward: 25, coinReward: 10, completed: false, isCustom: false },
      { id: 2, title: 'Drink 2L of Water', xpReward: 15, coinReward: 5, completed: false, isCustom: false },
      { id: 3, title: 'Meditate for 10 Minutes', xpReward: 20, coinReward: 7, completed: false, isCustom: false },
      { id: 4, title: 'Do 10 Pull-Ups', xpReward: 35, coinReward: 15, completed: false, isCustom: false },
      { id: 5, title: 'Walk 5,000 Steps', xpReward: 30, coinReward: 12, completed: false, isCustom: false },
      { id: 6, title: 'Hold a Plank for 1 Minute', xpReward: 20, coinReward: 8, completed: false, isCustom: false },
      { id: 7, title: 'Do 10 Push-Ups', xpReward: 35, coinReward: 15, completed: false, isCustom: false },
    ];
    const shuffled = [...questPool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };
  

  const [quests, setQuests] = useState<Quest[]>(generateQuests());
  const [currentTime, setCurrentTime] = useState(new Date());

  const gainXp = (amount: number) => {
    const totalXp = xp + amount;
    if (totalXp >= xpPerLevel) {
      const leftover = totalXp % xpPerLevel;
      const levelsGained = Math.floor(totalXp / xpPerLevel);
      setLevel(prev => prev + levelsGained);
      setAbilityPoints(prev => prev + levelsGained * 3);
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
    if (quest && !quest.completed) {
      gainXp(quest.xpReward);
      setCoins(prev => prev + quest.coinReward);
    }
  };
  

  const deleteQuest = (id: number) => {
    setQuests(prev => prev.filter(q => q.id !== id));
  };

  const increaseStat = (stat: StatType) => {
    if (abilityPoints <= 0) return;
    setStats(prev => ({ ...prev, [stat]: prev[stat] + 1 }));
    setAbilityPoints(prev => prev - 1);
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

  
  const getHunterRank = (lvl: number): string => {
    if (lvl >= 150) return 'Nation Rank';
    if (lvl >= 100) return 'S Rank';
    if (lvl >= 76) return 'A Rank';
    if (lvl >= 51) return 'B Rank';
    if (lvl >= 26) return 'C Rank';
    if (lvl >= 11) return 'D Rank';
    return 'E Rank';
  };
  

  const allQuestsCompleted = quests.every(q => q.completed);

    // Save to localStorage
  useEffect(() => {
    localStorage.setItem('hunter-data', JSON.stringify({ level, xp, stats, abilityPoints }));
  }, [level, xp, stats, abilityPoints]);

  // Load on startup
  useEffect(() => {
    const saved = localStorage.getItem('hunter-data');
    if (saved) {
      const parsed = JSON.parse(saved);
      setLevel(parsed.level);
      setXp(parsed.xp);
      setStats(parsed.stats);
      setAbilityPoints(parsed.abilityPoints);
    }
  }, []);

  //LOADING SCREEN
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 animate-fadeIn">
        <img
          src={SoloLevelingLogo}
          alt="Loading Logo"
          className="w-72 md:w-96 animate-pulse"
        />
        <p className="mt-6 text-purple-300 text-sm tracking-widest animate-fadeIn">
          System Initializing...
        </p>
      </div>
    );
  }

  const handlePurchase = (item: { name: string; cost: number }) => {
    if (coins >= item.cost) {
      setCoins(prev => prev - item.cost);
      alert(`You bought: ${item.name}`);
    } else {
      alert("Not enough coins!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col items-center justify-center font-mono p-4 space-y-6">
      {/* Logo */}
      <img
        src={SoloLevelingLogo}
        alt="Solo Leveling Logo"
        className="w-80 md:w-96 mb-6 drop-shadow-xl"
      />

      <button
        onClick={() => setShowShop(true)}
        className="text-sm px-4 py-1 rounded border border-yellow-400 text-yellow-300 hover:bg-yellow-500 hover:text-black"
      >
        🛒 Open Shop
      </button>

      


      <p className="text-purple-300 text-sm mb-4 tracking-widest">
        {currentTime.toLocaleTimeString()}
      </p>

      {/* Status Panel */}
      <div className="relative w-full max-w-md bg-[#1a1a2e] bg-opacity-90 rounded-xl border border-purple-700 shadow-2xl p-6 space-y-4 animate-fadeIn">
        <h1 className="text-center text-3xl font-extrabold tracking-widest text-purple-400">STATUS</h1>
        <div className="text-center text-white text-2xl font-bold">Level {level}</div>

        <div className="text-center text-purple-300 font-semibold">
            Hunter Rank: <span className="text-white">{getHunterRank(level)}</span>
        </div>

        <div className="text-center text-sm text-purple-400 mb-2">XP: {xp} / {xpPerLevel}</div>

        <div className="text-center text-yellow-400 font-bold mt-2">
          Coins: {coins}
        </div>


        <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">

        <div
          className="bg-purple-500 h-full transition-all"
          style={{ width: `${(xp / xpPerLevel) * 100}%` }}
        />
      </div>


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
            disabled={cooldown > 0 || !allQuestsCompleted}
            onClick={() => {
              setQuests(generateQuests());
              startCooldown(3);
            }}
            className={`text-sm px-3 py-1 rounded border transition
              ${
                !allQuestsCompleted || cooldown > 0
                  ? 'border-gray-500 text-gray-400 cursor-not-allowed'
                  : 'border-blue-400 text-blue-300 hover:bg-blue-600 hover:text-white'
              }`}
          >
            {cooldown > 0
              ? `Wait ${cooldown}s`
              : !allQuestsCompleted
              ? 'Complete All Quests'
              : '🔄 Refresh'}
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">

          <input
            type="text"
            placeholder="New quest title..."
            value={newQuestTitle}
            onChange={(e) => setNewQuestTitle(e.target.value)}
            className="flex-1 px-2 py-1 rounded bg-black text-white border border-purple-600"
          />
          <input
            type="number"
            min={1}
            max={100}
            value={newQuestXp}
            onChange={(e) => setNewQuestXp(parseInt(e.target.value))}
            className="w-20 px-2 py-1 rounded bg-black text-white border border-purple-600"
          />
          <button
            onClick={() => {
              if (newQuestTitle.trim() === '') return;

              const newQuest: Quest = {
                id: Date.now(),
                title: newQuestTitle.trim(),
                xpReward: newQuestXp,
                coinReward: Math.floor(newQuestXp / 2),
                completed: false,
                isCustom: true,
              };
              
              setQuests(prev => [...prev, newQuest]);
              setNewQuestTitle('');
              setNewQuestXp(10);
            }}
            className="px-3 py-1 rounded text-sm font-semibold border border-green-400 text-green-300 hover:bg-green-600 hover:text-white"
          >
            Add Quest
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

            {q.isCustom && !q.completed && (
              <button
                onClick={() => deleteQuest(q.id)}
                className="ml-2 text-red-400 text-xs hover:text-red-600"
              >
                🗑️ Delete
              </button>
            )}

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

      {showShop && (
        <ShopPanel
          coins={coins}
          onPurchase={handlePurchase}
          closeShop={() => setShowShop(false)}
        />
      )}
    </div>
  );
}
