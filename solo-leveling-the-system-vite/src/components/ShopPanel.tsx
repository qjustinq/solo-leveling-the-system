import React from 'react';

type ShopItem = {
  id: number;
  name: string;
  cost: number;
  description: string;
};

type Props = {
  coins: number;
  onPurchase: (item: ShopItem) => void;
  closeShop: () => void;
};

const shopItems: ShopItem[] = [
  { id: 1, name: 'Health Potion', cost: 20, description: 'Heals you after a long quest.' },
  { id: 2, name: 'Speed Boots', cost: 50, description: 'AGI +2 when equipped.' },
  { id: 3, name: 'Stat Boost Orb', cost: 100, description: '+1 to all stats.' },
];

const ShopPanel: React.FC<Props> = ({ coins, onPurchase, closeShop }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-[#141422] border border-purple-700 rounded-xl w-96 p-6 space-y-4 shadow-2xl text-white relative">
        <button
          onClick={closeShop}
          className="absolute top-2 right-3 text-red-300 hover:text-red-500 text-xl"
        >
          ✕
        </button>
        <h2 className="text-center text-2xl font-bold text-purple-300 tracking-widest">
          🛒 Hunter’s Shop
        </h2>

        <div className="space-y-4">
          {shopItems.map(item => (
            <div
              key={item.id}
              className="border border-purple-600 bg-black bg-opacity-30 rounded-md p-3 flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-purple-300">{item.description}</div>
                <div className="text-yellow-400 text-sm">Cost: {item.cost} coins </div>
              </div>
              <button
                disabled={coins < item.cost}
                onClick={() => onPurchase(item)}
                className={`ml-4 px-3 py-1 text-sm rounded border transition ${
                  coins < item.cost
                    ? 'border-gray-500 text-gray-500 cursor-not-allowed'
                    : 'border-green-400 text-green-300 hover:bg-green-600 hover:text-white'
                }`}
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPanel;
