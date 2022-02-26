//  service that uses axios object above to send HTTP requests.
//  	call axios get, post, put, delete method corresponding to 
//  	HTTP Requests: GET, POST, PUT, DELETE to make CRUD Operations.
import http from "../http-common";

class RoomDataService {
  getAll() {
    return http.get("/patient");
  }
  get(PatientID) {
    return http.get(`/patient/${PatientID}`);
  }
  create(data) {
    return http.post("/patient", data);
  }
  update(id, data) {
    return http.put(`/patient/${id}`, data);
  }
  delete(PatientID) {
    return http.delete(`/patient/${PatientID}`);
  }
  deleteAll() {
    return http.delete(`/patient`);
  }
  findByPatientRoomID(RoomID) {
    return http.get(`/patientbyroom/PatientRoomID=${RoomID}`);
  }
}
export default new RoomDataService();