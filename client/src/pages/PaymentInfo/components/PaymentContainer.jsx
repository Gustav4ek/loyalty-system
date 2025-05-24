import { useState } from 'react';
import api from '../../../api/axios';
import { useNavigate } from 'react-router-dom';

export default function PaymentContainer() {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState({
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\D/g, '')
        .match(/.{1,4}/g)
        ?.join(' ')
        .substr(0, 19) || '';
      return setCardData(prev => ({...prev, [name]: formattedValue}));
    }

    if (name === 'expiryDate') {
      const formattedValue = value
        .replace(/\D/g, '')
        .match(/.{1,2}/g)
        ?.join('/')
        .substr(0, 5) || '';
      return setCardData(prev => ({...prev, [name]: formattedValue}));
    }

    if (name === 'cvv') {
      const formattedValue = value.replace(/\D/g, '').substr(0, 3);
      return setCardData(prev => ({...prev, [name]: formattedValue}));
    }

    setCardData(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const errors = [];
      if (!cardData.cardHolder) errors.push('Укажите владельца карты');
      if (cardData.cardNumber.replace(/\D/g, '').length !== 16) errors.push('Неполный номер карты');
      if (!/\d{2}\/\d{2}/.test(cardData.expiryDate)) errors.push('Неверный срок действия');
      if (cardData.cvv.length !== 3) errors.push('Неверный CVV код');
      
      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }

      const last4Digits = cardData.cardNumber.replace(/\D/g, '').slice(-4);
      await api.post('/api/users/me/card', { cardNumber: last4Digits });

      alert('Карта успешно привязана!');
      setCardData({
        cardHolder: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
      });
      navigate('/profile');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 
                          error.message || 
                          'Ошибка привязки карты';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white rounded-xl shadow-lg p-6"
    >
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Платежная информация
      </h1>

      <div className="space-y-4">
        {/* Владелец карты */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">
            Владелец карты *
          </label>
          <input
            type="text"
            name="cardHolder"
            placeholder="Иван Иванов"
            value={cardData.cardHolder}
            onChange={handleInputChange}
            className="w-full p-3 text-base border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            required
          />
        </div>

        {/* Номер карты */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">
            Номер карты *
          </label>
          <input
            type="text"
            name="cardNumber"
            placeholder="0000 0000 0000 0000"
            value={cardData.cardNumber}
            onChange={handleInputChange}
            className="w-full p-3 text-base border-2 border-gray-200 rounded-lg tracking-widest focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            maxLength={19}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Срок действия */}
          <div className="flex flex-col">
            <label className="text-base font-medium text-gray-700 mb-1 whitespace-nowrap">
              Срок действия (ММ/ГГ) *
            </label>
            <input
              type="text"
              name="expiryDate"
              placeholder="ММ/ГГ"
              value={cardData.expiryDate}
              onChange={handleInputChange}
              className="w-full p-3 text-base border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              maxLength={5}
              required
            />
          </div>

          {/* CVV */}
          <div className="flex flex-col">
            <label className="text-base font-medium text-gray-700 mb-1">
              CVV *
            </label>
            <input
              type="password"
              name="cvv"
              placeholder="•••"
              value={cardData.cvv}
              onChange={handleInputChange}
              className="w-full p-3 text-base border-2 border-gray-200 rounded-lg tracking-widest focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              maxLength={3}
              required
            />
          </div>
        </div>

        {/* Кнопка отправки */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 text-white font-semibold text-base rounded-lg transition-all duration-300 ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-95'
          }`}
        >
          {loading ? 'Привязка карты...' : 'Привязать карту'}
        </button>
      </div>
    </form>
  );
}