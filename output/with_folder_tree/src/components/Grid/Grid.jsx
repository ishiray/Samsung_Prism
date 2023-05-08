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
        marginLeft: "180px",
        width:"1015px",
        backgroundImage: `url(${background})` ,
        //backgroundColor: "blue",
        height: "590px"
        // alignItems: "center"
      }}
    >
      <h1 backgroundColor="white">{props.text}</h1>
    </div>
  );
}
export default Grid;
