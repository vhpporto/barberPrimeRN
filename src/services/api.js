import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.appbarber.com.br',
});

export default api;
