import "./nav.scss";

const Nav = () => {
  return (
    <nav className="nav">
      <div className="nav__logo">CityLens</div>
      <ul className="nav__list">
        <li className="nav__item"><a href="#">Inicio</a></li>
        <li className="nav__item"><a href="#">Servicios</a></li>
        <li className="nav__item"><a href="#">Nosotros</a></li>
        <li className="nav__item"><a href="#">Contacto</a></li>
      </ul>
    </nav>
  );
};

export default Nav;
export { Nav };
