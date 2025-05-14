import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col w-full bg-slate-50 mt-20">
      <div className="flex flex-wrap justify-center px-11 py-20 max-md:px-5 gap-12 xl:gap-24">
        {/* Логотип и форма подписки */}
        <div className="w-full md:w-auto flex flex-col items-center text-center md:text-left md:items-start">
          <a href="/" className="mb-8">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a885a48557fe15e8937f13307035954afcf1c2b?placeholderIfAbsent=true&apiKey=dc284fd7f19d46479b197857e68bd145"
              alt="Company logo"
              className="object-contain aspect-[2.47] w-[200px]"
            />
          </a>
          
          <div className="max-w-[400px]">
            <label className="block text-lg text-blue-950 mb-4">
              Подпишитесь для новых предложений
            </label>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Введите вашу почту..."
                className="flex-1 px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                Подписаться
              </button>
            </div>
          </div>
        </div>

        {/* Блоки ссылок */}
        <div className="flex flex-col md:flex-row gap-12 xl:gap-24">
          {/* Спецпредложения */}
          <div className="min-w-[200px]">
            <h2 className="text-lg font-bold text-sky-950 mb-4">
              Спецпредложения
            </h2>
            <ul className="space-y-3">
              <FooterLink href="/tickets">Купить билеты</FooterLink>
              <FooterLink href="/promotions">Действующие акции</FooterLink>
              <FooterLink href="/referals">Пригласи друга</FooterLink>
              <FooterLink href="/loyalty">Система лояльности</FooterLink>
            </ul>
          </div>

          {/* О нас */}
          <div className="min-w-[200px]">
            <h2 className="text-lg font-bold text-sky-950 mb-4">
              О нас
            </h2>
            <ul className="space-y-3">
              <FooterLink href="tel:105">Связаться с нами</FooterLink>
              <FooterLink href="/rules">Правила и условия</FooterLink>
            </ul>
          </div>
        </div>
      </div>

      {/* Копирайт */}
      <div className="border-t border-slate-200">
        <div className="px-11 py-6 text-center">
          <p className="text-xs text-slate-500">
            © 2025 Система лояльности БЧ. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ children, href }) => (
  <li>
    <a
      href={href}
      className="block text-sm text-sky-950 hover:text-sky-700 transition-colors"
    >
      {children}
    </a>
  </li>
);

export default Footer;