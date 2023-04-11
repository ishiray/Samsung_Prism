import React from "react";
import BottomNav from "./Bottom_nav";
import "bootstrap/dist/css/bootstrap.css";

export default function BottomBar() {
  return (
    <div
      className=""
      style={{
        width: "80%",
        height: "35%",
        position: "absolute",
        bottom: "1px"
      }}
    >
      <BottomNav />
    </div>
  );
}
