import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import AdminExportPage from './pages/AdminExportPage'

function App() {

  return (
    <Routes> 
      <Route path="/" element={<LandingPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
  <Route path="/admin/export" element={<AdminExportPage/>} />
      <Route path="*" element={<LandingPage/>} />
    </Routes>
  );
}

export default App;