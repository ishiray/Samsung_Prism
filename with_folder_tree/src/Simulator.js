import "./styles.css";
import * as React from "react";
import BottomBar from "./components/Bottombar/Bottom_bar";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FileTree from "./components/FileTree/filetree";
import { SidebarData } from "./components/Sidebar/sidebarData";
import { Menu, Item, useContextMenu } from "react-contexify";
import "react-contexify/ReactContexify.css";
import { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { v4 as uuidv4 } from "uuid";
import xmljs from "xml-js";
import { Treebeard } from "react-treebeard";

let clicks = 0;
let st = "";
let en = "";

let s = null;
const SVGContainer = ({
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
  removeRectangle,
  setRemoveRectangle,
  positionX,
  addTimer,
  timerArray,
  setTimerArray,
  setAddTimer,
  setShowTimerModal,
  setCurrentTimerBeingEdited,
  setShowCommentModal,
  addComment,
  setCurrentCommentBeingEdit,
  commentArray,
  setNewComment,
  rectangles,
  setRectangles,
}) => {
  const containerRef = useRef(null);
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
      { name: itemName1 == "SUT" ? "MME" : itemName, x, y, id: uuidv4() },
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

    const cursorX = event.clientX;

    // Get the container's position on the screen
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerX = containerRect.left;
    const containerY = containerRect.top;

    // Get the container's horizontal scroll offset
    const scrollOffsetX = containerRef.current.scrollLeft;

    // Calculate the relative coordinates
    const relativeX = cursorX - containerX + scrollOffsetX;

    setEndX(relativeX);
    positionX = relativeX;
    setEndY(y);

    const lastArrow = arrowsArray[arrowsArray.length - 1];

    if (event.clientX > s) {
      lastArrow.endX = relativeX - 5;
    } else lastArrow.endX = relativeX + 10;
    const tempArray = arrowsArray;
    tempArray.pop();
    tempArray.push(lastArrow);
    setArrowsArray(tempArray);
  };

  const handleLineClick = (event, x, name) => {
    if (!startMessageConnection && !addTimer) return;
    if (addTimer && !startMessageConnection) {
      let temp = timerArray;
      temp.push({
        rectangle: name,
        x,
        y: event.clientY - 69,
        value: 0,
      });
      setTimerArray(temp);
      setAddTimer(false);
      return;
    }
    if (st.length === 0) st = name;
    else en = name;
    clicks = clicks + 1;
    if (clicks % 2 !== 0) {
      let newArr = arrowsArray;
      newArr.push({
        id: uuidv4(),
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
      const lastArrow = arrowsArray[arrowsArray.length - 1];
      lastArrow.to = en;
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
    <div style={{ overflowX: "scroll" }} ref={containerRef}>
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
              onClick={() => {
                if (removeRectangle) {
                  const tempArray = arrowsArray;
                  const arr = tempArray.filter(
                    (arrow) =>
                      arrow.to !== rectangle.id && arrow.from !== rectangle.id
                  );

                  setArrowsArray(arr);
                  handleRectangleRightClick(index);
                  setRemoveRectangle(false);
                }
              }}
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
                handleLineClick(e, rectangle.x + 50, rectangle.id)
              }
              x1={rectangle.x + 50}
              y1={rectangle.y + 30}
              x2={rectangle.x + 50}
              y2="500"
              stroke="black"
            />
          </g>
        ))}
        {timerArray.map((timer, index) => {
          return (
            <g key={index}>
              <polygon
                points={`${timer.x - 7},${timer.y - 7} ${timer.x + 7},${
                  timer.y - 7
                } ${timer.x - 7},${timer.y + 7} ${timer.x + 7},${timer.y + 7} ${
                  timer.x - 7
                },${timer.y - 7}`}
                fill="black"
                stroke="black"
                onClick={() => {
                  setCurrentTimerBeingEdited(timer.rectangle);
                  setShowTimerModal(true);
                }}
                style={{ cursor: "pointer" }}
                strokeWidth="2"
              />
              <text
                x={timer.x + 12}
                y={timer.y}
                fill="black"
                style={{ fontSize: "0.5rem", fontWeight: "bold" }}>
                {timer.value}
              </text>
            </g>
          );
        })}
        {commentArray.map((comment, index) => {
          return (
            <g key={index}>
              <defs>
                <filter x="0" y="0" width="1.1" height="1" id="solid">
                  <feFlood flood-color="yellow" />
                  <feComposite in="SourceGraphic" operator="xor" />
                </filter>
              </defs>
              <text
                filter="url(#solid)"
                x={comment.x}
                y={comment.y}
                style={{ fontSize: "0.7rem" }}>
                {comment.value}
              </text>
              <text
                x={comment.x}
                y={comment.y}
                fill="black"
                style={{ fontSize: "0.7rem" }}>
                {comment.value}
              </text>
            </g>
          );
        })}
        {arrowsArray?.map((arrow) => {
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
                onClick={() => {
                  if (addComment) {
                    setCurrentCommentBeingEdit({
                      id: arrow.id,
                      y: arrow.endY - 7,
                      x: (arrow.startX + arrow.endX) / 2,
                    });
                    commentArray.forEach((comment) => {
                      if (comment.id === arrow.id) {
                        setNewComment(comment.value);
                      }
                    });
                    setShowCommentModal(true);
                  }
                }}
                style={{ cursor: "pointer" }}
                stroke="black"
                strokeWidth="1"></line>
              <polygon
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
  const [messageNames, setMessageNames] = useState([
    {
      msg_xsd_id: 1073,
      msg_name: "KILL_REQUEST                            ",
    },
    {
      msg_xsd_id: 1008,
      msg_name: "UE_CONTEXT_RELEASE_REQUEST              ",
    },
  ]);

  const [selectedMessageID, setSelectedMessageID] = useState(1068);
  const [Tree, setTree] = useState({
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
  });

  function returnSimplifiedJson(rawJson) {
    function addNode(node_data, parent) {
      if (parent["children"]) {
        parent["children"].push({
          name: node_data,
          toggled: true,
          checked: 0,
          isOpen: true,
        });
      } else {
        parent["children"] = [
          {
            name: node_data,
            toggled: true,
            checked: 0,
            isOpen: true,
          },
        ];
      }
      return parent;
    }

    let simplifiedJSON = {};
    simplifiedJSON = addNode(
      rawJson["elements"][0]["elements"][0]["attributes"]["name"],
      simplifiedJSON
    )["children"][0];
    simplifiedJSON["children"] = [];
    if (
      rawJson["elements"][0]["elements"][0]["elements"][0]["elements"][0][
        "elements"
      ]
    ) {
      let parent = {};
      rawJson["elements"][0]["elements"][0]["elements"][0]["elements"][0][
        "elements"
      ].map((element) => {
        if (element["attributes"]["ref"]) {
          if (Object.keys(parent).length !== 0) {
            simplifiedJSON["children"].push(parent);
          }
          parent = {
            name: element["attributes"]["ref"],
            toggled: true,
            checked: 0,
            isOpen: true,
          };
        } else if (element["attributes"]["name"]) {
          parent = addNode(element["attributes"]["name"], parent);
        }
      });
      simplifiedJSON["children"].push(parent);
    }
    return simplifiedJSON;
  }

  useEffect(() => {
    getMessageNames(props.ptcl_id);
  }, []);
  useEffect(() => {
    getTreeValues();
  }, [selectedMessageID]);

  const handleSelectChange = (event) => {
    setSelectedMessageID(event.target.value);
  };

  async function getMessageNames(ptcl_id) {
    try {
      const namesResponse = await fetch(
        `http://localhost:3001/getMsgNameList?ptcl_id=${ptcl_id}`
      );
      const names = await namesResponse.json();
      setMessageNames(names);
    } catch (error) {
      console.error("An error occurred while fetching namesResponse:", error);
    }
  }

  async function getTreeValues() {
    try {
      const treeResponse = await fetch(
        `http://localhost:3001/getMsgXsd?msg_xsd_id=${selectedMessageID}`
      );
      const treeData = await treeResponse.json();
      const treeXML = treeData[0].msg_xsd;
      const treeJSON = xmljs.xml2js(treeXML);
      const simplifiedJSON = returnSimplifiedJson(treeJSON);
      console.log("The simplified json tree is ", simplifiedJSON);
      setTree(simplifiedJSON);
    } catch (error) {
      console.error("An error occurred while fetching getTreeValues:", error);
    }
  }

  const [data, setData] = useState(Tree);
  const [cursor, setCursor] = useState(false);
  const onToggle = (node, toggled) => {
    if (cursor) {
      cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    setCursor(node);
    setData(Object.assign({}, data));
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
          <select
            style={{ margin: "5px" }}
            value={selectedMessageID}
            onChange={handleSelectChange}>
            {messageNames.map((message) => {
              return (
                <option value={message.msg_xsd_id}>{message.msg_name}</option>
              );
            })}
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
            <Treebeard data={Tree} onToggle={onToggle} />
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
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
function Simulator() {
  const [ptclID, setptclID] = useState(1);
  const [arrowsArray, setArrowsArray] = useState([]);

  document.getElementById("main").classList.remove("auth");
  document.getElementById("main").classList.add("simulator");

  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [endX, setEndX] = useState(null);
  const [endY, setEndY] = useState(null);
  const [currentObjectType, setCurrentObjectType] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [startMessageConnection, setStartMessageConnection] = useState(false);
  const [removeRectangle, setRemoveRectangle] = useState(false);
  const [addTimer, setAddTimer] = useState(false);
  const [timerArray, setTimerArray] = useState([]);
  const [currentTimerBeingEdited, setCurrentTimerBeingEdited] = useState();
  const [addComment, setAddComment] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentArray, setCommentArray] = useState([]);
  const [currentCommentBeingEdit, setCurrentCommentBeingEdit] = useState("");
  const [rectangles, setRectangles] = useState([]);
  let positionX = 0;

  let dragOnGoing = false;
  let y = null;

  const handleDragStart = (event, item) => {
    if (item === "Timer") {
      event.dataTransfer.setData("text/plain", item);
    }
    if (item !== "SUT" && currentObjectType.length === 0) {
      return;
    }

    event.dataTransfer.setData("text/plain", item);
  };
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [newTimerValue, setNewTimerValue] = useState("");

  const timerModal = (
    <>
      <div
        style={{
          backgroundColor: "white",
          position: "absolute",
          border: "1px solid black",
          top: "50%",
          left: "50%",
          flexDirection: "column",
          display: "flex",
          padding: "10px",
          alignItems: "center",
          justifyContent: "between",
        }}>
        <p className="header">Edit Value of Timer</p>
        <input
          type="text"
          value={newTimerValue}
          onChange={(e) => setNewTimerValue(e.target.value)}
        />
        <div>
          <button
            className="btn btn-primary m-2"
            onClick={() => {
              setNewTimerValue("");
              setShowTimerModal(false);
            }}>
            Cancel
          </button>
          <button
            className="btn btn-primary m-2"
            onClick={() => {
              let temp = timerArray;
              temp.forEach((timer) => {
                if (timer.rectangle === currentTimerBeingEdited) {
                  timer.value = newTimerValue;
                }
              });
              setTimerArray(temp);
              setNewTimerValue("");
              setShowTimerModal(false);
            }}>
            Save
          </button>
        </div>
      </div>
    </>
  );

  const commentModal = (
    <>
      <div
        style={{
          backgroundColor: "white",
          position: "absolute",
          border: "1px solid black",
          top: "50%",
          left: "50%",
          flexDirection: "column",
          display: "flex",
          padding: "10px",
          alignItems: "center",
          justifyContent: "between",
        }}>
        <p className="header">Add new Comment</p>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div>
          <button
            className="btn btn-primary m-2"
            onClick={() => {
              setNewComment("");
              setAddComment(false);
              setShowCommentModal(false);
            }}>
            Cancel
          </button>
          <button
            className="btn btn-primary m-2"
            onClick={() => {
              let temp = commentArray;
              let flag = false;

              temp.forEach((comment) => {
                if (comment.id === currentCommentBeingEdit.id) {
                  comment.value = newComment;
                  setCommentArray(temp);
                  flag = true;
                }
              });
              if (!flag) {
                temp.push({
                  ...currentCommentBeingEdit,
                  value: newComment,
                });
                setCommentArray(temp);
              }
              setCurrentCommentBeingEdit("");
              setNewComment("");
              setAddComment(false);
              setShowCommentModal(false);
            }}>
            Save
          </button>
        </div>
      </div>
    </>
  );
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
  const [showCommentModal, setShowCommentModal] = useState(false);
  return (
    <>
      <Router>
        <Navbar
          setRemoveRectangle={setRemoveRectangle}
          removeRectangle={removeRectangle}
          rectangles={rectangles}
          arrowsArray={arrowsArray}
          commentArray={commentArray}
          timerArray={timerArray}
        />
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
                    draggable={
                      item.title === "SUT" ||
                      (item.title === "SIM" && currentObjectType)
                        ? true
                        : false
                    }
                    onDragStart={(event) => handleDragStart(event, item.title)}>
                    <div
                      className="d-flex align-items-center"
                      onClick={() => {
                        if (
                          item.title === "Messages" &&
                          !addComment &&
                          !addTimer
                        ) {
                          setStartMessageConnection(!startMessageConnection);
                        }
                        if (
                          item.title === "Timer" &&
                          !addComment &&
                          !startMessageConnection
                        ) {
                          setAddTimer(!addTimer);
                        }
                        if (
                          item.title === "Comment" &&
                          !addTimer &&
                          !startMessageConnection
                        ) {
                          setAddComment(!addComment);
                        }
                      }}
                      onContextMenu={
                        item.title === "SUT" ? null : handleContextMenu
                      }
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          (startMessageConnection &&
                            item.title === "Messages") ||
                          (addTimer && item.title === "Timer") ||
                          (addComment && item.title === "Comment")
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
              setRemoveRectangle={setRemoveRectangle}
              removeRectangle={removeRectangle}
              positionX={positionX}
              addTimer={addTimer}
              setTimerArray={setTimerArray}
              setAddTimer={setAddTimer}
              timerArray={timerArray}
              setShowTimerModal={setShowTimerModal}
              setShowCommentModal={setShowCommentModal}
              setCurrentTimerBeingEdited={setCurrentTimerBeingEdited}
              addComment={addComment}
              setCurrentCommentBeingEdit={setCurrentCommentBeingEdit}
              commentArray={commentArray}
              setNewComment={setNewComment}
              rectangles={rectangles}
              setRectangles={setRectangles}
            />
            <MyVerticallyCenteredModal
              show={showMessageModal}
              onHide={() => setShowMessageModal(false)}
              ptcl_id={ptclID}
            />
            {showTimerModal && timerModal}
            {showCommentModal && commentModal}
            <FileTree />
          </div>
          <BottomBar />
        </div>
      </Router>
    </>
  );
}

export default Simulator;
