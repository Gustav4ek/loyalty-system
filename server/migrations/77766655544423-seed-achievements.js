const initialAchievements = [
    { 
      title: "Первый рейс",
      description: "Совершить 1 поездку",
      target: 1,
      type: "TRIPS",
      seatType: null,
      points: 50,
      icon: '/icons/achievements/railway.png',
      createdAt: new Date(), // Добавлено
    updatedAt: new Date()  // Добавлено
    },
    { 
      title: "Эксперт купе",
      description: "Совершить 10 поездок в купе",
      target: 10,
      type: "SEAT_TYPE",
      seatType: "Купе",
      points: 100,
      icon: '/icons/achievements/train.png',
      createdAt: new Date(), // Добавлено
    updatedAt: new Date()  // Добавлено
    },
    { 
      title: "Ежемесячный марафон",
      description: "Совершить 5 поездок за месяц",
      target: 5,
      type: "MONTHLY",
      seatType: null,
      points: 90,
      icon: '/icons/achievements/train-ticket.png',
      createdAt: new Date(), // Добавлено
    updatedAt: new Date()  // Добавлено
    },
    { 
      title: "Дружественный состав",
      description: "Пригласить 3 друзей",
      target: 3,
      type: "FRIENDS",
      seatType: null,
      points: 60,
      icon: '/icons/achievements/friends.png',
      createdAt: new Date(), // Добавлено
      updatedAt: new Date()  // Добавлено
    },
    { 
      title: "Исследователь БЧ",
      description: "Поездки по 7 разным направлениям",
      target: 7,
      type: "ROUTES",
      seatType: null,
      points: 150,
      icon: '/icons/achievements/bench.png',
      createdAt: new Date(), // Добавлено
    updatedAt: new Date()  // Добавлено
    }
  ];
  
  module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('Achievements', initialAchievements.map(item => ({
          ...item,
          createdAt: new Date(),
          updatedAt: new Date()
        })));
      },
  
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('Achievements', null, {});
    }
  };