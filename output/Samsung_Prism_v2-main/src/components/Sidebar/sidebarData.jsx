import React from "react";
// import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
// import * as IoIcons from "react-icons/io";
export const SidebarData = [
  {
    title: "SUT",
    path: "./pages/SUT",
    icon: <AiIcons.AiOutlineDesktop />,
    className: "nav-text"
  },
  {
    title: "SIM",
    path: "./pages/SIM.js",
    icon: <AiIcons.AiFillPhone />,

    className: "nav-text"
  },
  {
    title: "Messages",
    path: "./pages/Messages.js",
    icon: <AiIcons.AiFillMessage />,
    className: "nav-text"
  },
  {
    title: "Analyzer",
    path: "./pages/Analyzer.js",
    icon: <AiIcons.AiOutlineTool />,
    className: "nav-text"
  },
  {
    title: "Timer",
    path: "./pages/Timer.js",
    icon: <AiIcons.AiFillClockCircle />,
    className: "nav-text"
  },
  {
    title: "Comment",
    path: "./pages/Comment.js",
    icon: <AiIcons.AiFillBook />,
    className: "nav-text"
  },

  {
    title: "Data Transfer",
    path: "./pages/dataTransfer.js",
    icon: <AiIcons.AiOutlineDownload />,
    className: "nav-text"
  }
];
