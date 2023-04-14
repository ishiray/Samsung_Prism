import React, { useState } from "react";
import Registration from './registerPage.js';
import Simulator from './Simulator.js';



export default function App() {

  const [loggedIn, setLoggedIn] =useState(true);
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
