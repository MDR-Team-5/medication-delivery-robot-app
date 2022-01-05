// npm start to run
// import logo from './logo.svg';
import './App.css';
import Route from "react-router-dom";
import Login from "./containers/Login";

function App() {
  return (

    // make password screen 
    // https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

    <div className="App">

      <Route exact path="/login">
        <Login />
      </Route>

      <h1> Medication Delivery Robot </h1>

      <h2> Choose Delivery Destination </h2>
      <a href="/" className="btn"> Room 1 </a>
      <a href="/" className="btn"> Room 2 </a>
      <a href="/" className="btn"> Room 3 </a>
    </div>

    // <div className="App">
    //   <h1> Medication Delivery Robot </h1>
    //   {/* <a href="/">Main Page</a> */}

    //   {/* <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header> */}
    // </div>
  );
}

export default App;
