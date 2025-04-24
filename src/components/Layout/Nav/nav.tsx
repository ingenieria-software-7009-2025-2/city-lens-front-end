import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "./nav.scss";
import { AuthContext } from "../../../context/AuthContext";

import logo from "../../../assets/images/Logo.png";
import logo2 from "../../../assets/images/Logo2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPencil, faFileAlt, faMap, faUser } from "@fortawesome/free-solid-svg-icons";

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


