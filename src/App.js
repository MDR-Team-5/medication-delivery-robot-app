import React from "react";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/default.css"

import Dashboard from "./components/Dashboard.js";
import Login from "./Login.js";
import RoomsList from "./components/rooms-list.component";
import AddRoom from "./components/add-room.component";
import Room from "./components/room.component";

//  Custom hook necessary to refresh with credentials
import useToken from './hooks/useToken';

async function loginUser(credentials) {
  return fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

function App() {
  const { token, setToken } = useToken();
  
  // display Login if the token is falsy.
  if(!token) {
    return( 
      <div>
        <Dashboard />
        <Login setToken={setToken} />
      </div>

    );
  }

  return (
    <div className="wrapper">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
              Medication Delivery Robot
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
          <a href="/roomslist">List of Rooms</a>
          </li>
          <li className="nav-item">
          <a href="/add">Add A Room</a>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<RoomsList />}/>
              <Route path="/roomslist" element={<RoomsList />} />
              <Route path="/add" element={<AddRoom />}/>
          </Routes>
        </BrowserRouter>
      </div>
  </div>

   );
}

export default App;
