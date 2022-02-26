import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
//import Login from "./Login.js";
//import RoomsList from "./components/rooms-list.component";
//import AddRoom from "./components/add-room.component";
//import Room from "./components/room.component";


import * as serviceWorker from "./services/serviceWorker";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
  
serviceWorker.unregister();