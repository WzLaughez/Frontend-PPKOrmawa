// src/lib/axios.js
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API
});

export default axiosInstance;
