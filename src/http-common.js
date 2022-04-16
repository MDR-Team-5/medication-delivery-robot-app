//  Create Axios object to interface with Sequelize ORM
import axios from "axios";
//  localhost is an issue for outside devices to
//  connect with the server to pull data
export default axios.create({
  //baseURL: "http://localhost:3001/api",   //  Machine
  //baseURL: "http://192.168.0.13:3001/api",  //  Home
  baseURL: "http://10.16.211.2:3001/api",//  WSU
  headers: {
    "Content-type": "application/json"
  }
});
