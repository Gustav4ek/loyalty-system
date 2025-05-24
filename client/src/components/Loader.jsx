// components/Loader.jsx
const Loader = ({ size = "md", text = "Загрузка данных..." }) => {
    const sizeClasses = {
      sm: "h-6 w-6 border-2",
      md: "h-12 w-12 border-4",
      lg: "h-16 w-16 border-4"
    };
  
    const textSizes = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg"
    };
  
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        <div className="flex flex-col items-center space-y-4">
          <div
            className={`animate-spin rounded-full 
            border-blue-600 border-t-transparent
            ${sizeClasses[size]}`}
          ></div>
          
          <div className={`text-sky-900 font-medium ${textSizes[size]}`}>
            {text}
            <span className="animate-pulse ml-2">...</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default Loader;