import React from "react";
import PointsContainer from "./components/PointsContainer";
import Header from "../../components/Header";
import SideNavigation from "../../components/SideNavigation";
import Footer from "../../components/Footer";

export default function PointsBoard() {
    return (
      <div className="bg-white min-h-screen w-full flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Side Navigation */}
            <div className="lg:w-1/4">
              <SideNavigation activePage="promotions" />
            </div>

            {/* Main Section */}
            <section className="lg:w-3/4 w-full">
              <PointsContainer />
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
      );
}
