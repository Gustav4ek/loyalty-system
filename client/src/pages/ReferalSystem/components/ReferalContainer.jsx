export default function ReferalContainer() {
    return (
      <div className="max-w-4xl mx-auto p-6 font-sans">
        <h1 className="text-3xl font-bold mb-8 text-center">Реферальная программа</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Блок приглашенных друзей */}
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">0</div>
            <div className="text-gray-600 uppercase text-sm tracking-wider">
              ПРИГЛАШЕННЫХ ДРУЗЕЙ
            </div>
          </div>
  
          {/* Блок заработанных баллов */}
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-5xl font-bold mb-2">0</div>
            <div className="text-gray-600 uppercase text-sm tracking-wider">
              ЗАРАБОТАНО БАЛЛОВ
            </div>
          </div>
        </div>
  
        {/* Блок персональной ссылки */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Ваша персональная ссылка
          </h2>
          
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
            <code className="font-mono text-gray-800 tracking-wider">
              VUFVUVVU0700
            </code>
            <button 
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => navigator.clipboard.writeText('VUFVUVVU0700')}
            >
              Копировать
            </button>
          </div>
  
          <p className="mt-4 text-sm text-gray-500">
            Поделитесь этой ссылкой с друзьями, чтобы получать бонусы
          </p>
        </div>
      </div>
    );
  }