export type ThemeName = 'darkArcane' | 'frostMonarch' | 'berserkerFlame' | 'terminalBlack';

export const themes = {
  darkArcane: {
    name: 'Dark Arcane',
    gradient: 'from-[#0f0c29] via-[#302b63] to-[#24243e]',
    xpBar: 'bg-purple-500',
    accentText: 'text-purple-300',
    border: 'border-purple-700',
    coinText: 'text-yellow-400',
  },
  frostMonarch: {
    name: 'Frost Monarch',
    gradient: 'from-[#0f172a] via-[#1e293b] to-[#1e40af]',
    xpBar: 'bg-blue-400',
    accentText: 'text-sky-300',
    border: 'border-blue-700',
    coinText: 'text-cyan-300',
  },
  berserkerFlame: {
    name: 'Berserker Flame',
    gradient: 'from-[#1f1f1f] via-[#3a0d0d] to-[#7f1d1d]',
    xpBar: 'bg-red-500',
    accentText: 'text-red-300',
    border: 'border-red-600',
    coinText: 'text-yellow-300',
  },
  terminalBlack: {
    name: 'Terminal Black',
    gradient: 'from-black via-zinc-800 to-zinc-900',
    xpBar: 'bg-green-400',
    accentText: 'text-green-300',
    border: 'border-green-700',
    coinText: 'text-green-400',
  },
};
