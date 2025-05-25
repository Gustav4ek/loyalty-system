export default function LoyaltyRulesContainer() {
    return (
      <div className="max-w-3xl mx-auto p-6 font-sans">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Правила программы лояльности</h3>
  
        <div className="space-y-8">

          <section className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold mb-4">1. Начисление баллов</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">1.1. Не начисляются баллы за:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Льготные тарифы (детские, пенсионные)</li>
                  <li>Отмененные поездки</li>
                  <li>Возвращенные билеты</li>
                  <li>Билеты на покупку которых потрачены баллы</li>
                </ul>
              </div>
            </div>
          </section>
  

          <section className="border-l-4 border-green-500 pl-4">
            <h2 className="text-xl font-semibold mb-4">2. Уровневая система</h2>
            <p className="text-gray-600">
              2.1. Для сохранения статуса VIP-Спутник необходимо совершить минимум 20 поездок в текущем году
            </p>
          </section>
  

          <section className="border-l-4 border-purple-500 pl-4">
            <h2 className="text-xl font-semibold mb-4">3. Использование баллов</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-medium mb-2">3.1. Баллы можно использовать для:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Оплаты до 30% стоимости билета (1 балл = 0.05 BYN)</li>
                  <li>Обмена на услуги партнеров (например, 150 баллов = чашка кофе в кафе «У вокзала»)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">3.2. Ограничения:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Минимальная сумма списания: 100 баллов</li>
                  <li>Баллы нельзя переводить другим пользователям или обналичивать</li>
                </ul>
              </div>
            </div>
          </section>
  

          <section className="border-l-4 border-orange-500 pl-4">
            <h2 className="text-xl font-semibold mb-4">4. Сроки действия</h2>
            <div className="space-y-2 text-gray-600">
              <p>4.1. Баллы сгорают через 12 месяцев с момента последней активности (поездки или списания)</p>
              <p>4.2. Статусы обновляются ежедневно. При невыполнении условий уровень понижается автоматически</p>
            </div>
          </section>

          <section className="border-l-4 border-pink-500 pl-4">
            <h2 className="text-xl font-semibold mb-4">5. Партнерская программа</h2>
            <div className="space-y-4 text-gray-600">
              <p>5.1. Партнеры Программы — локальные бизнесы, предлагающие скидки за баллы. Актуальный список доступен в разделе “Действующие акции”</p>
              <p>5.2. БЧ не несет ответственности за качество услуг партнеров. Споры решаются напрямую с партнером</p>
            </div>
          </section>
        </div>
      </div>
    );
  }