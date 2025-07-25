import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage'

function App() {

  return (
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes > 
            
            <Route path="/" element={<LandingPage/>} />
            
          </Routes> 
      </Router>
  );
}

export default App;