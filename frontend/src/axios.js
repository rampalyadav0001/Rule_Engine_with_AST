// src/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/rule', 
});

export default instance;
