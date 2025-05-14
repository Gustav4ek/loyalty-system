// MetricsCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const MetricsCard = ({ value, label, iconSrc, iconAlt }) => {
  const isClickable = label === "Доступные награды";
  
  const Content = () => (
    <article className={`flex flex-col p-4 lg:p-6 rounded-xl border border-gray-200 bg-white shadow-sm transition-all ${
      isClickable ? "hover:shadow-md cursor-pointer" : ""
    }`}>
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-bold text-sky-950">{value}</h3>
        {iconSrc && (
          <div className="p-2 bg-blue-100 rounded-lg">
            <img 
              src={iconSrc} 
              alt={iconAlt} 
              className="w-8 h-8 object-contain" 
            />
          </div>
        )}
      </div>
      <div className="mt-3 text-sm font-semibold text-sky-950 uppercase tracking-wide">
        {label}
      </div>
    </article>
  );

  return isClickable ? (
    <Link to="/achievements" className="block w-full">
      <Content />
    </Link>
  ) : (
    <Content />
  );
};

export default MetricsCard;