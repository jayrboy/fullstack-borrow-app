import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HomePage from '../components/HomePage';
import DebtReport from '../components/DebtReport';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<>404 Not Found</>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/debt-report/:id" element={<DebtReport />} />
      </Routes>
    </>
  );
}

export default App;
