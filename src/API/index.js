// # API exports

import axios from 'axios';

const API_URL = 'https://apitest.inframantra.com/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
