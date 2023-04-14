import React, { useState } from "react";
import "./Bottom_bar.css";

export default function BottomNav() {
  const [state, setState] = useState(true);
  function makeTrue() {
    setState(true);
  }
  function makeFalse() {
    setState(false);
  }
  // let classVar=state?

  if (state) {
    return (
      <div style={{ width: "100%" }}>
        <ul
          className="nav nav-tabs"
          style={{ backgroundColor: "#e8e8e8", width: "100%",  height: "280px" }}
        >
          <li className="nav-item">
            <a
              className="nav-link active py-0"
              aria-current="page"
              // href="/"
            >
              <button
                style={{ border: 0, backgroundColor: "transparent" ,color:"black"}}
                onClick={makeTrue}
              >
                General Output
              </button>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link active py-0"
              style={{ backgroundColor: "transparent" }}
              // tabindex="-1"
              // aria-disabled="true"
              // href="/"
            >
              <button
                style={{ border: 0, backgroundColor: "transparent" ,color:"black"}}
                onClick={makeFalse}
              >
                Symbol Text View
              </button>
            </a>
          </li>
          <h6><br></br>This is the General Output view</h6> 
        </ul>
        
      </div>
    );
  } else {
    return (
      <div style={{ width: "100%" }}>
        <ul
          className="nav nav-tabs"
          style={{ backgroundColor: "#e8e8e8", width: "100%",  height: "280px" }}
        >
          <li className="nav-item">
            <a
              className="nav-link active py-0"
              style={{ backgroundColor: "transparent" ,color:"black"}}
              // tabindex="-1"
              // aria-disabled="true"
              // href="/"
            >
              <button
                style={{ border: 0, backgroundColor: "transparent" ,color:"black"}}
                onClick={makeTrue}
              >
                General Output
              </button>
            </a>
          </li>
          <li className="nav-item">
            <a
              className=" nav-link active py-0"
              aria-current="page"
              //  href="/"
            >
              <button
                style={{ border: 0, backgroundColor: "transparent" ,color:"black"}}
                onClick={makeFalse}
              >
                Symbol Text View
              </button>
            </a>
          </li>
          <h6><br></br>This is the Symbol Text View </h6>
        </ul>
        
      </div>
    );
  }
}
