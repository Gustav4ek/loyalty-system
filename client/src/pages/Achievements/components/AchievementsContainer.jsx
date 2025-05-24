import { useEffect, useState } from 'react';
import api from '../../../api/axios';

export default function AchievementsContainer() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        const response = await api.get('/api/achievements');
        setAchievements(response.data);
      } catch (error) {
        console.error('Ошибка загрузки достижений:', error);
      }
    };
    loadAchievements();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Достижения</h1>

      <div className="space-y-6">
        {achievements.map((achievement) => {
          const userData = achievement.userProgress?.[0] || {};
          const isCompleted = userData.isCompleted;
          const progress = userData.progress || 0;
          const percentage = Math.min((progress / achievement.target) * 100, 100);

          return (
            <div
              key={achievement.id}
              className={`border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow ${
                isCompleted ? 'opacity-40' : ''
              }`}
            >
              <div className="flex justify-between items-start">
  {/* ИКОНКА */}
  <img
    src={achievement.icon}
    alt={`${achievement.title} icon`}
    className="w-12 h-12 mr-4 object-contain"
  />

  <div className="flex-1">
    <h3 className="text-lg font-semibold">{achievement.title}</h3>
    <p className="text-gray-600">{achievement.description}</p>

    <div className="mt-3">
      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between text-sm mt-1">
        <span className={isCompleted ? 'text-green-600' : 'text-yellow-600'}>
          {isCompleted ? 'Завершено' : 'В процессе'}
        </span>
        <span>
          {progress}/{achievement.target}
        </span>
      </div>
    </div>
  </div>

  <div className="ml-4">
    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
      +{achievement.points} баллов
    </div>
  </div>
</div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
