import React from "react";
import "./GridStyle.css";

function Grid(props) {
  return (
    <div
      style={{
        marginTop: "0%",
        marginLeft: "0.08%",
        marginBottom: "0%",
        width: "80%",
        //backgroundColor: "blue",
        height: "615px"
        // alignItems: "center"
      }}
    >
      <h1 backgroundColor="white">{props.text}</h1>
    </div>
  );
}
export default Grid;
