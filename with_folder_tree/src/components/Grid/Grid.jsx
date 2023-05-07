import React from "react";
import "./GridStyle.css";
import background from "./grid.jpeg"

function Grid(props) {
  return (
    <div
      style={{
        marginTop: "0%",
        marginRight: "40%",
        marginBottom: "0%",
        width:"100vw",
        backgroundImage: `url(${background})` ,
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
