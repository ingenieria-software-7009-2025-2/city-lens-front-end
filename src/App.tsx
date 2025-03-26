import { Routes, Route } from "react-router-dom";
import "./assets/styles/app.scss";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/others/ProtectedRoute/protectedroute";

import { Login } from "./pages/login";
import { Menu } from "./pages/menu";
import { Edit } from "./pages/edit"; // Importa el componente Edit

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
        {/* Nueva ruta para la página de edición */}
        <Route
          path="/edit"
          element={
            <ProtectedRoute>
              <Edit />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
