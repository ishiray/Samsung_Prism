import React from "react";
// import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
// import * as IoIcons from "react-icons/io";
export const SidebarData = [
  {
    title: "SUT",
    path: "./SUT",
    icon: <AiIcons.AiOutlineDesktop />,
    className: "nav-text"
  },
  {
    title: "SIM",
    path: "./SIM",
    icon: <AiIcons.AiFillPhone />,

    className: "nav-text"
  },
  {
    title: "Messages",
    path: "./Messages",
    icon: <AiIcons.AiFillMessage />,
    className: "nav-text"
  },
  {
    title: "Analyzer",
    path: "./Analyzer",
    icon: <AiIcons.AiOutlineTool />,
    className: "nav-text"
  },
  {
    title: "Timer",
    path: "./Timer",
    icon: <AiIcons.AiFillClockCircle />,
    className: "nav-text"
  },
  {
    title: "Comment",
    path: "./Comment",
    icon: <AiIcons.AiFillBook />,
    className: "nav-text"
  },

  {
    title: "Data Transfer",
    path: "./DataTransfer",
    icon: <AiIcons.AiOutlineDownload />,
    className: "nav-text"
  }
];
