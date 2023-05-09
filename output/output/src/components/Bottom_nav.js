import React from 'react'

export default function Bottom_nav() {
  return (
    <div style={{width:'100%'}}>
    <ul className="nav nav-tabs" style={{backgroundColor: '#e8e8e8',width: '100%'}}>
    <li className="nav-item">
        <a className="nav-link active py-0" aria-current="page" >General Output</a>
    </li>
    <li className="nav-item">
        <a className="nav-link disabled py-0"  tabindex="-1" aria-disabled="true">Symbol Text View</a>
    </li>
    </ul>
    </div>
  )
}
