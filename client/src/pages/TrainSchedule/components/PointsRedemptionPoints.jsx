import { useState, useEffect } from 'react';

export default function PointsRedemptionModal({ isOpen, onClose, ticket, onRedeem }) {
  const [points, setPoints] = useState('');
  const [maxPoints, setMaxPoints] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (ticket) {
      const max = Math.min(
        Math.floor(ticket.price * 0.3 / 0.05),
        Math.floor(ticket.distance * 0.1 / 0.05) // Максимум по логике начисления
      );
      setMaxPoints(max);
    }
  }, [ticket]);

  const handleSubmit = () => {
    const pointsValue = parseInt(points, 10);
    
    if (isNaN(pointsValue)) {
      setError('Введите корректное число баллов');
      return;
    }
    if (pointsValue < 100) {
      setError('Минимум 100 баллов');
      return;
    }
    if (pointsValue > maxPoints) {
      setError(`Максимум ${maxPoints} баллов`);
      return;
    }
    
    onRedeem(pointsValue);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Использование баллов</h2>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">Стоимость билета:</span>
            <span className="text-lg font-semibold">{ticket.price} BYN</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Максимальный спис:</span>
            <span className="text-lg text-blue-600">{maxPoints} баллов</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Количество баллов для списания
            <span className="ml-2 text-gray-500">(1 балл = 0.05 BYN)</span>
          </label>
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value.replace(/\D/g, ''))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Введите баллы"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Применить
          </button>
        </div>
      </div>
    </div>
  );
}