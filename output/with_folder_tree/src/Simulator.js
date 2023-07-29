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
import { Menu, Item, useContextMenu } from "react-contexify";
import "react-contexify/ReactContexify.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FolderTree from "react-folder-tree";

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
  setShowMessageModal,
  y,
  currentObjectType,
  setCurrentObjectType,
  arrowsArray,
  setArrowsArray,
  setStartMessageConnection,
  startMessageConnection,
}) => {
  const [rectangles, setRectangles] = useState([]);

  let dragOnGoing = false;
  const handleDrop = (event) => {
    event.preventDefault();
    const itemName1 = event.dataTransfer.getData("text/plain");
    const itemName = currentObjectType;
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = 22;

    setRectangles((prevRectangles) => [
      ...prevRectangles,
      { name: itemName1 == "SUT" ? "MME" : itemName, x, y },
    ]);
    setCurrentObjectType("");
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

    const lastArrow = arrowsArray[arrowsArray.length - 1];
    console.log("lastArrow:", lastArrow);

    if (event.clientX > s) {
      lastArrow.endX = event.clientX - 185;
    } else lastArrow.endX = event.clientX - 165;

    // lastArrow.endX = x
    // lastArrow.endY = y
    const tempArray = arrowsArray;
    tempArray.pop();
    tempArray.push(lastArrow);
    setArrowsArray(tempArray);
  };

  const handleLineClick = (event, x, name) => {
    if (!startMessageConnection) return;
    if (st.length === 0) st = name;
    else en = name;
    // console.log((clicks) % 2 === 0)
    clicks = clicks + 1;
    // console.log(event.clientY)
    if (clicks % 2 !== 0) {
      // setDragOnGoing(true);
      let newArr = arrowsArray;
      newArr.push({
        startX: x,
        startY: event.clientY - 69,
        endX: null,
        endY: event.clientY - 69,
        from: st,
      });
      setArrowsArray(newArr);
      setStartX(x);
      s = x;
      setStartY(event.clientY - 69);
      y = event.clientY - 69;
      console.log("Message start co-ordinates are x: " + s + " y: " + y);
      document.addEventListener("mousemove", (e) => handleMouseMove(e, clicks));
      dragOnGoing = true;
    } else {
      console.log("Message end co-ordinates are x: " + endX + " y: " + endY);
      document.removeEventListener("mousemove", (e) =>
        handleMouseMove(e, clicks)
      );
      setEndX(event.clientX - 185 < startX ? x + 5 : x - 5);
      console.log(st + " is now connected to " + en);
      // console.log(clicks)
      // setEndX(event.clientX);
      // setEndY(y);
      const lastArrow = arrowsArray[arrowsArray.length - 1];
      console.log("lastArrow:", lastArrow);

      if (event.clientX > s) {
        lastArrow.endX = event.clientX - 185;
      } else lastArrow.endX = event.clientX - 175;
      lastArrow.to = en;
      // lastArrow.endX = x
      // lastArrow.endY = y
      const tempArray = arrowsArray;
      tempArray.pop();
      tempArray.push(lastArrow);
      setArrowsArray(tempArray);
      dragOnGoing = false;
      setStartX(null);
      setEndX(null);
      setStartY(null);
      setEndY(null);
      st = "";
      en = "";
      setStartMessageConnection(false);
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
              height="30"
              fill={rectangle.name === "MME" ? "#de4e4e" : "#253c9d"}
              onContextMenu={() => handleRectangleRightClick(index)} // Handle right-click on rectangle
            />
            <text
              x={rectangle.x + 10}
              y={rectangle.y + 20}
              fill="white"
              fontWeight="">
              {rectangle.name}
            </text>
            <line
              style={{ cursor: "pointer" }}
              strokeWidth={3}
              onClick={(e) =>
                handleLineClick(e, rectangle.x + 50, rectangle.name)
              }
              x1={rectangle.x + 50}
              y1={rectangle.y + 30}
              x2={rectangle.x + 50}
              y2="500"
              stroke="black"
            />
          </g>
        ))}
        {/* <><line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="black"
        strokeWidth="1"
      ></line>
        <polygon
          // x={endX}
          // y={endY}
          points={`${endX},${endY + 5} ${endX},${endY - 5} ${endX >= startX ? endX + 5 : endX - 5},${endY}`}
          fill="black"
          stroke="black"
          strokeWidth="2"
        />
      </> */}
        {arrowsArray?.map((arrow) => {
          console.log(arrow);
          return (
            <>
              <line
                x1={arrow.startX}
                y1={arrow.startY}
                x2={arrow.endX}
                y2={arrow.endY}
                onDoubleClick={() => {
                  setShowMessageModal(true);
                }}
                style={{ cursor: "pointer" }}
                stroke="black"
                strokeWidth="1"></line>
              <polygon
                // x={endX}
                // y={endY}
                points={`${arrow.endX},${arrow.endY + 5} ${arrow.endX},${
                  arrow.endY - 5
                } ${
                  arrow.endX >= arrow.startX ? arrow.endX + 5 : arrow.endX - 5
                },${arrow.endY}`}
                fill="black"
                stroke="black"
                strokeWidth="2"
              />
            </>
          );
        })}
      </svg>
    </div>
  );
};

