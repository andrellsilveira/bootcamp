import axios from 'axios';

const api = axios.create({
    baseURL: '192.168.0.1:3333'
});

export default api;