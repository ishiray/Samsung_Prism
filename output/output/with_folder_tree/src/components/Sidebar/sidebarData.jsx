import React from "react";
// import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
// import * as IoIcons from "react-icons/io";
export const SidebarData = [
  {
    id: 1,
    title: "SUT",
    path: "./SUT",
    icon: <AiIcons.AiOutlineDesktop />,
    className: "nav-text"
  },
  {
    id: 2,
    title: "SIM",
    path: "./SIM",
    icon: <AiIcons.AiFillPhone />,

    className: "nav-text"
  },
  {
    id: 3,
    title: "Messages",
    path: "./Messages",
    icon: <AiIcons.AiFillMessage />,
    className: "nav-text"
  },
  {
    id: 4,
    title: "Analyzer",
    path: "./Analyzer",
    icon: <AiIcons.AiOutlineTool />,
    className: "nav-text"
  },
  {
    id: 5,
    title: "Timer",
    path: "./Timer",
    icon: <AiIcons.AiFillClockCircle />,
    className: "nav-text"
  },
  {
    id: 6,
    title: "Comment",
    path: "./Comment",
    icon: <AiIcons.AiFillBook />,
    className: "nav-text"
  },

  {
    id: 7,
    title: "Data Transfer",
    path: "./DataTransfer",
    icon: <AiIcons.AiOutlineDownload />,
    className: "nav-text"
  }
];
