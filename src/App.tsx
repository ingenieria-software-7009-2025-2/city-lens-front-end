import { Routes, Route } from 'react-router-dom';
import './assets/styles/app.scss';
import { Login } from './pages/Login/Login';
import { Menu } from './pages/Menu/Menu'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/menu" element={<Menu />} />
    </Routes>
  );
}

export default App;
