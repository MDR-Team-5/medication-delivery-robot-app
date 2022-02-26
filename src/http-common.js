//  Create Axios object to interface with Sequelize ORM
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-type": "application/json"
  }
});