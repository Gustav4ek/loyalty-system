export default function TrainScheduleContainer() {

    const tickets = [
        {
          id: 1,
          trainNumber: "735Б",
          route: "Минск-Пассажирский — Брест-Центральный",
          departure: "10:29",
          arrival: "14:18",
          duration: "3ч 49мин",
          type: "Межрегиональные линии бизнес-класса",
          price: "26.36",
          seatType: "Сидячий"
        },
        {
          id: 2,
          trainNumber: "622К",
          route: "Гомель — Витебск",
          departure: "21:51",
          arrival: "07:37",
          duration: "9ч 46мин",
          type: "Межрегиональные линии экономкласса",
          price: "24.73",
          seatType: "Плацкарт"
        },
        {
          id: 3,
          trainNumber: "901М",
          route: "Могилёв — Гродно",
          departure: "17:34",
          arrival: "05:44",
          duration: "12ч 10мин",
          type: "Межрегиональные линии экономкласса",
          price: "38.89",
          seatType: "Купе"
        }
      ];
    
      return (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Купить билеты</h1>
            
            <div className="space-y-6">
              {tickets.map((ticket) => (
                <div 
                  key={ticket.id}
                  className="bg-white rounded-xl shadow-lg p-5 transition-transform hover:scale-[1.02]"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
                    {/* Левая часть - Основная информация */}
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xl font-bold text-blue-600">
                          {ticket.trainNumber}
                        </span>
                        <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                          {ticket.type}
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-lg font-semibold">{ticket.route}</p>
                        
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-600">
                          <span>🚅 {ticket.departure}</span>
                          <span className="text-gray-400">—</span>
                          <span>🕒 {ticket.arrival}</span>
                          <span className="text-gray-400 hidden md:inline">•</span>
                          <span>⌛ {ticket.duration}</span>
                        </div>
    
                        {/* Добавленная строка с типом места */}
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-sm font-medium bg-gray-100 px-2.5 py-0.5 rounded-md">
                            Тип места: 
                            <span className="ml-1 text-blue-600">
                              {ticket.seatType}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
    
                    {/* Правая часть - Цена и кнопка */}
                    <div className="flex flex-col items-end justify-between gap-3">
                      <p className="text-2xl font-bold text-gray-800 text-right">
                        {ticket.price} BYN
                      </p>
                      
                      <button 
                        className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto"
                      >
                        Купить билет
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
  }