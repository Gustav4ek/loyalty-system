// components/AchievementsContainer.js
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
        {achievements.map((achievement) => (
          <div 
            key={achievement.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
                <div className="mt-2">
                  <progress 
                    value={achievement.UserAchievement?.progress || 0} 
                    max={achievement.target}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm mt-1">
                    <span>
                      {achievement.UserAchievement?.isCompleted ? 'Завершено' : 'В процессе'}
                    </span>
                    <span>
                      {achievement.UserAchievement?.progress || 0}/{achievement.target}
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
        ))}
      </div>
    </div>
  );
}