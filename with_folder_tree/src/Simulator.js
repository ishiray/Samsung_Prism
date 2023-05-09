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
import { SidebarData } from "./components/Sidebar/sidebarData";
import { useState } from "react";

function Simulator() {
  console.log(document.getElementById("main").className);
  document.getElementById("main").classList.remove("auth");
  document.getElementById("main").classList.add("simulator");
  console.log(document.getElementById("main").className);

  const [tableCells, setTableCells] = useState(
    Array.from({ length: 30 }, () => Array.from({ length: 30 }, () => ""))
  );

  const handleDragStart = (event, item) => {
    event.dataTransfer.setData("text/plain", item);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, rowIndex, columnIndex) => {
    event.preventDefault();
    const item = event.dataTransfer.getData("text/plain");
    const newTableCells = [...tableCells];
    newTableCells[rowIndex][columnIndex] = item;
    setTableCells(newTableCells);
  };

  return (
    <>
    <Router>
        <Navbar />
        {/* <Workspace/> */}

        {/* <Sidebar /> */}
        <div className="d-flex flex-column">

       
        <div className="d-flex pb-2 pt-1" style={{ width: "100vw", height: "60vh" }}>
          <nav className="sidebar ">
            <ul className="d-flex justify-content-around flex-column h-100"> 
              {SidebarData.map((item, index) => (
                <li
                  key={index}
                  draggable={true}
                  onDragStart={(event) => handleDragStart(event, item.title)}
                > 
                <div className="d-flex align-items-center" style={{cursor:'pointer'}}>
                  {item.icon}&nbsp;{item.title}
                </div>
                  
                </li>
              ))}
            </ul>
          </nav>

          <div
            style={{
              flex: 1,
              overflowX: "scroll",
              overflowY: "scroll",
            }}
          >
            <table
              style={{ height: "100%", width: "250vw", tableLayout: "fixed" }}
            >
              <tbody>
                {tableCells.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, columnIndex) => (
                      <td
                        key={columnIndex}
                        className="cell"
                        style={{ width: "100px" , cursor:"pointer",fontSize:"0.7rem"}}
                        onDragOver={handleDragOver}
                        onClick={() => {
                          const newTableCells = [...tableCells];
                          newTableCells[rowIndex][columnIndex] = "";
                          setTableCells(newTableCells);
                        }}
                        onDrop={(event) =>
                          handleDrop(event, rowIndex, columnIndex)
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <FileTree />
        </div>
        <BottomBar />
        </div>
        </Router>
    </>
  );
}

export default Simulator;