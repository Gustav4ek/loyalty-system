import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../../api/axios';
import { useNavigate } from 'react-router-dom';



export default function ProfileContainer() {
  const [profile, setProfile] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    email: '',
    phone: '',
    gender: 'M',
    birthDate: '',
    cardNumber: ''
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [forceUpdate, setForceUpdate] = useState(0);
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await api.get('/api/users/me');
        console.log(response.data);
        setProfile({
          lastName: response.data.lastName || '',
          firstName: response.data.firstName || '',
          middleName: response.data.middleName || '',
          email: response.data.email || '',
          phone: response.data.phone || '',
          gender: response.data.gender || 'M',
          birthDate: response.data.birthDate?.split('T')[0] || '',
          cardNumber: response.data.cardNumber || ''
        });
      } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
      }
    };
    loadProfile();
  }, [forceUpdate]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Валидация даты рождения
      if (profile.birthDate) {
        const birthDate = new Date(profile.birthDate);
        const today = new Date();
        
        if (birthDate > today) {
          alert('Дата рождения не может быть в будущем');
          return;
        }
      }

      // Подготовка данных для отправки
      const dataToSend = {
        ...profile,
        birthDate: profile.birthDate 
          ? new Date(profile.birthDate).toISOString().split('T')[0] 
          : null,
        phone: profile.phone || null
      };

      const response = await api.put('/api/users/me', dataToSend);
      alert('Данные успешно сохранены!');
      
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert(error.response?.data?.error || 'Ошибка сохранения данных');
    }
  };
  const navigate = useNavigate();
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }
  
    try {
      await api.post('/api/users/change-password', {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
      });
      
      // Очищаем данные
      localStorage.removeItem('token');
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      
      // Перенаправляем с заменой истории
      navigate('/login', { replace: true });
      
      // Можно добавить уведомление
      alert('Пароль успешно изменен. Пожалуйста, войдите снова.');
  
    } catch (error) {
      alert('Ошибка: ' + (error.response?.data?.error || ''));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      {/* Форма персональных данных */}
      <form onSubmit={handleProfileSubmit}>
        <div className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Фамилия *
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={profile.lastName}
                onChange={(e) => setProfile({...profile, lastName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Имя *
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={profile.firstName}
                onChange={(e) => setProfile({...profile, firstName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Отчество
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={profile.middleName}
                onChange={(e) => setProfile({...profile, middleName: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                E-mail *
              </label>
              <div className="w-full p-2 border rounded-md bg-gray-50 text-gray-600">
                {profile.email}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Номер телефона
              </label>
              <input
                type="tel"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                placeholder="+375XXXXXXXX"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Пол *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value="M"
                  checked={profile.gender === 'M'}
                  onChange={(e) => setProfile({...profile, gender: e.target.value})}
                  className="h-4 w-4 text-blue-600"
                />
                <span>Мужской</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value="F"
                  checked={profile.gender === 'F'}
                  onChange={(e) => setProfile({...profile, gender: e.target.value})}
                  className="h-4 w-4 text-blue-600"
                />
                <span>Женский</span>
              </label>
            </div>
            
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Дата рождения
            </label>
            <input
    type="date"
    value={profile.birthDate}
    onChange={(e) => setProfile({...profile, birthDate: e.target.value})}
    max={new Date().toISOString().split('T')[0]}
  />
          </div>

          {/* Добавляем поле номера карты */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Привязанная карта
            </label>
            <div className="w-full p-2 border rounded-md bg-gray-50 text-gray-600">
  {profile.cardNumber 
    ? `**** **** **** ${profile.cardNumber}`
    : 'Не привязана'}
</div>
          </div>
        </div>

        <div className="mt-8">
          <button 
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors w-full md:w-auto"
          >
            Сохранить профиль
          </button>
        </div>
      </form>

      <hr className="my-8 border-t" />

      {/* Форма смены пароля */}
      <form onSubmit={handlePasswordSubmit} className="mt-8">
        <h2 className="text-xl font-semibold mb-6">Изменение пароля</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Старый пароль
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={passwordData.oldPassword}
              onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Новый пароль
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Повторите пароль
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
            />
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mb-4">
          Пароль должен содержать не менее 6 символов (можно использовать заглавные и строчные буквы, цифры и специальные символы)
        </p>

        <button 
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors w-full md:w-auto"
        >
          Сменить пароль
        </button>
      </form>
    </div>
  );
}