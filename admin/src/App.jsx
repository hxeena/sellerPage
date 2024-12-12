import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Seller from './components/Seller';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Seller />} />
      </Routes>
    </Router>
  );
}

export default App;
