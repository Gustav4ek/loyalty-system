import React from "react";

const ProgressBar = ({ current = 0, target = 100 }) => {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <div className="w-full mt-4">
      {/* Верхняя шкала значений */}
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>0</span>
        <span>{target}</span>
      </div>

      {/* Прогресс-бар */}
      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Нижняя подпись текущего прогресса */}
      <div className="text-right text-sm text-gray-700 mt-1">
        {current}/{target}
      </div>
    </div>
  );
};

export default ProgressBar;
