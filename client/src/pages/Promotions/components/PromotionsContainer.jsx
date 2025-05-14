export default function PromotionsContainer() {
    const promotions = [
      {
        title: 'Купи билет - получи скидку на отель "Железнодорожник"',
        description: 'БИЛЕТ МИНСК - ГРОДНО → СКИДКА 20% НА ПРОЖИВАНИЕ',
        buttonText: 'Купить билет',
        conditions: [
          '05/05/2025 00:00 – 12/05/2025 23:59',
          'Акция действует только при покупке билета по направлению Минск - Гродно'
        ]
      },
      {
        title: 'Кофе со скидкой в "Varka"',
        description: '50% НА ЛЮБОЙ КОФЕЙНЫЙ НАПИТОК • 50 баллов',
        buttonText: 'Получить купон',
        conditions: [
          '05/05/2025 10:00 – 09/05/2025 21:00',
          'На любой кофейный напиток'
        ]
      },
      {
        title: 'Купи билет в бизнесе - получи пачку фирменного чая от "Ирина-Сервис"',
        description: '',
        buttonText: 'Купить билет',
        conditions: [
          'Бессрочная акция',
          'Купон можно получить только один раз при покупке билета в бизнес-класс'
        ]
      }
    ];
  
    return (
      <div className="max-w-4xl mx-auto p-6 font-sans">
        
        <div className="space-y-6">
          {promotions.map((promo, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">{promo.title}</h2>
                
                {promo.description && (
                  <p className="text-lg text-blue-600 font-medium">
                    {promo.description}
                  </p>
                )}
  
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  {promo.buttonText}
                </button>
  
                <div className="mt-4 space-y-2">
                  {promo.conditions.map((condition, idx) => (
                    <div key={idx} className="flex items-start text-sm text-gray-600">
                      <span className="mr-2">•</span>
                      <span>{condition}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }