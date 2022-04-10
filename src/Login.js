import React,  {useState} from 'react';
import PropTypes from 'prop-types';
import './css/Login.css';

async function loginUser(credentials) {
  //  This is an issue causing outside devices in the same network
  //  to not be able to connect to the login API
  return fetch('http://localhost:3001/login', {
  //return fetch('http://10.16.18.102:3001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }
 

export default function Login({ setToken }) {
   const [username, setUserName] = useState();
   const [password, setPassword] = useState();

   const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    //  Manually check token values
    //    Has security flaws
    if(username === token.username && password === token.token){
      setToken(token);
    }
  }

   return(
    <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p className="loginP">Username</p>
            <input className="loginField" type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
          <label>
            <p className="loginP">Password</p>
            <input className="loginField" type="password" onChange={e => setPassword(e.target.value)}/>
          </label>
          <button className="loginSubmitBtn" type="submit">Login</button>
        </form>
        <footer>
          <p>Designed/Developed by Ronni & Brandon </p>
      </footer>
    </div>
  )
}

 Login.propTypes = {
   setToken: PropTypes.func.isRequired
};
