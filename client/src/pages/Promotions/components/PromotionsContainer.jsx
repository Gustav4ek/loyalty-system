import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';

export default function PromotionsContainer() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const res = await api.get('/api/promotions');
      setPromotions(res.data);
    } catch (err) {
      console.error('Ошибка загрузки акций:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async (promoId) => {
    try {
      const res = await api.post(`/api/promotions/${promoId}/redeem`);
      if (res.data.success) {
        setPromotions(promos => promos.filter(p => p.id !== promoId));
        alert(`Купон создан: ${res.data.code}`);
      }
    } catch (err) {
      console.error('Ошибка при активации акции:', err);
      alert(err.response?.data?.error || 'Не удалось активировать акцию');
    }
  };

  if (loading) return <p>Загрузка акций...</p>;
  if (!promotions.length) return <p>Нет доступных акций.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <div className="space-y-6">
        {promotions.map((promo) => {
          const isIndividual = !!promo.loyaltyRequired;
          return (
            <div
              key={promo.id}
              className={`rounded-xl p-6 shadow-md transition duration-300 ${
                isIndividual
                  ? 'bg-yellow-50 border-l-4 border-yellow-400'
                  : 'bg-white'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {promo.title}
                  </h2>
                  {isIndividual && (
                    <span className="bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Индивидуальная акция
                    </span>
                  )}
                </div>

                {promo.description && (
                  <p className="text-lg text-blue-600 font-medium">{promo.description}</p>
                )}

                {promo.discountPercent && (
                  <div className="text-md text-green-700 font-semibold">
                    Скидка: {promo.discountPercent}%
                  </div>
                )}

                <button
                  onClick={() => handleRedeem(promo.id)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {promo.type === 'points'
                    ? `Списать ${promo.pointsCost} баллов`
                    : 'Активировать'}
                </button>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  {promo.startAt && promo.endAt && (
                    <div>
                      с {new Date(promo.startAt).toLocaleString()} до{' '}
                      {new Date(promo.endAt).toLocaleString()}
                    </div>
                  )}
                  {promo.type === 'route' && <div>Направление: {promo.conditionValue}</div>}
                  {promo.type === 'seatType' && <div>Класс: {promo.conditionValue}</div>}
                  {promo.type === 'points' && <div>Баллы: {promo.pointsCost}</div>}
                  {promo.loyaltyRequired && (
                    <div>Требуемый уровень лояльности: {promo.loyaltyRequired}</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
