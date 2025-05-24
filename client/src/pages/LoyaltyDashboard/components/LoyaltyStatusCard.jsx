import React from "react";

const LoyaltyStatusCard = ({ 
  lifetimePoints = 0, 
  nextLevel = {}, 
  currentLevel = 'BASE' 
}) => {
  const levels = [
    { name: 'BASE', displayName: 'Базовый', threshold: 0 },
    { name: 'STANDARD', displayName: 'Стандарт', threshold: 200 },
    { name: 'PREMIUM', displayName: 'Премиум', threshold: 500 },
    { name: 'VIP', displayName: 'VIP', threshold: 800 }
  ];

  const currentLevelConfig = levels.find(l => l.name === currentLevel) || levels[0];
  const progress = Math.min((lifetimePoints / 800) * 100, 100);

  return (
    <article className="flex flex-col p-4 lg:p-6 w-full rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <h2 className="text-lg font-bold text-sky-950">Ваш текущий статус</h2>
        <span className="text-lg font-semibold text-blue-600">
          {currentLevelConfig.displayName}
        </span>
      </div>

      <div className="mt-6 w-full">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          {levels.map(level => (
            <span key={level.threshold}>{level.threshold}</span>
          ))}
        </div>
        
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute left-0 top-0 h-full bg-blue-600 transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 text-sm text-gray-700">
          {currentLevel === 'VIP' ? (
            <span>Вы достигли максимального статуса</span>
          ) : (
            <>
              <span className="font-semibold text-blue-600">
                До {levels[levels.findIndex(l => l.name === currentLevel) + 1]?.displayName || 'VIP'}: 
                {' '}{nextLevel.requiredPoints || 0} баллов
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default LoyaltyStatusCard;