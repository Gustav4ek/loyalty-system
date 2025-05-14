export default function PointsHistoryContainer() {
    const activities = [
      { 
        type: 'up',
        description: 'Минск - Гомель',
        points: '+30 баллов',
        date: '05/04/2025'
      },
      { 
        type: 'down',
        description: '30% скидка от стоимости билета',
        points: '-30 баллов',
        date: '01/04/2025'
      },
      { 
        type: 'up',
        description: 'Брест - Витебск',
        points: '+54 балла',
        date: '27/03/2025'
      },
      { 
        type: 'up',
        description: 'Минск - Полоцк',
        points: '+39 баллов',
        date: '17/03/2025'
      },
    ];
  
    return (
      <div className="max-w-4xl mx-auto p-6 font-sans">
        {/* Заголовки с баллами */}
        <div className="flex flex-wrap gap-8 mb-8">
          <div className="flex-1 min-w-[200px]">
            <h1 className="text-5xl font-bold text-blue-600">217</h1>
            <p className="text-lg text-gray-600">ДОСТУПНЫЕ БАЛЛЫ</p>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <h1 className="text-5xl font-bold text-gray-800">4</h1>
            <p className="text-lg text-gray-600">КОЛИЧЕСТВО ПОЕЗДОК</p>
          </div>
        </div>
  
        <hr className="my-8 border-t-2 border-gray-200" />
  
        {/* История активностей */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            История активностей (4)
          </h2>
  
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {activities.map((activity, index) => (
                  <tr 
                    key={index}
                    className="hover:bg-gray-50 even:bg-gray-50"
                  >
                    <td className="p-3 border-b border-gray-100">
                      <span className={`text-xl ${
                        activity.type === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {activity.type === 'up' ? '↑' : '↓'}
                      </span>
                    </td>
                    
                    <td className="p-3 border-b border-gray-100 font-medium">
                      {activity.description}
                    </td>
                    
                    <td className="p-3 border-b border-gray-100 font-semibold">
                      {activity.points}
                    </td>
                    
                    <td className="p-3 border-b border-gray-100 text-gray-500">
                      {activity.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }