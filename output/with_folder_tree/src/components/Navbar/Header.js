import Navbar from './Navbar';
// ...
import { Link } from 'react-router-dom';
import "./Navbar.css";

const Header = () => {
  return (
    <header>
      <div className="nav-area" >
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
