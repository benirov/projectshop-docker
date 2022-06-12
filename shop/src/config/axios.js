import axios from "axios";
console.log('process.env.BACKENDURL', process.env.REACT_APP_BACKENDURL);
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKENDURL
});

export default axiosClient;