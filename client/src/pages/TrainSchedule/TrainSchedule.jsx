import React from "react";
import TrainScheduleContainer from "./components/TrainScheduleContainer";
import Header from "../../components/Header";
import SideNavigation from "../../components/SideNavigation";
import Footer from "../../components/Footer";

export default function TrainSchedule() {
    return (
        <div className="bg-white min-h-screen w-full flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <SideNavigation activePage="promotions" />
            </div>
            <section className="lg:w-3/4 w-full">
              <TrainScheduleContainer />
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
      );
}
