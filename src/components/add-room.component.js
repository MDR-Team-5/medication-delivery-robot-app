import React, { Component } from "react";
import RoomDataService from "../services/rooms-service";

export default class AddRoom extends Component {
  constructor(props) {
    super(props);
    this.onChangeRoomID = this.onChangeRoomID.bind(this);
    this.onChangeRoomColor = this.onChangeRoomColor.bind(this);
    this.saveRoom = this.saveRoom.bind(this);
    this.newRoom = this.newRoom.bind(this);
    this.state = {
      RoomID: null,
      RoomColor: "",
      RoomIsEmpty: false
    };
  }
  onChangeRoomID(e) {
    this.setState({
      RoomID: e.target.value
    });
  }
  onChangeRoomColor(e) {
    this.setState({
      RoomColor: e.target.value
    });
  }
  saveRoom() {
    var data = {
      RoomID: this.state.RoomID,
      RoomColor: this.state.RoomColor,
      RoomIsEmpty: false
    };
    RoomDataService.create(data)
      .then(response => {
        this.setState({
          RoomID: response.data.RoomID,
          RoomColor: response.data.RoomColor,
          RoomIsEmpty: response.data.RoomIsEmpty,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  newRoom() {
    this.setState({
      RoomID: this.state.RoomID,
      RoomColor: this.state.RoomColor,
      RoomIsEmpty: false
    });
  }

  render() {

    return(
      <div>
        <h1> This page is a work in progress.</h1>
        <h4> Functionality yet to be implemented</h4>
      </div>
    );
    if(false){
      return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newRoom}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="RoomID">RoomID</label>
                <input
                  type="text"
                  className="form-control"
                  id="RoomID"
                  required
                  value={this.state.RoomID}
                  onChange={this.onChangeRoomID}
                  name="Room ID"
                />
              </div>
              <div className="form-group">
                <label htmlFor="RoomColor">Room Color</label>
                <input
                  type="text"
                  className="form-control"
                  id="RoomColor"
                  required
                  value={this.state.RoomColor}
                  onChange={this.onChangeRoomColor}
                  name="Room Color"
                />
              </div>
              <button onClick={this.saveRoom} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
    };
    }
    

}
