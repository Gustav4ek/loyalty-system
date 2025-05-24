import { useEffect, useState } from 'react';
import api from '../../../api/axios';

export default function TrailsContainer() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/api/orders');
        console.log('Ответ сервера:', response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Полная ошибка:', error.response);
        console.error('Ошибка:', error);
        alert('Не удалось загрузить историю');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) return <div className="text-center p-6">Загрузка...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">История покупок пуста</p>
      ) : (
        orders.map((order, index) => {
          const [departure, arrival] = order.route.split(' — ');
          const hasDiscount = order.pointsUsed > 0;
          console.log(order);
          console.log(order.loyaltyLevel);
          console.log(order.durationMinutes);
          const hasDrink = order.loyaltyLevel === 'VIP' && order.durationMinutes >= 180;
          console.log(hasDrink);
          return (
            <div key={order.id} className="mb-6 last:mb-0">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="font-semibold text-gray-700">{departure}</p>
                    <p className="text-gray-500 text-sm">
                      {formatDate(order.departureDate)} {order.departure}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-700">{arrival}</p>
                    <p className="text-gray-500 text-sm">
                      {formatDate(order.arrivalDate)} {order.arrival}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{order.trainNumber}</span>
                    <span className={`font-semibold ${
                      hasDiscount ? 'text-orange-500' : 'text-blue-600'
                    }`}>
                      {hasDiscount && (
                        <span className="line-through text-gray-400 mr-2">
                          {order.price} BYN
                        </span>
                      )}
                      {order.finalPrice} BYN
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <div className="text-gray-600">
                      {order.seatType} • {order.type}
                    </div>
                    {hasDiscount && (
                      <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded">
                        -{order.pointsUsed} баллов
                      </span>
                    )}
                  </div>
                </div>
                {hasDrink && (
          <div className="mt-3 flex items-center gap-2 text-green-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4h2v2H9V4zm0 3h2v2H9V7zm0 3h2v5H9v-5z"/>
              <path fillRule="evenodd" d="M3 17a2 2 0 012-2h10a2 2 0 012 2H3zm12-2H5a1 1 0 00-1 1h12a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
            <span className="text-sm font-medium">Бесплатный чай/кофе</span>
          </div>
        )}
              </div>
              
              {index !== orders.length - 1 && (
                <hr className="my-6 border-t border-dashed border-gray-200" />
              )}


            </div>
          );
        })
      )}
    </div>
  );
}