function MyVerticallyCenteredModal(props) {
  const treeState = {
    name: "CELL_TRAFFIC_TRACE",
    checked: 0, // half check: some children are checked
    isOpen: true, // this folder is opened, we can see it's children
    children: [
      {
        name: "Message_Type",
        checked: 0,
        isOpen: true,
        children: [
          {
            name: "Procedure Code",
            checked: 0,
            isOpen: true,
            children: [{ name: "HandoverPreparation", checked: 0 }],
          },
          { name: "Type of Message", checked: 0 },
        ],
      },
      { name: "MME_UE_SIAP_ID", checked: 0 },
      { name: "eNB_UE_SIAP_ID", checked: 0 },
      { name: "EUTRAN_Trace_ID", checked: 0 },
      { name: "E_UTRAN_CGI", checked: 0 },
      { name: "Trace_Collection_Entry_IPAddress", checked: 0 },
    ],
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header centered closeButton>
        <div style={{ margin: "auto", fontSize: "0.7rem" }}>
          Message Name:
          <select style={{ margin: "5px" }}>
            <option value="1">CELL_TRAFFIC_TRACE</option>
          </select>
        </div>
      </Modal.Header>
      <Modal.Body style={{ padding: "0" }}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "50%",
              height: "450px",
              borderRight: "1px solid black",
              overflowY: "scroll",
              padding: "10px",
            }}>
            <FolderTree
              data={treeState}
              showCheckbox={false}
              initOpenStatus="custom" // default is 'open'
            />
          </div>
          <div
            style={{
              width: "50%",
              height: "450px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <div style={{ fontSize: "0.7rem" }}>
              <p style={{ color: "black", margin: "0" }}>
                Name: Procedure_Code
              </p>
              <p style={{ color: "black", margin: "0" }}>
                Parent: Message_Type
              </p>
              <p style={{ color: "black", margin: "0" }}>Data Type: Choice</p>
              <p style={{ color: "black", margin: "0" }}>Length: None</p>
              <span style={{ color: "black", margin: "0" }}>Data: </span>
              <select>
                <option value="1">Handover_Preparation</option>
              </select>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Save</Button> */}
      </Modal.Footer>
    </Modal>
  );
}
function Simulator() {
  const [arrowLocation, setArrowLocation] = useState(null);
  const [arrowsArray, setArrowsArray] = useState([]);

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
  const [currentObjectType, setCurrentObjectType] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [startMessageConnection, setStartMessageConnection] = useState(false);

  let dragOnGoing = false;
  let y = null;

  const handleDragStart = (event, item) => {
    if (item !== "SUT" && currentObjectType.length === 0) {
      console.log("first");
      return null;
    }
    event.dataTransfer.setData("text/plain", item);
  };

  // const handleDragOver = (event) => {
  //   event.preventDefault();
  // };

  // const handleClick = (event) => {
  //   const word = event.dataTransfer.getData("text/plain");
  // };

  // const handleDrop = (event, rowIndex, columnIndex) => {
  //   event.preventDefault();
  //   const item2 = event.dataTransfer.getData("text/plain");
  //   const item = (
  //     <div>
  //       <div
  //         style={{
  //           height: "1.2rem",
  //           backgroundColor: "#ff000d75",
  //           paddingRight: "1rem",
  //         }}>
  //         <h6 align="center">{item2}</h6>
  //       </div>
  //     </div>
  //   );

  //   const newTableCells = [...tableCells];
  //   newTableCells[rowIndex][columnIndex] = item;
  //   for (let i = rowIndex + 1; i < 30; i++) {
  //     const item3 = (
  //       <div
  //         style={{
  //           height: "100%",
  //           width: "2px",
  //           backgroundColor: "#ff000d75",
  //           marginLeft: "auto",
  //           marginRight: "auto",
  //         }}></div>
  //     );
  //     newTableCells[i][columnIndex] = item3;
  //     setTableCells(newTableCells);
  //   }
  //   setTableCells(newTableCells);
  // };
  const { show } = useContextMenu({
    id: "MENU_ID",
  });
  const handleContextMenu = (event) => {
    show({
      event,
      props: {
        key: "value",
      },
    });
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
              <Menu id={"MENU_ID"}>
                <Item
                  onClick={() => {
                    setCurrentObjectType("UE/EnodeB");
                  }}>
                  UE/EnodeB
                </Item>
                <Item
                  onClick={() => {
                    setCurrentObjectType("S-GW");
                  }}>
                  S-GW
                </Item>
                <Item
                  onClick={() => {
                    setCurrentObjectType("MSCServer");
                  }}>
                  MSCServer
                </Item>
                <Item
                  onClick={() => {
                    setCurrentObjectType("HRPD");
                  }}>
                  HRPD
                </Item>
                <Item
                  onClick={() => {
                    setCurrentObjectType("PreRSSGSN");
                  }}>
                  PreRSSGSN
                </Item>
                <Item
                  onClick={() => {
                    setCurrentObjectType("RSSGSN");
                  }}>
                  RSSGSN
                </Item>
                <Item
                  onClick={() => {
                    setCurrentObjectType("E SMLC");
                  }}>
                  E SMLC
                </Item>
                <Item
                  onClick={() => {
                    setCurrentObjectType("CBC");
                  }}>
                  CBC
                </Item>
                <Item
                  onClick={() => {
                    setCurrentObjectType("ONExCSWS");
                  }}>
                  ONExCSWS
                </Item>
                <Item
                  onClick={() => {
                    setCurrentObjectType("MCE");
                  }}>
                  MCE
                </Item>
                <Item
                  onClick={() => {
                    setCurrentObjectType("LIADMF");
                  }}>
                  LIADMF
                </Item>
                <Item
                  onClick={() => {
                    setCurrentObjectType("E GMLC/SMSC");
                  }}>
                  E GMLC/SMSC
                </Item>
                <Item
                  onClick={() => {
                    setCurrentObjectType("NGNB");
                  }}>
                  NGNB
                </Item>
              </Menu>
              <ul className="d-flex justify-content-around flex-column h-100">
                {SidebarData.map((item, index) => (
                  <li
                    key={index}
                    draggable={true}
                    onDragStart={(event) => handleDragStart(event, item.title)}>
                    <div
                      className="d-flex align-items-center"
                      onClick={() => {
                        if (item.title === "Messages") {
                          setStartMessageConnection(!startMessageConnection);
                        }
                      }}
                      onContextMenu={
                        item.title === "SUT" ? null : handleContextMenu
                      }
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          startMessageConnection && item.title === "Messages"
                            ? "rgba(255,0,0,0.4)"
                            : "#fff",
                        padding: "5px 0 5px 5px",
                        borderRadius: "10px",
                      }}>
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
              setShowMessageModal={setShowMessageModal}
              clicks={clicks}
              currentObjectType={currentObjectType}
              setCurrentObjectType={setCurrentObjectType}
              arrowsArray={arrowsArray}
              setArrowsArray={setArrowsArray}
              setStartMessageConnection={setStartMessageConnection}
              startMessageConnection={startMessageConnection}
            />
            <MyVerticallyCenteredModal
              show={showMessageModal}
              onHide={() => setShowMessageModal(false)}
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
