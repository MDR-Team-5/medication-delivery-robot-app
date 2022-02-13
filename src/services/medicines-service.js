//  service that uses axios object above to send HTTP requests.
//  	call axios get, post, put, delete method corresponding to 
//  	HTTP Requests: GET, POST, PUT, DELETE to make CRUD Operations.
import http from "../http-common";

class RoomDataService {
  getAll() {
    return http.get("/medicine");
  }
  get(MedicineID) {
    return http.get(`/medicine/${MedicineID}`);
  }
  create(data) {
    return http.post("/medicine", data);
  }
  update(id, data) {
    return http.put(`/medicine/${id}`, data);
  }
  delete(MedicineID) {
    return http.delete(`/medicine/${MedicineID}`);
  }
  deleteAll() {
    return http.delete(`/medicine`);
  }
}
export default new RoomDataService();