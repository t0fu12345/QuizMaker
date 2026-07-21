import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import PracticeDashboard from './pages/PracticeDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/practice" replace />} />
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
