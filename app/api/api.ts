import axios from 'axios';

const baseURL = 'https://www.reddit.com';

let api = axios.create();

api.defaults.baseURL = baseURL;

export default api;
