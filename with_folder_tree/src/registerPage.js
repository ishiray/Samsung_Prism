import React, { useState } from "react"
import "./index.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Registration({regToApp}) {

  const [newReg,setNewReg] = useState(false);
  const [valid,setValid]=useState(false);
  const [lvalid,setLvalid]=useState(false);
  const [loginUnsuccessful,setloginUnsuccessful]=useState(false);
  const [loggedIn,setLoggedIn]=useState(false);
  const [registeredCorrectly,setRegisteredCorrectly]=useState(false)

  var loginBut = {
    backgroundColor: 'black',
    color: 'white',
    fontSize: '12px',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: 'none'
  
  }

    async function regSubmit() {
      var name = document.getElementById('regName').value
      var email = document.getElementById('regEmail').value
      var pw = document.getElementById('regPassword').value

      if(name && email && pw){
        setValid(true);
        //console.log('set valid',valid,name,email,pw)
        try{
          const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name,email,pw}),
          });
          if (response.status===200){
            setRegisteredCorrectly(true)
            console.log('registered')
          }
          else {
            alert('failed to register')
          }
        }
        catch(err){
            //console.log(err);
        }
      }
      else{
      alert('All fields are mandatory')
      }
    }

    async function loginSubmit() {
      var email = document.getElementById('loginEmail').value
      var pw = document.getElementById('loginPassword').value

      if(email && pw){
        setLvalid(true)
        //console.log('set login valid',lvalid,email,pw)
        try{
          const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email,pw}),
        });
        if (response.status===200){
          setLoggedIn(true)
          regToApp(true)
          console.log('logged in')
        }
        else {
          setloginUnsuccessful(true)
          regToApp(false)
          console.log('failed to log in')
        }
      }
      catch(err){
          console.log('the error is',err);
      }
    }
      else{
        alert('All fields are mandatory')
      }
    }
    
    var regJSX= 
    newReg?(

    <div className="form-container">
      {registeredCorrectly?
      <div className="success-message" onClick={() => setNewReg(false)}>Registration successful. Return to login?</div>
      :null}
      <br/>
      <Form.Control className="data" placeholder="Name" type="text" name="name" id="regName" />
      <Form.Control className="data" placeholder="Email" type="text" name="name" id="regEmail" />
      <Form.Control className="data" placeholder="Password" type="text" name="name" id="regPassword" />
			<Button className="btn" onClick={regSubmit}>
				Register
			</Button>
      <Button className="btn" onClick={() => setNewReg(false)}>
				Already have an account?
			</Button>
    </div>
    ) 
    :
    (

    <div className="form-container">
      <br/>
      <Form.Control className="data" placeholder="Email" type="text" id="loginEmail" />
      <Form.Control className="data" placeholder="Password" type="text" id="loginPassword" />
			<Button className="btn" onClick={loginSubmit}>
				Login
			</Button>
      <Button className="btn" onClick={() => setNewReg(true)}>
				New user?
			</Button>
    </div>
    )

    return (
      <><img className="photo" src={process.env.PUBLIC_URL + "samsung_black.jpg"} />
      <div>
        {regJSX}
      </div></>
    );
  }
  