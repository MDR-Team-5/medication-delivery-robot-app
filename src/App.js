import React, { useState } from 'react';
import './App.css';
// uncomments these if we end up making separate pages for things
// import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
// import Dashboard from './components/Dashboard/Dashboard';

var loginInfo = false;
async function loginUser(credentials) {
  // print username/password inputted for testing
  // console.log(credentials.username)
  // console.log(credentials.password)
    if (credentials.username === "user" && credentials.password === "pass") {
      loginInfo = true
      document.getElementById("loginForm").style.display = "none"
      document.getElementById("homeContent").style.display = "block"
    } else {
      alert("Incorrect username or password. Please try a different username or password.");
    }
 }

function App({ setToken }) {

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
  }

  return (

    <div className="App">
      
      <h1> Medication Delivery Robot </h1>

      <div id="loginForm">
        <h2 style={{ marginBottom: "10px" }}>Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username: </p>
            <input type="text" onChange={e => setUserName(e.target.value)}/>
            <br />
          </label>
          <label>
            <p>Password: </p>
            <input type="password" onChange={e => setPassword(e.target.value)}/>
          </label>
          <div>
            <button className="btn" type="submit">Login</button>
          </div>
        </form>
      </div>

      <div id="homeContent" style={{ display: "none" }}>

        <h2> Choose Delivery Destination </h2> 
        <a href="#" className="btn"> Room 1 </a>
        <a href="#" className="btn"> Room 2 </a>
        <a href="#" className="btn"> Room 3 </a>

      </div>

    </div>

    // if we end up making other pages, use these links
    //   <BrowserRouter> 
    //     <Routes>
    //       <Route path='login' element={<Login />} />
    //       <Route path='dashboard' element={<Dashboard />} />
    //     </Routes>
    //   </BrowserRouter> 

    // make password screen - didn't have success with this site, keeping here as a reference tho
    // https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
    // npm install react-router-dom
    
  );
}

export default App;