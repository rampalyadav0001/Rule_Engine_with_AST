// src/axios.js
import axios from 'axios';

const instance = axios.create({
   // baseURL: 'http://localhost:8000/api/rule', 
    baseURL:``${import.meta.env.VITE_BASE_URL}/api/rule;
});

export default instance;
