import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { Lock, CheckCircle, XCircle } from 'lucide-react';

export default function CouponsContainer() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await api.get('/api/coupons');
      setCoupons(res.data);
    } catch (err) {
      console.error('Ошибка загрузки купонов:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center text-gray-500 mt-10">Загрузка купонов...</p>;
  if (!coupons.length) return <p className="text-center text-gray-500 mt-10">У вас нет купонов.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Мои купоны</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((coupon) => {
          const isExpired = coupon.status === 'EXPIRED';
          const isUsed = coupon.status === 'USED';
          const isInactive = isExpired || isUsed;

          const statusLabel = isExpired
            ? 'Просрочено'
            : isUsed
            ? 'Использован'
            : 'Активен';

          const statusStyle = isExpired
            ? 'bg-red-100 text-red-800'
            : isUsed
            ? 'bg-gray-100 text-gray-600'
            : 'bg-green-100 text-green-800';

          const Icon = isExpired ? XCircle : isUsed ? Lock : CheckCircle;

          return (
            <div
              key={coupon.id}
              className={`rounded-xl shadow-lg p-6 border border-gray-100 text-center transition-all duration-200 ${
                isInactive ? 'opacity-50 pointer-events-none' : 'bg-white'
              }`}
            >
              <div className="mb-4 flex justify-center items-center gap-2">
                <Icon size={18} />
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyle}`}>
                  {statusLabel}
                </span>
              </div>

              <div className="space-y-4 flex-1">
                <h2 className="text-base font-semibold text-gray-700 mb-2">
                  "{coupon.promotion?.title || coupon.company}"
                </h2>
                <div className="flex justify-center">
                  <span className="font-mono text-xl tracking-wider bg-gray-50 px-4 py-2 rounded-lg">
                    {coupon.code}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Срок действия до {new Date(coupon.expiryAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
