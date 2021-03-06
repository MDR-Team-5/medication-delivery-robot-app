//  service that uses axios object above to send HTTP requests.
//  	call axios get, post, put, delete method corresponding to 
//  	HTTP Requests: GET, POST, PUT, DELETE to make CRUD Operations.
import http from "../http-common";

class RoomDataService {
  getAll() {
    return http.get("/room");
  }
  get(RoomID) {
    return http.get(`/room/${RoomID}`);
  }
  create(data) {
    return http.post("/room", data);
  }
  update(id, data) {
    return http.put(`/room/${id}`, data);
  }
  delete(RoomID) {
    return http.delete(`/room/${RoomID}`);
  }
  deleteAll() {
    return http.delete(`/room`);
  }
  findByRoomColor(RoomColor) {
    return http.get(`/room?RoomColor=${RoomColor}`);
  }
}
export default new RoomDataService();