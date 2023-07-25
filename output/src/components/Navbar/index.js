import React from 'react' ;
import icon from "./images/icon.png";
import icon1 from "./images/xls.gif";
import icon2 from "./images/open.jpg";
import icon3 from "./images/save.jpg";
import icon5 from "./images/undo1.png";
import icon6 from "./images/redo1.png";
import icon7 from "./images/cut.jpg";
import icon8 from "./images/copy.jpg";
import icon9 from "./images/paste.jpg";
import icon10 from "./images/build.jpg";
import icon11 from "./images/run.jpg";
import icon14 from "./images/graphicalview.jpg";
import icon15 from "./images/switch.jpg";
import icon16 from "./images/blankmessage.jpg";
import icon17 from "./images/selectall.jpg";
import icon18 from "./images/reverse.jpg";
import icon19 from "./images/buildmultiple.jpg";
import icon20 from "./images/buildMultipleTestId.jpg";
import {Nav, NavLink, Bars, NavMenu} from './Navbarelements';


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
        
        
        <div className="second">
            <div className='button'>
                <img className="icon" src={icon1} />
            </div>   
        </div>
        <div className="second">
            <div className='button'>
                <img className="icon" src={icon2} />
            </div>     
        </div>
        <div className="second">
            <div className='button'>
                <img className="icon" src={icon3} />
            </div>     
        </div>
        <div className="second">
            <div className='button'>
                <img className="icon" src={icon} />
            </div>     
        </div>
        <div className="second">
            <div className='button'>
                <img className="icon" src={icon5} />
            </div>     
        </div>
        <div className="second">
            <div className='button'>
                <img className="icon" src={icon6} />
            </div>     
        </div>
        <div className="second">
            <div className='button'>
                <img className="icon" src={icon7} />
            </div>     
        </div>
        <div className="second">
            <div className='button'>
                <img className="icon" src={icon8} />
            </div>     
        </div>
        <div className="second">
            <div className='button'>
                <img className="icon" src={icon9} />
            </div>     
        </div>
        <div className="second">
            <div className='button'>
                <img className="icon" src={icon10} />
            </div>     
        </div>
        <div className="second">
            <div className='button'>
                <img className="icon" src={icon11} />
            </div>     
        </div>
        <div className="second">
            <div className='button'>
                <img className="icon" src={icon} />
            </div>     
        </div>
        <div className="second">
            <div className='button'>
                <img className="icon" src={icon} />
            </div>     
        </div>
        <div className="second">
            <div className='button'>
                <img className="icon" src={icon14} />
            </div>     
        </div>
        <div className="second">
            <div className='button'>
                <img className="icon" src={icon15} />
            </div>     
        </div>
        <div className="second">
            <div className='button'>
                <img className="icon" src={icon16} />
            </div>     
        </div>
        <div className="second">
            <div className='button'>
                <img className="icon" src={icon17} />
            </div>     
        </div>
        <div className="second">
            <div className='button'>
                <img className="icon" src={icon18} />
            </div>     
        </div>
        <div className="second">
            <div className='button'>
                <img className="icon" src={icon19} />
            </div>     
        </div>
        <div className="second">
            <div className='button'>
                <img className="icon" src={icon20} />
            </div>     
        </div>
      </Nav>
    </>
  );
};

export default Navbar;
