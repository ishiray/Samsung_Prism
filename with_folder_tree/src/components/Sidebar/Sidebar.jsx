import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./sidebarData";
import "./sidebarStyles.css";
import { IconContext } from "react-icons";
import { useNavigate } from 'react-router-dom';


function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const navigation = useNavigate();

  // function to print the component dragged
  function on_drag(e){
    navigation(e.target.href.split('/')[3]);
  }

  return (
    <>
      <IconContext.Provider value={{ color: "black", size: 20 }}>
        <div className='navbar'>
            <Link to="#" className='menu-bars'>
                <FaIcons.FaBars onClick={showSidebar}/>
            </Link>
        </div> 
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar} style={{ border: "5px blue" }}>
            
          
      
             <li className='navbar-toggle'>
              <Link to="#" className='menu-bars'>
                <AiIcons.AiOutlineClose/>
              </Link>
            </li> 
            {SidebarData.map((item, index) => {
              return (
                <li onDrag={on_drag} key={index} className={item.className} >
                  <Link to={item.path}>
                    {item.icon}
                    <span> {item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;
