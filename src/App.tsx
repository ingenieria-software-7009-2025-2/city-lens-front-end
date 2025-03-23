import { Routes, Route } from 'react-router-dom';
import './assets/styles/app.scss';
import { Login } from './pages/login';
import { Menu } from './pages/menu';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/menu" element={<Menu />} />
        </Routes>
    );
}

export default App;