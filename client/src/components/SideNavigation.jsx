import React, { useState } from "react";

const SideNavigation = ({ activePage = "promotions" }) => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: "info",
      label: "Персональная информация",
      path: "/profile",
      indent: false,
    },
    {
      id: "discounts",
      label: "Скидки",
      path: "/promotions",
      indent: false,
    },
    {
      id: "coupons",
      label: "Мои купоны",
      path: "/coupons",
      indent: true,
    },
    {
      id: "promotions",
      label: "Действующие акции",
      path: "/promotions",
      indent: true,
    },
    {
      id: "invite",
      label: "Пригласить друга",
      path: "/referals",
      indent: false,
    },
    {
      id: "loyalty",
      label: "Система лояльности",
      path: "/loyalty",
      indent: false,
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f9ffce6a51434c705218f18e82f507ea49add1b9?placeholderIfAbsent=true&apiKey=dc284fd7f19d46479b197857e68bd145",
      isBold: true,
    },
    {
      id: "status",
      label: "Подробнее о статусах",
      path: "/statusabout",
      indent: true,
    },
    {
      id: "rewards",
      label: "Доступные награды",
      path: "/achievements",
      indent: true,
    },
    {
      id: "points",
      label: "Как получить больше баллов",
      path: "/points",
      indent: true,
    },
    {
      id: "history",
      label: "История активностей",
      path: "/points/history",
      indent: true,
    },
    {
      id: "terms",
      label: "Условия системы",
      path: "/rules",
      indent: true,
    },
    {
      id: "orders",
      label: "История заказов билетов",
      path: "/trails",
      indent: false,
    },
    {
      id: "payment",
      label: "Платежная информация",
      path: "/payment",
      indent: false,
    },
    { id: "logout", label: "Выйти", path: "#", indent: false, isButton: true },
  ];

  return (
    <>
      {/* Мобильное меню - кнопка */}
      <button
        className="md:hidden fixed right-4 bottom-4 z-20 p-3 bg-blue-600 text-white rounded-full shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Боковая панель */}
      <nav className={`md:block fixed md:relative md:translate-x-0 transform transition-transform duration-300 
        h-screen md:h-auto w-64 md:w-full bg-white md:bg-transparent z-10 md:z-auto shadow-lg md:shadow-none
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        <div className="p-4 md:p-0">
          <div className="md:hidden flex justify-end mb-4">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ✕
            </button>
          </div>

          {navItems.map((item) => (
            <div
              key={item.id}
              className={`group flex items-center py-2 px-4 md:px-3 
                ${item.indent ? 'ml-4 md:ml-6' : ''} 
                ${item.id === activePage ? 'bg-blue-50 border-l-4 border-blue-600' : 'hover:bg-gray-50'}`}
            >
              {item.icon && (
                <img
                  src={item.icon}
                  alt=""
                  className="w-5 h-5 mr-3 opacity-75"
                />
              )}
              
              {item.isButton ? (
                <button className={`w-full text-left ${
                  item.isBold ? 'font-semibold' : 'font-medium'
                } text-gray-700 hover:text-blue-600`}>
                  {item.label}
                </button>
              ) : (
                <a
                  href={item.path}
                  className={`block w-full ${
                    item.isBold ? 'font-semibold' : 'font-medium'
                  } ${
                    item.id === activePage 
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default SideNavigation;
