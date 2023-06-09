import React, { useState } from "react";
import Registration from './registerPage.js';
import Simulator from './Simulator.js';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


export default function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const regToApp = (regData) => {
    setLoggedIn(regData)
  }

  return (
    // <DndProvider backend = {HTML5Backend}>
    // <div>
    //   {loggedIn ? 
    //   <Simulator /> : <Registration regToApp={regToApp}/>}
    // </div>
    // </DndProvider>
    <div>
      
      <Simulator /> 
      
    </div>
  );
}
