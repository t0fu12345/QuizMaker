import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainDashboard from './pages/MainDashboard';
import PracticeDashboard from './pages/PracticeDashboard';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<MainDashboard />} />
          <Route path="practice" element={<PracticeDashboard />} />
          {/* Placeholder routes for other sidebar items */}
          <Route path="leaderboard" element={<div className="text-white">Bảng xếp hạng (Coming Soon)</div>} />
          <Route path="hints" element={<div className="text-white">Gợi ý (Coming Soon)</div>} />
          <Route path="exam" element={<div className="text-white">Thi (Coming Soon)</div>} />
          <Route path="studio" element={<div className="text-white">Studio (Coming Soon)</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
