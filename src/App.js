import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LaunchpadPage from './pages/products/LaunchpadPage';
import KeystonePage from './pages/products/KeystonePage';
import FortunePage from './pages/products/FortunePage';
import Header from './components/Header';
import './App.css';
import RegistrationPage from './pages/Register/RegisterPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import SignInPage from './pages/SignIn/SignInPage'; // ✅ Import SignInPage

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/signin" element={<SignInPage />} /> {/* ✅ Sign In Route */}
          <Route path="/launchpad" element={<LaunchpadPage />} />
          <Route path="/keystone" element={<KeystonePage />} />
          <Route path="/fortune" element={<FortunePage />} />
          <Route path="/payment" element={<PaymentPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
