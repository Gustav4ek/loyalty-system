export default function AchievementsContainer() {
  const achievements = [
    { 
      title: "Первый рейс",
      description: "Совершить 1 поездку",
      status: "Завершено",
      progress: "1/1",
      isCompleted: true,
      icon: '/icons/achievements/railway.png',
      points: 50 // Добавлено
    },
    { 
      title: "Эксперт купе",
      description: "Совершить 10 поездок в купе",
      status: "В процессе",
      progress: "0/10",
      isCompleted: false,
      icon: '/icons/achievements/train.png',
      points: 100 // Добавлено
    },
    { 
      title: "Эко-путешественник",
      description: "Совершить 5 поездок без бумажного билета",
      status: "В процессе",
      progress: "0/5",
      isCompleted: false,
      icon: '/icons/achievements/train-station.png',
      points: 75 // Добавлено
    },
    { 
      title: "Ежемесячный марафон",
      description: "Совершить 5 поездок за месяц",
      status: "В процессе",
      progress: "0/5",
      isCompleted: false,
      icon: '/icons/achievements/train-ticket.png',
      points: 90 // Добавлено
    },
    { 
      title: "Дружественный состав",
      description: "Пригласить 3 друзей",
      status: "В процессе",
      progress: "0/3",
      isCompleted: false,
      icon: '/icons/achievements/friends.png',
      points: 60 // Добавлено
    },
    { 
      title: "Исследователь БЧ",
      description: "Поездки по 7 разным направлениям",
      status: "В процессе",
      progress: "0/7",
      isCompleted: false,
      icon: '/icons/achievements/bench.png',
      points: 150 // Добавлено
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Список доступных достижений</h1>
      
      <div className="space-y-6">
        {achievements.map((achievement, index) => (
          <section 
            key={index}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative"
          >
            {/* Иконка - абсолютное позиционирование */}
            <div className="absolute top-3 right-3">
              <img 
                src={achievement.icon} 
                alt="Иконка достижения"
                className="w-6 h-6"
              />
            </div>
            
            <div className="flex items-start justify-between">
              <div className="pr-8">
                <h2 className="text-xl font-semibold mb-2">{achievement.title}</h2>
                <p className="text-gray-600 mb-3">{achievement.description}</p>
              </div>
              
              {/* Блок с баллами - добавлен margin-right */}
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-10"> {/* Добавлен mr-10 */}
                +{achievement.points} баллов
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <span className={`text-sm ${
                achievement.isCompleted ? 'text-green-600' : 'text-gray-500'
              }`}>
                {achievement.status}
              </span>
              <span className="text-gray-500 text-sm">{achievement.progress}</span>
            </div>
          </section>
        ))}
      </div>

      <p className="mt-8 text-sm text-gray-600">
        <strong>Все награды за достижения доступны к получению всего 1 раз,</strong><br />
        баллы начисляются автоматически после выполнения задания
      </p>
    </div>
  );
  }