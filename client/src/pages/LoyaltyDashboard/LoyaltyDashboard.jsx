"use client";
import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import Header from "../../components/Header";
import SideNavigation from "../../components/SideNavigation";
import LoyaltyStatusCard from "./components/LoyaltyStatusCard";
import MetricsCard from "./components/MetricsCard";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";

const LoyaltyDashboard = () => {
  const [loyaltyData, setLoyaltyData] = useState({
    currentBalance: 0,
    lifetimePoints: 0,
    nextLevel: { name: 'Стандарт', requiredPoints: 200 },
    loyaltyLevel: 'BASE',
    availableRewards: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [balanceRes, lifetimeRes, achievementsRes] = await Promise.all([
        api.get('/api/points/balance'),
        api.get('/api/points/lifetime-points'),
        api.get('/api/achievements')
      ]);

      const availableRewards = achievementsRes.data.filter(a => !a.userProgress?.[0]?.isCompleted).length;
      
      setLoyaltyData({
        currentBalance: balanceRes.data.currentBalance || 0,
        lifetimePoints: lifetimeRes.data.points || 0,
        nextLevel: balanceRes.data.nextLevel || { 
          name: 'Стандарт', 
          requiredPoints: 200 
        },
        loyaltyLevel: balanceRes.data.loyaltyLevel || 'BASE',
        availableRewards
      });
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить данные');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddPoints = async (amount) => {
    try {
      setLoading(true);
      await api.post('/api/points/add-points', { amount });
      await fetchData();
    } catch (error) {
      setError(error.response?.data?.error || 'Ошибка операции');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="bg-white min-h-screen w-full flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <SideNavigation activePage="promotions" />
            </div>

            <div className="max-w-2xl mx-auto">
              <LoyaltyStatusCard
                lifetimePoints={loyaltyData.lifetimePoints}
                nextLevel={loyaltyData.nextLevel}
                currentLevel={loyaltyData.loyaltyLevel}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <MetricsCard
                  value={loyaltyData.availableRewards}
                  label="Доступные награды"
                  iconSrc="/icons/Vector.png"
                  iconAlt="Rewards icon"
                />
                <MetricsCard
                  value={loyaltyData.currentBalance}
                  label="Доступные баллы"
                />
              </div>

            
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoyaltyDashboard;