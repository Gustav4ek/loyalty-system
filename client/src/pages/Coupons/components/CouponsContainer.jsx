export default function CouponsContainer() {
    const coupons = [
      {
        status: 'Активен',
        company: 'Ирина-Сервис',
        code: 'A3F9K7',
        expiry: '05.05.2025',
        color: 'bg-green-100 text-green-800'
      },
      {
        status: 'Просрочено',
        company: 'Ирина-Сервис',
        code: 'A3F9K7',
        expiry: '05.05.2025',
        color: 'bg-red-100 text-red-800'
      },
      {
        status: 'Использован',
        company: 'Ирина-Сервис',
        code: 'A3F9K7',
        expiry: '05.05.2025',
        color: 'bg-gray-100 text-gray-600'
      }
    ];
  
    return (
        <div className="max-w-6xl mx-auto p-6 font-sans">
          <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Мои купоны</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.map((coupon, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between h-full text-center 
                          border border-gray-100 hover:border-gray-200 transition-all duration-200"
              >
                {/* Статус */}
                <div className="mb-4 flex justify-center">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${coupon.color}`}>
                    {coupon.status}
                  </span>
                </div>
    
                {/* Информация о купоне */}
                <div className="space-y-4 flex-1">
                  <h2 className="text-base font-semibold text-gray-700 mb-2">
                    "{coupon.company}"
                  </h2>
                  <div className="flex justify-center">
                    <span className="font-mono text-xl tracking-wider bg-gray-50 px-4 py-2 rounded-lg">
                      {coupon.code}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Срок действия до {coupon.expiry}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  }