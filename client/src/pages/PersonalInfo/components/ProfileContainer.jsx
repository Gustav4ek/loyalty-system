export default function ProfileContainer() {
    return (
      <div className="max-w-2xl mx-auto p-6 font-sans">
  
        {/* Персональные данные */}
        <div className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Фамилия *
              </label>
              <input
                type="text"
                defaultValue="Будюхин"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Имя *
              </label>
              <input
                type="text"
                defaultValue="Ярослав"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Отчество
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
  
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                E-mail *
              </label>
              <input
                type="email"
                defaultValue="yaroslavbud@gmail.com"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Номер телефона (не обязательно)
              </label>
              <input
                type="tel"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Пол *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  className="mr-2"
                  defaultChecked
                />
                М
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  className="mr-2"
                />
                Ж
              </label>
            </div>
          </div>
        </div>
  
        <hr className="my-8 border-t" />
  
        {/* Изменение пароля */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Изменение пароля</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Старый пароль
              </label>
              <input
                type="password"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Новый пароль
              </label>
              <input
                type="password"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Повторите новый пароль
              </label>
              <input
                type="password"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Пароль должен содержать не менее 6 символов (в любом сочетании заглавные или строчные латинские буквы и цифры, также можно вводить специальные символы)
          </p>
        </div>
  
        <div className="mt-8">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Сохранить изменения
          </button>
        </div>
      </div>
    );
  }