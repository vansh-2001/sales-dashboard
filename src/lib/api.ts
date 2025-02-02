import axios from 'axios';
import axiosRetry from 'axios-retry';

const API_BASE_URL = 'https://3.111.196.92:8020';
const AUTH = {
  username: 'trial',
  password: 'assignment123'
};

const api = axios.create({
  baseURL: API_BASE_URL,
  auth: AUTH,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // Add CORS headers
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  },
  timeout: 10000, // 10 second timeout
  // Add withCredentials for CORS
  withCredentials: true
});

// Configure retry behavior
axiosRetry(api, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    // Retry on network errors or 5xx server errors
    return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
           error.code === 'ECONNABORTED';
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