import React from 'react';

const benefits = [
  { label: 'Бонус за каждую 10-ю поездку', keys: ['standard', 'premium', 'vip'] },
  { label: 'Бонус на день рождения', keys: ['standard', 'premium', 'vip'] },
  { label: 'Скидки на непопулярные маршруты', keys: ['premium', 'vip'] },
  { label: 'Бесплатный чай/кофе в пути', keys: ['vip'] },
];

const footnotes = [
  'Бонус за 10 поездок — +40% баллов за каждую 10-ю завершенную поездку',
  'Бонус на день рождения – +10% баллов к любой поездке в течение месяца после дня рождения',
  'Скидки на непопулярные маршруты – Доступ к акциям на малозагруженные направления (например, Гродно – Могилёв)',
  'Бесплатный чай/кофе — 1 горячий напиток на поездку длительностью от 3 часов',
];

const tiers = [
  { key: 'standard', label: 'Стандарт' },
  { key: 'premium', label: 'Премиум' },
  { key: 'vip', label: 'VIP' },
];

function BenefitsTable() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <table className="w-full text-center table-fixed">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-3"></th>
            {tiers.map((tier) => (
              <th key={tier.key} className="px-6 py-3 text-sm font-bold">
                {tier.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {benefits.map((benefit) => (
            <tr key={benefit.label} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium">{benefit.label}</td>
              {tiers.map((tier) => (
                <td key={tier.key} className="px-6 py-3 text-center">
                  {benefit.keys.includes(tier.key) && (
                    <svg
                      className="mx-auto h-5 w-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="mt-4 space-y-2 text-xs text-gray-600">
        {footnotes.map((note, idx) => (
          <li key={idx}>*{note}</li>
        ))}
      </ul>
    </div>
  );
}

export default BenefitsTable;
