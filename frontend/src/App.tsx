import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <Routes> 
      <Route path="/" element={<LandingPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      {/* Redireciona todas as outras rotas para a página principal */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;