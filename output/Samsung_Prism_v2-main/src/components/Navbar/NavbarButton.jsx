import React from "react";
import "./Navbar.css";

function NavbarButton(props) {
  return (
    <div className="second">
      <div className="button">
        <img className="icon" alt={props.alt} src={props.icon} />
      </div>
    </div>
  );
}

export default NavbarButton;
