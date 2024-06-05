// src/ApiService.js
import axios from 'axios';

const API_URL = 'https://api.tvmaze.com';

export const fetchShows = async () => {
  try {
    const response = await axios.get(`${API_URL}/shows`);
    return response.data;
  } catch (error) {
    console.error('Error fetching shows:', error);
    throw error;
  }
};

export const searchShows = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search/shows?q=${query}`);
    return response.data.map(result => result.show);
  } catch (error) {
    console.error('Error searching shows:', error);
    throw error;
  }
};

export const fetchShowDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/shows/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching show details:', error);
    throw error;
  }
};
