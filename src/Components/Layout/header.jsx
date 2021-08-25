import { Container } from "react-bootstrap";
import Classes from "./header.module.scss";
import { Link, NavLink } from "react-router-dom";

export default function HeaderSection(props) {
  return (
    <header>
      <nav className={Classes.Navbar}>
        <Container className='d-flex align-items-center'>
          <Link to="/" className={Classes.Navbar_brandLogo}>
            Miran
          </Link>

          <ul className={`${Classes.Navbar_list} list-unstyled ms-auto`}>
            <li className={Classes.Navbar_list_item} >
              <NavLink to="/" className={Classes.Navbar_list_item_link}>Home</NavLink>
            </li>
            <li className={Classes.Navbar_list_item}>
              <NavLink to="/country-list" className={Classes.Navbar_list_item_link}>Country List</NavLink>
            </li>
          </ul>
        </Container>
      </nav>
    </header>
  );
}
