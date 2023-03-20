import React, { useState } from "react"
//import "./index.css";
import Registration from './registerPage.js';
import Simulator from './simulator.js';



export default function App() {

  const [loggedIn, setLoggedIn] =useState(false);
  const regToApp = (regData) => {
    setLoggedIn(regData)
  }

  return (
    <div>
      {loggedIn ? 
      <Simulator /> : <Registration regToApp={regToApp}/>}
    </div>
  );
}
