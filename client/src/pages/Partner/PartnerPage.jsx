import React, { useState } from 'react';
import api from "../../api/axios";

const PartnerPage = () => {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async () => {
    if (!code) return;
    setIsLoading(true);
    try {
      const res = await api.post('/api/coupons/check', { code });
      setResult({ type: 'success', message: 'Купон действителен и успешно активирован!' });
    } catch (err) {
      setResult({ 
        type: 'error', 
        message: err.response?.data?.error || ' Ошибка проверки купона' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Проверка купонов
          </h1>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700 mb-2">
                Введите номер купона
              </label>
              <input
                id="couponCode"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Введите код купона"
              />
            </div>

            <button
              onClick={handleCheck}
              disabled={isLoading}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-medium focus:outline-none ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
              }`}
            >
              {isLoading ? 'Проверка...' : 'Проверить купон'}
            </button>

            {result && (
              <div className={`p-4 rounded-md ${
                result.type === 'success' 
                  ? 'bg-green-50 text-green-700' 
                  : 'bg-red-50 text-red-700'
              }`}>
                <p className="text-sm text-center">{result.message}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerPage;