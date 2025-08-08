import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/index'
import RegisterPage from './pages/RegisterPage/index'

function App() {
  try {
    return (
      <Routes> 
        <Route path="/" element={<LandingPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="*" element={<LandingPage/>} />
      </Routes>
    );
  } catch (error) {
    console.error('Erro no App:', error);
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Erro ao carregar a aplicação</h1>
        <p>Por favor, recarregue a página.</p>
      </div>
    );
  }
}

export default App;