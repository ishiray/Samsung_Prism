import React from 'react'
import Bottom_nav from './Bottom_nav'
import 'bootstrap/dist/css/bootstrap.css';

export default function Bottom_bar() {
  return (
      <div className="" style={{width:'100%',height: '40%',position:'absolute',bottom:'1px',}}>
        <Bottom_nav />
      </div>
  )
}
