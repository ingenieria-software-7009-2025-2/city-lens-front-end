import { useState, useContext } from "react"; // Asegúrate de importar useContext correctamente
import "./nav.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext"; 
import userIMG from "../../../assets/images/user2.png";
import logo from "../../../assets/images/Logo.png";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useContext(AuthContext); // Usa useContext correctamente
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  return (
    <nav className="nav">
      <a href="">
        <div className="nav__logo">
          <img src={logo} alt="logo" /><span>CityLens</span>
        </div>
      </a>
      <ul className="nav__list">
        <li className="nav__item"><a href="#">Inicio</a></li>
        <li className="nav__item"><a href="#">Reportes</a></li>
        <li className="nav__item"><a href="#">Mis reportes</a></li>
        <li className="nav__item"><a href="#">Mapa</a></li>
      </ul>
      <div className="user" onClick={() => setMenuOpen(!menuOpen)}>
        <img src={userIMG} alt="Usuario" />
        <div className={`user-menu ${menuOpen ? "active" : ""}`}>
          <a href="#">Editar información</a>
          <a href="#" onClick={handleLogout}>Cerrar sesión</a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
export { Nav };


