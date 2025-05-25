import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';

export default function ReferalContainer() {

  const [data, setData] = useState({
    invitedCount: 0,
    earnedPoints: 0,
    referralCode: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchReferralData() {
      try {
        const response = await api.get('/api/points/referral-info');
        setData({
          invitedCount: response.data.invitedCount,
          earnedPoints: response.data.earnedPoints,
          referralCode: response.data.referralCode,
        });
      } catch (err) {
        setError('Не удалось загрузить данные');
      } finally {
        setLoading(false);
      }
    }
    fetchReferralData();
  }, []);

  if (loading) {
    return <div className="text-center p-6">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-center">Реферальная программа</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-xl p-6 shadow-md text-center">
          <div className="text-5xl font-bold text-blue-600 mb-2">{data.invitedCount}</div>
          <div className="text-gray-600 uppercase text-sm tracking-wider">
            ПРИГЛАШЕННЫХ ДРУЗЕЙ
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md text-center">
          <div className="text-5xl font-bold mb-2">{data.earnedPoints}</div>
          <div className="text-gray-600 uppercase text-sm tracking-wider">
            ЗАРАБОТАНО БАЛЛОВ
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Ваша персональная ссылка
        </h2>

        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
          <code className="font-mono text-gray-800 tracking-wider">
            {data.referralCode || '—'}
          </code>
          <button
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => navigator.clipboard.writeText(data.referralCode)}
            disabled={!data.referralCode}
          >
            Копировать
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Поделитесь этой ссылкой с друзьями, чтобы получать бонусы
        </p>
      </div>
    </div>
  );
}