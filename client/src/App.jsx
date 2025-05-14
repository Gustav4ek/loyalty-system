import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoyaltyDashboard from './pages/LoyaltyDashboard/LoyaltyDashboard';
import StatusAbout from './pages/StatusAbout/StatusAbout';
import AchievementsBoard from './pages/Achievements/AchievementsBoard';
import PointsBoard from './pages/Points/PointsBoard';
import PointsHistory from './pages/PointsHistory/PointsHistory';
import LoyaltyRules from './pages/LoyaltyRules/LoyaltyRules';
import TrailsBoard from './pages/Trails/TrailsBoard';
import PaymentInfo from './pages/PaymentInfo/PaymentInfo';
import ReferalSystem from './pages/ReferalSystem/ReferalSystem';
import PersonalInfo from './pages/PersonalInfo/PersonalInfo';
import Promotions from './pages/Promotions/Promotions';
import Coupons from './pages/Coupons/Coupons';
import TrainSchedule from './pages/TrainSchedule/TrainSchedule';

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/loyalty" element={<LoyaltyDashboard/>} />
          <Route path='/statusabout' element={<StatusAbout/>}></Route>
          <Route path='/achievements' element={<AchievementsBoard/>}></Route>
          <Route path='/points' element={<PointsBoard/>}></Route>
          <Route path='/points/history' element={<PointsHistory/>}></Route>
          <Route path='/rules' element={<LoyaltyRules/>}></Route>
          <Route path='/trails' element={<TrailsBoard/>}></Route>
          <Route path='/payment' element={<PaymentInfo/>}></Route>
          <Route path='/referals' element={<ReferalSystem/>}></Route>
          <Route path='/profile' element={<PersonalInfo/>}></Route>
          <Route path='/promotions' element={<Promotions/>}></Route>
          <Route path='/coupons' element={<Coupons/>}></Route>
          <Route path='/tickets' element={<TrainSchedule/>}></Route>
        </Routes>
      </Router>
    );
}

export default App
