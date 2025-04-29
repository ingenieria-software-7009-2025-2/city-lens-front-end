/**
 * `Nav` Component
 *
 * Este componente representa la barra de navegación principal de la aplicación.
 * Incluye enlaces para navegar entre diferentes secciones y un menú de usuario con opciones adicionales.
 *
 * ## Dependencias:
 * - `react-router-dom`: Utiliza `useNavigate` para manejar la navegación entre rutas.
 * - `AuthContext`: Proporciona el contexto de autenticación para manejar el cierre de sesión.
 * - `FontAwesomeIcon`: Se utiliza para mostrar íconos en los enlaces de navegación.
 * - Archivos de estilo: `nav.scss` para los estilos personalizados.
 * - Imágenes: `Logo.png` y `Logo2.png` para mostrar el logotipo.
 *
 * ## Props:
 * Este componente no recibe props.
 *
 * ## Estado:
 * - `menuOpen` (`boolean`): Controla si el menú de usuario está abierto o cerrado.
 *
 * ## Funciones:
 * - `handleLogout`: Cierra la sesión del usuario, elimina el token del `localStorage` y redirige a la página de inicio de sesión.
 * - `handleEditInfo`: Navega a la página de edición de información del usuario.
 * - `handleReportInfo`: Navega a la página de reportes.
 * - `handleGoToMenu`: Navega al menú principal.
 * - `handleCreateReport`: Navega a la página de creación de reportes.
 *
 * ## Estructura del componente:
 * - Logotipo: Muestra el logotipo de la aplicación.
 * - Lista de navegación: Contiene enlaces para navegar entre las secciones principales (Inicio, Crear reporte, Reportes, Mapa).
 * - Menú de usuario: Incluye opciones para editar información y cerrar sesión.
 *
 * ## Estilos:
 * Los estilos se encuentran en el archivo `nav.scss`.
 *
 * ## Ejemplo de uso:
 * ```tsx
 * import Nav from "./nav";
 *
 * const App = () => {
 *   return (
 *     <div>
 *       <Nav />
 *     </div>
 *   );
 * };
 *
 * export default App;
 */

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "./nav.scss";
import { AuthContext } from "../../../context/AuthContext";

import logo from "../../../assets/images/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPencil,
  faFileAlt,
  faMap,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token"); // Elimina el token del localStorage
    navigate("/login");
  };

  const handleEditInfo = () => {
    navigate("/edit"); // Navega a la página de edición
  };

  const handleReportInfo = () => {
    navigate("/reportes"); // Navega a la página de reportes
  };

  const handleGoToMenu = () => {
    navigate("/menu"); // Navega al menú
  };

  const handleCreateReport = () => {
    navigate("/create-report"); // Navega a la página de creación de reportes
  };

  return (
    <nav className="nav">
      <a href="" className="nav__logo-link">
        <div className="nav__logo">
          <img src={logo} alt="logo" className="nav__logo-img" />
          <span>CityLens</span>
        </div>
      </a>
      <ul className="nav__list">
        <li className="nav__item">
          <a href="#" onClick={handleGoToMenu}>
            <FontAwesomeIcon icon={faHouse} />
            Inicio
          </a>
        </li>
        <li className="nav__item">
          <a href="#" onClick={handleCreateReport}>
            <FontAwesomeIcon icon={faPencil} />
            Crear reporte
          </a>
        </li>
        <li className="nav__item">
          <a href="#" onClick={handleReportInfo}>
            <FontAwesomeIcon icon={faFileAlt} />
            Reportes
          </a>
        </li>
        <li className="nav__item">
          <a href="#">
            <FontAwesomeIcon icon={faMap} />
            Mapa
          </a>
        </li>
      </ul>
      <div className="user" onClick={() => setMenuOpen(!menuOpen)}>
        <FontAwesomeIcon icon={faUser} />
        <div className={`user-menu ${menuOpen ? "active" : ""}`}>
          <a href="#" onClick={handleEditInfo}>
            Editar información
          </a>
          <a href="#" onClick={handleLogout}>
            Cerrar sesión
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
export { Nav };
