
export default function PointsContainer() {
    return (
      <div className="max-w-4xl mx-auto p-6 font-sans">
  
        {/* Таблица с баллами */}
        <div className="overflow-x-auto mb-10">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left border-b-2 border-gray-200">Действие</th>
                <th className="p-3 text-left border-b-2 border-gray-200">Баллы</th>
                <th className="p-3 text-left border-b-2 border-gray-200">Пример</th>
              </tr>
            </thead>
            <tbody>
              <TableRow
                action="Поездка в плацкарте"
                points="0.1 балла/км"
                example="Минск - Гомель (300км) = 30 баллов"
              />
              <TableRow
                action="Поездка в купе"
                points="0.12 балла/км"
                example="Брест - Витебск (450км) = 54 балла"
              />
              <TableRow
                action="Поездка в бизнес-классе"
                points="0.14 балла/км"
                example="Минск - Полоцк (276км) = 39 баллов"
              />
              <TableRow
                action="Раннее бронирование (за 30 дней)"
                points="+20% к баллам"
                example="30 → 36 баллов"
              />
              <TableRow
                action="Непокоящее время (10:00 - 15:00)"
                points="×1.3 к баллам"
                example="54 → 70 баллов"
              />
              <TableRow
                action="Эко-инициатива"
                points="+5 баллов/поездка"
                example="39 → 44 балла"
              />
            </tbody>
          </table>
        </div>
  
        {/* Реферальная программа */}
        <SectionBlock
        iconUrl= '/icons/points/friends.png'
          title="Реферальная программа"
          content={
            <ul className="list-disc pl-5 space-y-2">
              <li>За каждого приглашенного друга = <strong>10 баллов</strong></li>
              <li>Друг совершил первую поездку = <strong>+5 баллов</strong> вам</li>
              <li className="bg-blue-50 p-3 rounded-lg">
                Пример: 5 друзей = 5×10 + 5×5 = <strong>75 баллов</strong>
              </li>
            </ul>
          }
        />
  
        {/* Сезонные бонусы */}
        <SectionBlock
          iconUrl= '/icons/points/gift.png'
          title="Сезонные бонусы"
          content={
            <ul className="list-disc pl-5">
              <li>День рождения: <strong>+10% баллов</strong> к любой поездке в ваш месяц рождения</li>
            </ul>
          }
        />
  
        {/* Советы */}
        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <img src="/icons/points/lamp.png" alt="alt.png" className="w-7 h-7"/> Советы для максимума баллов
          </h2>
          <ol className="list-decimal pl-5 space-y-3">
            <li>Комбинируйте бонусы: раннее бронирование + непокоящее время</li>
            <li>Используйте реферальную программу для быстрого роста</li>
            <li>Следите за акциями в разделе «Спецпредложения»</li>
          </ol>
        </div>
      </div>
    );
  }
  
  // Компонент для строк таблицы
  function TableRow({ action, points, example }) {
    return (
      <tr className="hover:bg-gray-50 even:bg-gray-50">
        <td className="p-3 border-b border-gray-100 font-medium">{action}</td>
        <td className="p-3 border-b border-gray-100 text-blue-600">{points}</td>
        <td className="p-3 border-b border-gray-100 text-gray-600">{example}</td>
      </tr>
    );
  }
  
  // Компонент для секций с иконкой
  function SectionBlock({ iconUrl, title, content }) {
    return (
      <div className="mb-8 p-6 bg-white rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <img src={iconUrl} alt={title} className="w-6 h-6"/>
           {title}
        </h2>
        {content}
      </div>
    );
  }