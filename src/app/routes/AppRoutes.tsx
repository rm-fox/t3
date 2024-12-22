// /src/routes/AppRoutes.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TradingPage from '../pages/TradingPage'; // Import Trading page
import AboutUsPage from '../pages/AboutUsPage'; // Import Trading page
import Home from '../pages/Home';               // Optional Home page

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />         {/* Home page */}
      <Route path="/trading" element={<TradingPage />} /> {/* Trading page */}
      <Route path="/aboutus" element={<AboutUsPage />} /> {/* Trading page */}

    </Routes>
  </Router>
);

export default AppRoutes;
