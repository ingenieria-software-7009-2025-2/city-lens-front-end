import { Routes, Route, Navigate } from 'react-router-dom';
import './assets/styles/app.scss';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/others/ProtectedRoute/protectedroute';

import { Login } from './pages/login';
import { Menu } from './pages/menu';
import { Edit } from './pages/edit';
import { Reportes } from './pages/reportes';
import { CreateReport } from './pages/createReport'; // Importa la página CreateReport

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Redirige de "/" a "/login" */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/menu" 
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/edit" 
          element={
            <ProtectedRoute>
              <Edit />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/reportes" 
          element={
            <ProtectedRoute>
              <Reportes />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/create-report" 
          element={
            <ProtectedRoute>
              <CreateReport />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;