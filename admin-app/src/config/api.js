import axios from 'axios';

const API_BASE_URL = 'http://YOUR_SERVER_IP:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;