import { Routes, Route, Navigate } from 'react-router-dom';
import './assets/styles/app.scss';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/others/ProtectedRoute/protectedroute';

import { Login } from './pages/login';
import { Menu } from './pages/menu';
import { Edit } from './pages/edit';
import { EditReport } from './pages/editReport';
import { Reportes } from './pages/reportes';
import { CreateReport } from './pages/createReport'; // Importa la página CreateReport
import { ReportProvider } from './context/ReportContext';

function App() {
  return (
    <AuthProvider>
    <ReportProvider>

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
  path="/editar/:id" 
  element={
    <ProtectedRoute>
      <EditReport />
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

    </ReportProvider>
    </AuthProvider>
  );
}

export default App;