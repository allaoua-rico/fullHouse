import axios from 'axios';

const instance = axios.create({
    baseURL:"http://localhost:4000"
    // "http://localhost:5001/clone-c6bdf/us-central1/api"
})
export default instance;