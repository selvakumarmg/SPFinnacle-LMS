import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000, // You can adjust the timeout as per your requirements
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET request
export const get = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    // Handle error (e.g., show a notification or log the error)
    throw error;
  }
};

// POST request
export const postApiCall = async (url, data) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    // Handle error (e.g., show a notification or log the error)
    throw error;
  }
};

// PUT request
export const put = async (url, data) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    // Handle error (e.g., show a notification or log the error)
    throw error;
  }
};

// DELETE request
export const deleteAction = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    // Handle error (e.g., show a notification or log the error)
    throw error;
  }
};
