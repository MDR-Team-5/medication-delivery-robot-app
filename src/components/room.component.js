import React, { Component } from "react";
import RoomDataService from "../services/rooms-service";
export default class Room extends Component {
  constructor(props) {
    super(props);
    this.onChangeRoomID = this.onChangeRoomID.bind(this);
    this.onChangeRoomColor = this.onChangeRoomColor.bind(this);
    this.getRoom = this.getRoom.bind(this);
    this.state = {
      currentRoom: {
        RoomID: null,
        RoomColor: "",
      },
      message: ""
    };
  }
  componentDidMount() {
    console.log(this.props);
    //this.getRoom(this.props.match.params.id);
  }
  onChangeRoomID(e) {
    const RoomID = e.target.value;
    this.setState(function(prevState) {
      return {
        currentRoom: {
          ...prevState.currentRoom,
          RoomID: RoomID
        }
      };
    });
  }
  onChangeRoomColor(e) {
    const RoomColor = e.target.value;
    
    this.setState(prevState => ({
      currentRoom: {
        ...prevState.currentRoom,
        RoomColor: RoomColor
      }
    }));
  }
  getRoom(id) {
    RoomDataService.get(id)
      .then(response => {
        this.setState({
          currentRoom: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

render() {
    const { currentRoom } = this.state;
    return(
      <div>
        <h1> RED </h1>
      </div>
    );
    if(false){ // Placeholder
    return (
      <div>
        {currentRoom ? (
          <div className="edit-form">
            <h4>Room</h4>
            <form>
              <div className="form-group">
                <label htmlFor="RoomID">RoomID</label>
                <input
                  type="text"
                  className="form-control"
                  id="RoomID"
                  value={currentRoom.RoomID}
                  onChange={this.onChangeRoomID}
                />
              </div>
              <div className="form-group">
                <label htmlFor="RoomColor">RoomColor</label>
                <input
                  type="text"
                  className="form-control"
                  id="RoomColor"
                  value={currentRoom.RoomColor}
                  onChange={this.onChangeRoomColor}
                />
              </div>
            </form>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Room...</p>
          </div>
        )}
      </div>
    );
  }
} // Placeholder
}