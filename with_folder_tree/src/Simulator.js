import "./styles.css";
import * as React from "react";
import BottomBar from "./components/Bottombar/Bottom_bar";
import Workspace from "./components/Workspace/workspace";
// import { NavLink } from "react-router-dom";
// import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SUT from "./pages/SUT";
import SIM from "./pages/SIM";
import Analyzer from "./pages/Analyzer";
import Messages from "./pages/Messages";
import Comment from "./pages/Comment";
import Timer from "./pages/Timer";
import DataTransfer from "./pages/DataTransfer";
import FileTree from "./components/FileTree/filetree";
import Home from "./pages/Home";



function Simulator() {
  console.log(document.getElementById("main").className);
  document.getElementById("main").classList.remove("auth");
  document.getElementById("main").classList.add("simulator");
  console.log(document.getElementById("main").className);
 
  return (
    <>
      <Router>
        <Navbar />
        {/* <Workspace/> */}
        
        <Sidebar />
        
        <Routes>
          
          <Route exact path="/" element={<Home />} />
          <Route path="SUT" element={<SUT />} />
          <Route path="SIM" element={<SIM />} />
          <Route path="Analyzer" element={<Analyzer />} />
          <Route path="Timer" element={<Timer />} />
          <Route path="Comment" element={<Comment />} />
          <Route path="Messages" element={<Messages />} />
          <Route path="DataTransfer" element={<DataTransfer />} />
        </Routes>
        <BottomBar />
        <FileTree />
        
      </Router>
    </>
  );
}

export default Simulator;
