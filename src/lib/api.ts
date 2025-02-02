import axios from 'axios';
import axiosRetry from 'axios-retry';

const API_BASE_URL = 'http://3.111.196.92:8020';
const AUTH = {
  username: 'trial',
  password: 'assignment123'
};

const api = axios.create({
  baseURL: API_BASE_URL,
  auth: AUTH,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000, // 10 second timeout
  // Remove withCredentials as it's not needed for this API
  withCredentials: false
});

// Configure retry behavior with more specific conditions
axiosRetry(api, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000; // Time interval between retries (1s, 2s, 3s)
  },
  retryCondition: (error) => {
    // Retry on network errors or specific HTTP errors
    return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
           error.code === 'ECONNABORTED' ||
           (error.response && error.response.status >= 500);
  }
});

export const fetchApiData = async (endpoint: string, data?: any) => {
  try {
    const isLoginEndpoint = endpoint === 'login';
    const response = isLoginEndpoint
      ? await api.post(`/api/v1/${endpoint}`, data)
      : await api.get(`/api/v1/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};