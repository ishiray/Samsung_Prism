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
let clicks = 0;
let st = "";
let en = "";

let s = null;
const SVGContainer = ({
  startX,
  startY,
  endX,
  endY,
  setEndX,
  setEndY,
  setStartX,
  setStartY,
  y,
}) => {
  const [rectangles, setRectangles] = useState([]);

  let dragOnGoing = false;
  const handleDrop = (event) => {
    event.preventDefault();
    const itemName = event.dataTransfer.getData("text/plain");
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = 22;

    setRectangles((prevRectangles) => [
      ...prevRectangles,
      { name: itemName, x, y },
    ]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRectangleRightClick = (index) => {
    setRectangles((prevRectangles) => {
      const updatedRectangles = [...prevRectangles];
      updatedRectangles.splice(index, 1);
      return updatedRectangles;
    });
  };

  const handleMouseMove = (event, clicks) => {
    if (clicks % 2 === 0) return;
    // setEndX(() => {
    //   if (event.clientX - 185 > s) {
    //     console.log("clx " + event.clientX);
    //     console.log("stx " + s);
    //     return event.clientX - 185;
    //   }
    //   return event.clientX - 185;
    // });
    setEndX(event.clientX - 185);
    setEndY(y);
  };

  const handleLineClick = (event, x, name) => {
    if (st.length === 0) st = name;
    else en = name;
    // console.log((clicks) % 2 === 0)
    clicks = clicks + 1;
    // console.log(event.clientY)
    if (clicks % 2 !== 0) {
      // setDragOnGoing(true);
      setStartX(x);
      s = x;
      setStartY(event.clientY - 69);
      y = event.clientY - 69;
      document.addEventListener("mousemove", (e) => handleMouseMove(e, clicks));
      dragOnGoing = true;
    } else {
      document.removeEventListener("mousemove", (e) =>
        handleMouseMove(e, clicks)
      );
      setEndX(event.clientX - 185 < startX ? x + 5 : x - 5);
      console.log(st + " is now connected to " + en);
      // console.log(clicks)
      // setEndX(event.clientX);
      // setEndY(y);
      dragOnGoing = false;

      return;
    }
  };

  return (
    <div style={{ overflowX: "scroll" }}>
      <svg
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        width="100vw"
        height="100%"
        style={{ border: "1px solid black" }}
        onContextMenu={(event) => event.preventDefault()} // Disable default right-click context menu
      >
        {rectangles.map((rectangle, index) => (
          <g key={index}>
            <rect
              x={rectangle.x}
              y={rectangle.y}
              width="100"
              height="50"
              fill="#de4e4e"
              onContextMenu={() => handleRectangleRightClick(index)} // Handle right-click on rectangle
            />
            <text
              x={rectangle.x + 10}
              y={rectangle.y + 30}
              fill="white"
              fontWeight="bold">
              {rectangle.name}
            </text>
            <line
              style={{ cursor: "pointer" }}
              strokeWidth={3}
              onClick={(e) =>
                handleLineClick(e, rectangle.x + 50, rectangle.name)
              }
              x1={rectangle.x + 50}
              y1={rectangle.y + 50}
              x2={rectangle.x + 50}
              y2="500"
              stroke="black"
            />
          </g>
        ))}
        <>
          <line
            x1={startX}
            y1={startY}
            x2={endX}
            y2={endY}
            stroke="black"
            strokeWidth="1"></line>
          <polygon
            // x={endX}
            // y={endY}
            points={`${endX},${endY + 5} ${endX},${endY - 5} ${
              endX >= startX ? endX + 5 : endX - 5
            },${endY}`}
            fill="black"
            stroke="black"
            strokeWidth="2"
          />
        </>
      </svg>
    </div>
  );
};
function Simulator() {
  const [arrowLocation, setArrowLocation] = useState(null);

  // console.log(document.getElementById("main").className);
  document.getElementById("main").classList.remove("auth");
  document.getElementById("main").classList.add("simulator");
  // console.log(document.getElementById("main").className);

  const [tableCells, setTableCells] = useState(
    Array.from({ length: 30 }, () => Array.from({ length: 30 }, () => ""))
  );

  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [endX, setEndX] = useState(null);
  const [endY, setEndY] = useState(null);

  let dragOnGoing = false;
  let y = null;

  const handleDragStart = (event, item) => {
    event.dataTransfer.setData("text/plain", item);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleClick = (event) => {
    const word = event.dataTransfer.getData("text/plain");
  };

  const handleDrop = (event, rowIndex, columnIndex) => {
    event.preventDefault();
    const item2 = event.dataTransfer.getData("text/plain");
    const item = (
      <div>
        <div
          style={{
            height: "1.2rem",
            backgroundColor: "#ff000d75",
            paddingRight: "1rem",
          }}>
          <h6 align="center">{item2}</h6>
        </div>
      </div>
    );

    const newTableCells = [...tableCells];
    newTableCells[rowIndex][columnIndex] = item;
    for (let i = rowIndex + 1; i < 30; i++) {
      const item3 = (
        <div
          style={{
            height: "100%",
            width: "2px",
            backgroundColor: "#ff000d75",
            marginLeft: "auto",
            marginRight: "auto",
          }}></div>
      );
      newTableCells[i][columnIndex] = item3;
      setTableCells(newTableCells);
    }
    setTableCells(newTableCells);
  };

  return (
    <>
      <Router>
        <Navbar />
        {/* <Workspace/> */}

        {/* <Sidebar /> */}
        <div className="d-flex flex-column">
          <div
            className="d-flex pb-2 pt-1"
            style={{ width: "100vw", height: "60vh" }}>
            <nav className="sidebar ">
              <ul className="d-flex justify-content-around flex-column h-100">
                {SidebarData.map((item, index) => (
                  <li
                    key={index}
                    draggable={true}
                    onDragStart={(event) => handleDragStart(event, item.title)}>
                    <div
                      className="d-flex align-items-center"
                      style={{ cursor: "pointer" }}>
                      {item.icon}&nbsp;{item.title}
                    </div>
                  </li>
                ))}
              </ul>
            </nav>
            <SVGContainer
              startX={startX}
              startY={startY}
              endX={endX}
              endY={endY}
              dragOnGoing={dragOnGoing}
              setStartX={setStartX}
              setStartY={setStartY}
              setEndX={setEndX}
              setEndY={setEndY}
              y={y}
              clicks={clicks}
            />
            {/* <div
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
                          style={{
                            width: "100px",
                            cursor: "pointer",
                            fontSize: "0.7rem",
                          }}
                          onDragOver={handleDragOver}
                          onClick={() => {
                            const newTableCells = [...tableCells];
                            console.log(newTableCells[rowIndex][columnIndex]);
                            if (
                              !newTableCells[rowIndex][columnIndex]?.props?.style
                            ) {
                              newTableCells[rowIndex][columnIndex] = "";
                              setTableCells(newTableCells);
                              for (let i = rowIndex + 1; i < 30; i++) {
                                const item3 = "";
                                newTableCells[i][columnIndex] = item3;
                                setTableCells(newTableCells);
                              }
                            }

                            // Arrow generation
                            if(!arrowLocation){
                              setArrowLocation({
                                start:{
                                  row: rowIndex,
                                  column: columnIndex,
                                }
                              })
                              console.log("the arrow begins at"+rowIndex+" "+columnIndex)
                            }else{
                              setArrowLocation({
                                ...arrowLocation,
                                end: {
                                  row: arrowLocation.start.row,
                                  column: columnIndex,
                                }
                              })
                              console.log("the arrow ends at"+arrowLocation.start.row+" "+columnIndex)
                            }
                              
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
            </div> */}
            <FileTree />
          </div>
          <BottomBar />
        </div>
      </Router>
    </>
  );
}

export default Simulator;
