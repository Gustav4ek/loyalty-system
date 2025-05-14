// LoyaltyStatusCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const LoyaltyStatusCard = ({
  currentPoints = 0,
  nextLevelPoints = 200,
  nextLevel = "Стандарт",
}) => {
  const progress = (currentPoints / 800) * 100;

  return (
    <article className="flex flex-col p-4 lg:p-6 w-full rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <h2 className="text-lg font-bold text-sky-950">СТАТУСЫ</h2>
        
        <div className="flex flex-wrap gap-3">
          {['Стандарт', 'Премиум', 'VIP'].map((status, index) => (
            <div key={status} className="flex items-center gap-2">
          
              <span className="text-sm font-bold text-sky-950">* {status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 w-full">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          {[0, 200, 500, 800].map((point, i) => (
            <span key={i}>{point}</span>
          ))}
        </div>
        
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute left-0 top-0 h-full bg-blue-600 transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 text-sm text-gray-700">
          <span className="font-semibold text-blue-600">
            Заработайте еще {nextLevelPoints} баллов
          </span>
          {' '}для получения статуса <strong>{nextLevel}</strong>
        </div>
      </div>
    </article>
  );
};

export default LoyaltyStatusCard;