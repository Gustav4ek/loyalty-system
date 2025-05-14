export default function TrailsContainer() {
    return (
      <div className="max-w-2xl mx-auto p-6 font-sans">
  
        {/* Первая поездка */}
        <div className="border rounded-lg p-4 mb-6 shadow-sm">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="font-semibold text-gray-700">Минск-Пассажирский</p>
              <p className="text-gray-600">17 апр в 19:00</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Гомель</p>
              <p className="text-gray-600">17 апр в 21:50</p>
            </div>
          </div>
  
          <div className="space-y-2">
            <p className="font-medium text-gray-800">Межрегиональные линии бизнес-класса</p>
            <div className="flex justify-between text-gray-600">
              <span>708БА</span>
              <span>1 Билет</span>
              <span className="font-semibold text-orange-300">16,73 BYN</span>
            </div>
          </div>
        </div>
  
        <hr className="my-6 border-t-2 border-dashed border-gray-200" />
  
        {/* Обратная поездка */}
        <div className="border rounded-lg p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="font-semibold text-gray-700">Гомель</p>
              <p className="text-gray-600">17 апр в 07:00</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Минск-Пассажирский</p>
              <p className="text-gray-600">17 апр в 09:50</p>
            </div>
          </div>
  
          <div className="space-y-2">
            <p className="font-medium text-gray-800">Межрегиональные линии бизнес-класса</p>
            <div className="flex justify-between text-gray-600">
              <span>707БА</span>
              <span>1 Билет</span>
              <span className="font-semibold text-blue-600">23,89 BYN</span>
            </div>
          </div>
        </div>
      </div>
    );
  }