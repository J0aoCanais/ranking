import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import ExcelAdminPage from './pages/ExcelAdminPage'

function App() {

  return (
    <Routes> 
      <Route path="/" element={<LandingPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
  <Route path="/excel-admin" element={<ExcelAdminPage/>} />
      <Route path="*" element={<LandingPage/>} />
    </Routes>
  );
}

export default App;