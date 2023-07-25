import React from "react";
import BottomNav from "./Bottom_nav";
import "bootstrap/dist/css/bootstrap.css";

export default function BottomBar() {
  return (
    <div
      className=""
      style={{
        width: "100%",
        height: "1.5vh",
        position: "absolute",
        bottom: "0"
      }}
    >
      <BottomNav />
    </div>
  );
}
