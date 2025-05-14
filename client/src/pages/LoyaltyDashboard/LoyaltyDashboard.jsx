"use client";
import React, { useState } from "react";
import Header from "../../components/Header";
import SideNavigation from "../../components/SideNavigation";
import LoyaltyStatusCard from "./components/LoyaltyStatusCard";
import MetricsCard from "./components/MetricsCard";
import Footer from "../../components/Footer";

const LoyaltyDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const loyaltyData = {
    currentPoints: 0,
    nextLevelPoints: 200,
    nextLevel: "Стандарт",
    availableRewards: 5,
    availablePoints: 0,
  };

  return (
    <div className="bg-white min-h-screen w-full flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
        
  
            {/* Side Navigation */}
            <div className="lg:w-1/4">
              <SideNavigation activePage="promotions" />
            </div>

              <div className="max-w-2xl mx-auto">
                <LoyaltyStatusCard
                  currentPoints={loyaltyData.currentPoints}
                  nextLevelPoints={loyaltyData.nextLevelPoints}
                  nextLevel={loyaltyData.nextLevel}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <MetricsCard
                    value={loyaltyData.availableRewards}
                    label="Доступные награды"
                    iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/63f450eadf6d62db7b0a13459324a6e38e0418a0?placeholderIfAbsent=true&apiKey=dc284fd7f19d46479b197857e68bd145"
                    iconAlt="Rewards icon"
                  />
                  <MetricsCard
                    value={loyaltyData.availablePoints}
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