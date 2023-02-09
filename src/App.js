import * as React from 'react';
// import Grid from './components/Grid';
import Bottom_bar from './components/Bottom_bar';
import { NavLink } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router} from 'react-router-dom';
 
 
export default class App extends React.Component{
  render() {
    return (
        <>
          <Router>
            <Navbar />
          </Router>
          <Bottom_bar/>
        </>
    )
  }
}