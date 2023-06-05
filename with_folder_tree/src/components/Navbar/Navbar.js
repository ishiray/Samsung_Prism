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
import "./Navbar.css";
import MenuItems from './MenuItems';
import { menuItemsList } from './menuItemsList';

const Navbar = () => {

  async function getProfileNames() {
    fetch('http://localhost:3001/profileList')
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('The data is ',data);
        var profList=[];
        //get index of configuration tab in menuItemsList
        var confIndex;
        var profsimIndex;
        for(confIndex = 0; confIndex < menuItemsList.length; confIndex++){
          if (menuItemsList[confIndex]["title"]==='Configuration'){
            break;
          }
        }
        for(profsimIndex = 0; profsimIndex < menuItemsList[confIndex]["submenu"].length; profsimIndex++){
          if (menuItemsList[confIndex]["submenu"][profsimIndex]["title"]==='Profile Simulators'){
            break;
          }
        }
        for(let profile of data){
          profList.push(profile["sim_name"]);
          console.log('Pushing ',profile["sim_name"]);
          menuItemsList[confIndex]["submenu"][profsimIndex]["submenu"].push({
            title: profile["sim_name"],
            onclick: "profileMenuDisplay"
            // url: '/',
          })
        }
        console.log('This is the profiles list ',profList);
        console.log('This is the new menuItemsList ',menuItemsList);
      });
  }
  
  getProfileNames();
  
  return (
    <nav>
      <ul className="menus">
        {menuItemsList.map((menu, index) => {
          const depthLevel = 0;
          return (
            <MenuItems
              items={menu}
              key={index}
              depthLevel={depthLevel}
            />
          );
        })}
      </ul>
      <Nav>
        <div className="second">
          <div className="button">
            <FaFileExcel className="icon" />
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
      </Nav>
    </nav>
  );
};

export default Navbar;
