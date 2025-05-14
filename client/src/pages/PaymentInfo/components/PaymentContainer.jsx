import { useState } from 'react';

export default function PaymentContainer() {
  const [cardData, setCardData] = useState({
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Форматирование номера карты
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\D/g, '')
        .match(/.{1,4}/g)
        ?.join(' ')
        .substr(0, 19) || '';
      setCardData({...cardData, [name]: formattedValue});
      return;
    }

    // Форматирование срока действия
    if (name === 'expiryDate') {
      const formattedValue = value
        .replace(/\D/g, '')
        .match(/.{1,2}/g)
        ?.join('/')
        .substr(0, 5) || '';
      setCardData({...cardData, [name]: formattedValue});
      return;
    }

    setCardData({...cardData, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Обработка отправки формы
    console.log(cardData);
  };

  return (

      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Платежная информация
        </h1>

        <div className="space-y-6">
          {/* Владелец карты */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Владелец карты
            </label>
            <input
              type="text"
              name="cardHolder"
              placeholder="Иван Иванов"
              value={cardData.cardHolder}
              onChange={handleInputChange}
              className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              required
            />
          </div>

          {/* Номер карты */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Номер карты
            </label>
            <input
              type="text"
              name="cardNumber"
              placeholder="0000 0000 0000 0000"
              value={cardData.cardNumber}
              onChange={handleInputChange}
              className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl tracking-widest focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              maxLength={19}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Срок действия */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Срок действия (ММ/ГГ)
              </label>
              <input
                type="text"
                name="expiryDate"
                placeholder="ММ/ГГ"
                value={cardData.expiryDate}
                onChange={handleInputChange}
                className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                maxLength={5}
                required
              />
            </div>

            {/* CVV */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                CVV
              </label>
              <input
                type="password"
                name="cvv"
                placeholder="•••"
                value={cardData.cvv}
                onChange={handleInputChange}
                className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl tracking-widest focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                maxLength={3}
                required
              />
            </div>
          </div>

          {/* Кнопка отправки */}
          <button
            type="submit"
            className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
          >
            Привязать карту
          </button>
        </div>
      </form>
  );
}