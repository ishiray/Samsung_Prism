import React from "react";
import "./GridStyle.css";

function Grid(props) {
  return (
    <div
      style={{
        marginTop: "0%",
        marginLeft: "180px",
        marginBottom: "0%",
        // backgroundColor: "blue",
        height: "615px"
        // alignItems: "center"
      }}
    >
      <h1 backgroundColor="white">{props.text}</h1>
    </div>
  );
}
export default Grid;
