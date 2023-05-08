import "./styles.css";
import * as React from "react";
import Grid from "./components/Grid/Grid";
import BottomBar from "./components/Bottombar/Bottom_bar";
import { NavLink } from "react-router-dom";
// import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
// import {BrowserRouter as Router} from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SUT from "./pages/SUT";
import SIM from "./pages/SIM";
import Analyzer from "./pages/Analyzer";
import Messages from "./pages/Messages";
import Comment from "./pages/Comment";
import Timer from "./pages/Timer";
import DataTransfer from "./pages/DataTransfer";
// import Grid from "./components/Grid/Grid";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Sidebar />
        <Grid />
        <Routes>
          <Route exact path="/" component={<App />} />
          <Route path="/pages/SUT" component={<SUT />} />
          <Route path="SIM" component={<SIM />} />
          <Route path="Analyzer" component={<Analyzer />} />
          <Route path="Timer" component={<Timer />} />
          <Route path="Comment" component={<Comment />} />
          <Route path="Messages" component={<Messages />} />
          <Route path="DataTransfer" component={<DataTransfer />} />
        </Routes>
        <BottomBar />
      </Router>
    </>
  );
}

export default App;
