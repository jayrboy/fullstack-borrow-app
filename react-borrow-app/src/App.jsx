import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Transactions from './components/Transactions';
import DebtReport from './components/DebtReport';

function App() {
  return (
    <React.Fragment>
      {/* Navbar */}
      <Navbar />

      {/* Contents */}
      <Routes>
        <Route path="*" element={<>404 Not Found</>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/debt-report/:id" element={<DebtReport />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
