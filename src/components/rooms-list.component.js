import React, { Component, createContext } from "react";
//  Socket Library Imports
import io from 'socket.io-client';

import RoomDataService from "../services/rooms-service";
import PatientDataService from "../services/patients-service"
import MedicineDataService from "../services/medicines-service"
import "../css/default.css";

const WebSocketContext = createContext(null);

//export{ WebSocketContext }
export default class RoomsList extends Component {
  /** Current ORM API does not support creation, deletion, or searchByRoomColor */
  constructor(props) {
    super(props);
    //this.onChangeSearchRoomColor = this.onChangeSearchRoomColor.bind(this);
    this.retrieveRooms = this.retrieveRooms.bind(this);
    this.retrievePatients = this.retrievePatients.bind(this);
    this.retrieveMedicines = this.retrieveMedicines.bind(this);

    this.setActiveRoom = this.setActiveRoom.bind(this);
    //this.setArduinoButtonText = this.setArduinoButtonText(this);
    //this.setActivePatient = this.setActivePatient.bind(this);
    //this.setActiveMedicine = this.setActiveMedicine.bind(this);

    //this.refreshList = this.refreshList.bind(this);
    //this.removeAllRooms = this.removeAllRooms.bind(this);
    //this.searchRoomColor = this.searchRoomColor.bind(this);
    this.state = {
      Rooms: [],
      currentRoom: null,
      currentRoomIndex: -1,
      //searchRoomColor: ""
      Patients: [],
      currentPatient: null,
      Medicines: [],
      currentMedicine: null,
      //arduinoButtonText: ""
    };
  }

  componentDidMount() {
    this.retrieveRooms();
    this.retrievePatients();
    this.retrieveMedicines();
  }

  retrieveRooms() {
    RoomDataService.getAll()
      .then(response => {
        this.setState({
          Rooms: response.data
        });
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrievePatients(){
    PatientDataService.getAll()
    .then(response => {
      this.setState({
        Patients: response.data
      });
      //console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });  
  }  
  
  retrieveMedicines(){
    MedicineDataService.getAll()
    .then(response => {
      this.setState({
        Medicines: response.data
      });
      //console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });  
  }

  setActiveRoom(Room, index) {
    var {Patients, thisPatient,
        Medicines,  thisMedicine} = this.state;

    this.setState({
      currentRoom: Room,
      currentRoomIndex: index,
      currentPatient: null,
      currentMedicine: null
    });

    if(Room){
      Patients.forEach(thisPatient => {
        if(Room.RoomID == thisPatient.PatientRoomID){
          this.setState({currentPatient: thisPatient});
          Medicines.forEach(thisMedicine => {
            if(thisPatient.PatientMedicineID == thisMedicine.MedicineID){
              this.setState({currentMedicine: thisMedicine});
            }
          });
        }
      });

    }

  }

  setText(id, Color){
    console.log("BUTTON CLICKED AAAA" + id + " " + Color);

    let socket;
    let ws;

    const message = (Color) => {
      const payload = {
        Color: Color
      }

      socket.emit("event://send-message", JSON.stringify(payload));
    }
 //  param is maybe IP?
    if(!socket){
      socket = io.connect()
      socket.on("event://send-message", (msg) => {
        const payload = JSON.parse(msg);
      })

      ws = {
        socket:socket,
        message
      }
    }
    return(
      <WebSocketContext.Provider value={ws}>{}
      </WebSocketContext.Provider>
    )
  }
  
  /**  Delete Functionality disabled as API does not support capabilities */
  // refreshList() {
  //   this.retrieveRooms();
  //   this.retrievePatients();
  //   this.setState({
  //     currentRoom: null,
  //     currentRoomIndex: -1
  //   });
  // }
  
  // removeAllRooms() {
  //   RoomDataService.deleteAll()
  //     .then(response => {
  //       console.log(response.data);
  //       this.refreshList();
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  /**  Search Functionality disabled as API does not support capabilities */
  // onChangeSearchRoomColor(e) {
  //   const searchRoomColor = e.target.value;
  //   this.setState({
  //     searchRoomColor: searchRoomColor
  //   });
  // }
  
  // searchRoomColor() {
  //   RoomDataService.findByRoomColor(this.state.searchRoomColor)
  //     .then(response => {
  //       this.setState({
  //         Rooms: response.data
  //       });
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  render() {

    //var { Rooms, currentRoom, currentRoomIndex, searchRoomColor } = this.state;
    var { Rooms, currentRoom, currentRoomIndex, 
          Patients, currentPatient,
          Medicines, currentMedicine } = this.state;
          
    //arduinoBtn.value = setText();
          //  Setting state's current medicine based on Room Button onClick changes

    return (
      <div className="list row">
        {/**  Search Function*/}
          {/* <div className="col-md-8">
           <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Room Color"
              value={searchRoomColor}
              onChange={this.onChangeSearchRoomColor}
            /> 
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchRoomColor}
              >
                Search
              </button>
            </div>
          </div>
        </div> */}
        <div className="col-md-6">
          <h4>Rooms List</h4>
          <ul className="list-group">
            {Rooms &&
             Rooms.map((room, index) => (
                <div
                  className={
                    "btn " + "colorBtn " + 
                    room.RoomColor.toLowerCase()+"Btn"
                  }
                  onClick={() => this.setActiveRoom(room, index)}
                  key={index}
                >       
                  {room.RoomColor}
                </div>
              ))}
          </ul>
          {/**  Delete All functionality */}
          {/* <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllRooms}
          >
            Remove All
          </button> */}
        </div>
        <div className="col-md-6">
          {currentRoom ? (
            <div>
              <h4>Room</h4>
              <div>
                <label>
                  <strong>Room Number:</strong>
                </label>
                <div>
                {currentRoom.RoomID}
                </div>
              </div>
              <div>
                <label>
                  <strong>Room Color:</strong>
                </label>
              </div>
                {currentRoom.RoomColor}
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Room...</p>
            </div>
          )}
            {(currentPatient && currentMedicine) ? (
            <div>
                <div>
                <label>
                  <strong>Patient Name: </strong>
                </label>
              </div>
              {currentPatient.PatientFirst + " " + currentPatient.PatientLast}              
              <div>
                <label>
                  <strong>Patient Medicine: </strong>
                </label>
              </div>
              {currentMedicine.MedicineLabel}              
              <div>
              <button id="arduinoButton" onClick={() => { this.setText(currentRoom.RoomID, currentRoom.RoomColor)}
                  }
> button Text </button>    
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p> No Patients</p>
            </div>
          )}        
        </div>
      </div>);
  }
}
