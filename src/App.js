import './App.css';
// import Route from "react-router-dom";
// import Login from "./containers/Login";

function App() {
  return (

    // make password screen 
    // https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

    <div className="App">

      {/* <Route exact path="/login">
        <Login />
      </Route> */}

      <h1> Medication Delivery Robot </h1>

      <h2> Choose Delivery Destination </h2>
      <a href="/" className="btn"> Room 1 </a>
      <a href="/" className="btn"> Room 2 </a>
      <a href="/" className="btn"> Room 3 </a>
    </div>
    
  );
}

export default App;
