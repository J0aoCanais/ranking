import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import './styles/main.scss';

function App() {

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Routes> 
        <Route path="/" element={<LandingPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="*" element={<LandingPage/>} />
      </Routes>
    </div>
  );
}

export default App;