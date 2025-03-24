import { Routes, Route } from 'react-router-dom';import './assets/styles/app.scss';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/others/ProtectedRoute/protectedroute';

import { Login } from './pages/login';
import { Menu } from './pages/menu';

function App() {
    return (
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/menu" 
            element={
              <ProtectedRoute>
                <Menu />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    );
}

export default App;