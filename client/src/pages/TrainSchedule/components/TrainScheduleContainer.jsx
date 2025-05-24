import { useState, useEffect } from 'react';
import api from '../../../api/axios';

import PointsRedemptionModal from '../components/PointsRedemptionPoints';

  export default function TrainScheduleContainer() {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [userBalance, setUserBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const [userProfile, setUserProfile] = useState({
      loyaltyLevel: 'BASE',
      birthDate: null,
      tripCount: 0,
    });

    // Загрузка баланса пользователя
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [balanceRes, profileRes] = await Promise.all([
            api.get('/api/points/balance'),
            api.get('/api/users/me')
          ]);
          
          setUserBalance(balanceRes.data.currentBalance || 0);
          setUserProfile({
            loyaltyLevel: profileRes.data.loyaltyLevel || 'BASE',
            birthDate: profileRes.data.birthDate,
            tripCount: profileRes.data.tripCount || 0,
          });
        } catch (error) {
          console.error('Ошибка загрузки баланса:', error);
        }
      };
      fetchData();
    }, []);

    const parseDuration = (duration) => {
      const hoursMatch = duration.match(/(\d+)ч/);
      const minutesMatch = duration.match(/(\d+)мин/);
      return (hoursMatch ? parseInt(hoursMatch[1]) : 0) * 60 + 
             (minutesMatch ? parseInt(minutesMatch[1]) : 0);
    };
  
    const handleBuy = async (ticket) => {
      setLoading(true);
      try {
        let alertMessage = ''
        const ticketPrice = parseFloat(ticket.price);
        const maxPoints = Math.floor(ticketPrice * 0.3 / 0.05);
        const canUsePoints = userBalance >= 100 && userBalance >= maxPoints;
        
        let pointsUsed = 0;
        if (canUsePoints) {
          const confirmUse = window.confirm(
            `Можно списать до ${maxPoints} баллов (экономия ${(maxPoints * 0.05).toFixed(2)} BYN).\nИспользовать баллы?`
          );
          
          if (confirmUse) {
            pointsUsed = Math.min(maxPoints, userBalance);
          }
        }
        
        const payload = {
          trainNumber: ticket.trainNumber,
      route: ticket.route,
      departure: ticket.departure,
      arrival: ticket.arrival,
      duration: ticket.duration,
      type: ticket.type,
      price: parseFloat(ticket.price),
      seatType: ticket.seatType,
      distance: parseInt(ticket.distance, 10),
      pointsUsed: pointsUsed,
      finalPrice: parseFloat((ticketPrice - (pointsUsed * 0.05)).toFixed(2)),
      departureDate: new Date(), // Реальная дата отправления
      arrivalDate: new Date()  
        };

  
        const response = await api.post('/api/orders', payload);
        
        if (response.status === 201) {
          const { bonuses = [] } = response.data;
          alert(`Билет куплен! ${pointsUsed > 0 
            ? `Списано баллов: ${pointsUsed} (Экономия: ${(pointsUsed * 0.05).toFixed(2)} BYN)` 
            : 'Баллы не использовались'}`);
            console.log(response.data.bonuses);
            if (response.data.bonuses) {
              if (response.data.bonuses.includes('birthday')) {
                alertMessage += '\n\n+40% баллов за бонус ко дню рождения!';
              }
              if (response.data.bonuses.includes('10th_trip')) {
                alertMessage += '\n\n+40% баллов за 10-ю поездку!';
              }
            }
              if (alertMessage!='') alert(alertMessage);
          // Обновление баланса
          const balanceResponse = await api.get('/api/points/balance');
          setUserBalance(balanceResponse.data.currentBalance);
        }
      } catch (error) {
        console.error('Полная ошибка:', error);
    const errorMessage = error.response?.data?.error 
      || error.message 
      || 'Неизвестная ошибка при покупке';
    alert(`Ошибка: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

  const tickets = [
    {
      id: 1,
      trainNumber: "735Б",
      route: "Минск-Пассажирский — Брест-Центральный",
      departure: "10:29",
      arrival: "14:18",
      duration: "3ч 49мин",
      type: "Межрегиональные линии бизнес-класса",
      price: "26.36",
      seatType: "Сидячий",
      distance: 345
    },
    {
      id: 2,
      trainNumber: "622К",
      route: "Гомель — Витебск",
      departure: "21:51",
      arrival: "07:37",
      duration: "9ч 46мин",
      type: "Межрегиональные линии экономкласса",
      price: "24.73",
      seatType: "Плацкарт",
      distance: 337
    },
    {
      id: 3,
      trainNumber: "901М",
      route: "Могилёв — Гродно",
      departure: "17:34",
      arrival: "05:44",
      duration: "12ч 10мин",
      type: "Межрегиональные линии экономкласса",
      price: "38.89",
      seatType: "Купе",
      distance: 481
    }
  ];



  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Купить билеты</h1>
        
        <div className="space-y-6">
          {tickets.map((ticket) => {
            const durationMinutes = parseDuration(ticket.duration);
          return (
            <div 
              key={ticket.id}
              className="bg-white rounded-xl shadow-lg p-5 transition-transform hover:scale-[1.02]"
            >
              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl font-bold text-blue-600">
                      {ticket.trainNumber}
                    </span>
                    <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                      {ticket.type}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-lg font-semibold">{ticket.route}</p>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-600">
                      <span>{ticket.departure}</span>
                      <span className="text-gray-400">—</span>
                      <span>{ticket.arrival}</span>
                      <span className="text-gray-400 hidden md:inline">•</span>
                      <span> {ticket.duration}</span>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm font-medium bg-gray-100 px-2.5 py-0.5 rounded-md">
                        Тип места: 
                        <span className="ml-1 text-blue-600">
                          {ticket.seatType}
                        </span>
                      </span>
                    </div>
                    {/* {userProfile.loyaltyLevel === 'VIP' && durationMinutes >= 180 && (
                      <div className="mt-2 text-sm text-green-600">
                        Бесплатный чай/кофе в пути
                      </div> )} */}
                  </div>
                  
                </div>

                <div className="flex flex-col items-end justify-between gap-3">
                  <p className="text-2xl font-bold text-gray-800 text-right">
                    {ticket.price} BYN
                  </p>
                  
                  <button 
    onClick={() => handleBuy(ticket)}
    className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto"
    disabled={loading}
  >
    {loading ? 'Покупка...' : 'Купить билет'}
  </button>
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>
      
    </div>
          );
}