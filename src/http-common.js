//  Create Axios object to interface with Sequelize ORM
import axios from "axios";
//  localhost is an issue for outside devices to
//  connect with the server to pull data
export default axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-type": "application/json"
  }
});
