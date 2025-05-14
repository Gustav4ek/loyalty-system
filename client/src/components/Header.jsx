import React, { useState } from "react";

  const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    return (
      <header className="w-full bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="relative flex h-16 items-center justify-between">
            {/* Логотип */}
            <div className="flex flex-shrink-0 items-center">
              <a href="/loyalty" className="block h-12 w-auto">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a885a48557fe15e8937f13307035954afcf1c2b?placeholderIfAbsent=true&apiKey=dc284fd7f19d46479b197857e68bd145"
                  alt="Логотип"
                  className="h-full w-full object-contain"
                />
              </a>
            </div>
  
            {/* Десктопное меню */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <div className="flex items-center gap-2">
                <a 
                  href="/tickets" 
                  className="text-sky-950 hover:text-sky-800 text-sm font-medium transition-colors"
                >
                  Купить билеты
                </a>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/93f83b347f80dbf1b1e0836c2186ab88c952fb87?placeholderIfAbsent=true&apiKey=dc284fd7f19d46479b197857e68bd145"
                  alt=""
                  className="h-5 w-5"
                />
              </div>
              
              <a 
                href="/loyalty" 
                className="text-sky-950 hover:text-sky-800 text-sm font-medium transition-colors"
              >
                Система лояльности
              </a>
              
              <div className="flex items-center gap-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1e9adb81973abd08e52460a68c2749b3b10db07b?placeholderIfAbsent=true&apiKey=dc284fd7f19d46479b197857e68bd145"
                  alt=""
                  className="h-5 w-5"
                />
                <a 
                  href="/profile" 
                  className="text-sky-950 hover:text-sky-800 text-sm font-medium transition-colors"
                >
                  Профиль
                </a>
              </div>
            </div>
  
            {/* Мобильное меню */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-sky-950"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </nav>
  
          {/* Выпадающее меню для мобильных */}
          {isMenuOpen && (
            <div className="md:hidden absolute w-full bg-white z-10 shadow-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  href="/tickets"
                  className="block px-3 py-2 text-base font-medium text-sky-950 hover:bg-gray-50"
                >
                  Купить билеты
                </a>
                <a
                  href="/loyalty"
                  className="block px-3 py-2 text-base font-medium text-sky-950 hover:bg-gray-50"
                >
                  Система лояльности
                </a>
                <a
                  href="/profile"
                  className="block px-3 py-2 text-base font-medium text-sky-950 hover:bg-gray-50"
                >
                  Профиль
                </a>
              </div>
            </div>
          )}
  
          {/* Заголовок страницы */}
          
        </div>
      </header>
    );
};

export default Header;
