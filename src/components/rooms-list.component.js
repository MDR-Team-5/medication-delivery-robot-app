import React, { Component } from "react";
import RoomDataService from "../services/service";
import { Link } from "react-router-dom";
import "../css/default.css";
export default class RoomsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchRoomColor = this.onChangeSearchRoomColor.bind(this);
    this.retrieveRooms = this.retrieveRooms.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.removeAllRooms = this.removeAllRooms.bind(this);
    this.searchRoomColor = this.searchRoomColor.bind(this);
    this.state = {
      Rooms: [],
      currentRoom: null,
      currentIndex: -1,
      searchRoomColor: ""
    };
  }
  componentDidMount() {
    this.retrieveRooms();
  }
  onChangeSearchRoomColor(e) {
    const searchRoomColor = e.target.value;
    this.setState({
      searchRoomColor: searchRoomColor
    });
  }
  retrieveRooms() {
    RoomDataService.getAll()
      .then(response => {
        this.setState({
          Rooms: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  refreshList() {
    this.retrieveRooms();
    this.setState({
      currentRoom: null,
      currentIndex: -1
    });
  }
  setActiveRoom(Room, index) {
    this.setState({
      currentRoom: Room,
      currentIndex: index
    });
  }
  removeAllRooms() {
    RoomDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  searchRoomColor() {
    RoomDataService.findByRoomColor(this.state.searchRoomColor)
      .then(response => {
        this.setState({
          Rooms: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {

    const { searchRoomColor, rooms, currentRoom, currentIndex } = this.state;
    console.log(currentRoom);
    //return(
    //  <div className="btn-group">
    //    <a href="/red" className="colorBtn redBtn" > Red Room </a>
    //    <a href="/green" className="colorBtn greenBtn"> Green Room </a>
    //    <a href="/blue" className="colorBtn blueBtn"> Blue Room </a>
    //  </div>
    //)
    //if(false){ // placeholder
    return (
      <div className="list row">
        <div className="col-md-8">
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
        </div>
        <div className="col-md-6">
          <h4>Rooms List</h4>
          <ul className="list-group">
            {rooms &&
              rooms.map((room, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveRoom(room, index)}
                  key={index}
                >
                  {room.RoomColor}
                </li>
              ))}
          </ul>
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
                </label>{" "}
                {currentRoom.RoomID}
              </div>
              <div>
                <label>
                  <strong>Room Color:</strong>
                </label>{" "}
                {currentRoom.RoomColor}
              </div>
              {/* <Link
                to={"/Rooms/" + currentRoom.RoomColor}
                className="badge badge-warning"
              >
                Edit
              </Link> */}
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Room...</p>
            </div>
          )}
        </div>
      </div>);
  }
//}  // placeholder
}