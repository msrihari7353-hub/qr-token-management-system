import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerForm from './pages/CustomerForm';
import TokenConfirmation from './pages/TokenConfirmation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/customer/:businessId" element={<CustomerForm />} />
          <Route path="/confirmation" element={<TokenConfirmation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;