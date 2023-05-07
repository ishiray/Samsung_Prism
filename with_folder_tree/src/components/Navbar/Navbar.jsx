import React from "react";
import icon from "./icon.png";
import "./Navbar.css";
import NavbarButton from "./NavbarButton";
import {useState} from 'react';

import { FaFileExcel } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { FaUndo } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { FaCut } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { FaPaste } from "react-icons/fa";
import { FaWrench } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { BsFillFileBarGraphFill } from "react-icons/bs";
import { BsFillGearFill } from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa";
import { BsFillFileEarmarkCheckFill } from "react-icons/bs";
import { BsArrowLeftRight } from "react-icons/bs";
import { FaTools } from "react-icons/fa";
import { BsTools } from "react-icons/bs";

import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements";

/*
import IconArray from "./IconArray";
function createIcons(Element) {
  return (
    <NavbarButton key={Element.index} icon={Element.icon} alt={Element.alt} />
  );
}*/

const Navbar = () => {

const [profiles, setProfiles] = useState(false);
const [profilesRaw, setProfilesRaw] = useState(false);

async function getProfileNames() {
  fetch('http://localhost:3001/profileList')
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log('The data is ',data);
      setProfilesRaw(data);
      var profList=[];
      for(let profile of data){
        profList.push(profile["sim_name"]);
        console.log('Pushing ',profile["sim_name"]);
      }
      console.log('Setting ',profList);
      setProfiles(profList);
    });
}
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
          <div className="button">
            <FaFileExcel className="icon" onClick={
              getProfileNames
            }/>
          </div>
        </div>
        <div className="second">
          <div className="button">
            <FaFolderOpen className="icon" />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <FaSave className="icon" />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <FaUndo className="icon" />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <FaRedo className="icon" />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <FaCut className="icon" />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <FaCopy className="icon" />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <FaPaste className="icon" />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <FaWrench className="icon" />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <FaPlay className="icon" />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <BsFillFileBarGraphFill className="icon" />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <BsFillGearFill className="icon" />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <FaEnvelope className="icon" />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <BsFillFileEarmarkCheckFill className="icon" />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <BsArrowLeftRight className="icon" />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <FaTools className="icon" />
          </div>
        </div>
        <div className="second">
          <div className="button">
            <BsTools className="icon" />
          </div>
        </div>
        

        {/*
        <div className="second">
          <div className="button">
            <img className="icon" alt=" " src={FaAdn} />
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
        {/*{IconArray.map(createIcons)}*/}
      </Nav>
    </>
  );
};

export default Navbar;
