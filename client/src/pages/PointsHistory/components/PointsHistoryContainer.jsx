import { useEffect, useState } from 'react';
import api from '../../../api/axios';

export default function PointsHistoryContainer() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await api.get('/api/points/history');
        console.log(response);
        // Фильтруем только операции связанные с поездками
        const tripOperations = response.data.filter(record => 
          record.description.includes('поездку') || 
          record.description.includes('заказ')
        );
        setHistory(tripOperations);
      } catch (error) {
        console.error('Ошибка:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center p-6">Загрузка истории операций...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">История операций по поездкам</h2>
        
        {history.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            Нет данных об операциях
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {history.map(record => (
              <div key={record.id} className="py-3 flex items-center justify-between hover:bg-gray-50">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {record.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(record.createdAt).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <span className={`ml-4 font-semibold text-lg ${
                  record.type === 'ACCRUAL' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {record.type === 'ACCRUAL' ? '+' : '-'}{record.amount}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}