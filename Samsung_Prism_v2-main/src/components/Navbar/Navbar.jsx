import React from "react";
// import icon from "./icon.png";
import "./Navbar.css";
import NavbarButton from "./NavbarButton";

import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements";
import IconArray from "./IconArray";
function createIcons(Element) {
  return (
    <NavbarButton key={Element.index} icon={Element.icon} alt={Element.alt} />
  );
}

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="" activeStyle>
            File
          </NavLink>
          <NavLink to="" activeStyle>
            Edit
          </NavLink>
          <NavLink to="" activeStyle>
            Run
          </NavLink>
          <NavLink to="" activeStyle>
            Configuration
          </NavLink>
          <NavLink to="" activeStyle>
            Result
          </NavLink>
          <NavLink to="" activeStyle>
            Windows
          </NavLink>
          <NavLink to="" activeStyle>
            Help
          </NavLink>
        </NavMenu>
      </Nav>

      <Nav>
        {/* <div className="second">
          <div className="button">
            <img className="icon" alt=" " src={icon} />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <img className="icon" alt=" " src={icon} />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <img className="icon" alt=" " src={icon} />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <img className="icon" alt=" " src={icon} />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <img className="icon" alt=" " src={icon} />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <img className="icon" alt=" " src={icon} />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <img className="icon" alt=" " src={icon} />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <img className="icon" alt=" " src={icon} />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <img className="icon" alt=" " src={icon} />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <img className="icon" alt=" " src={icon} />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <img className="icon" alt=" " src={icon} />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <img className="icon" alt=" " src={icon} />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <img className="icon" alt=" " src={icon} />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <img className="icon" alt=" " src={icon} />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <img className="icon" alt=" " src={icon} />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <img className="icon" alt=" " src={icon} />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <img className="icon" alt=" " src={icon} />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <img className="icon" alt=" " src={icon} />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <img className="icon" alt=" " src={icon} />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <img className="icon" alt=" " src={icon} />
          </div>
        </div> */}
        {/* <div>hello</div> */}
        {IconArray.map(createIcons)}
      </Nav>
    </>
  );
};

export default Navbar;
