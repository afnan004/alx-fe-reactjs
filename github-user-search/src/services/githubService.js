import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

export const fetchUserData = async (username) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      return {
        data: response.data,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: error.response?.status === 404 
          ? 'User not found' 
          : 'Failed to fetch user data',
      };
    }
  };

export const searchUsers = async (query) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/search/users`, {
      params: { q: query }
    });
    return {
      data: response.data.items,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: 'An error occurred while searching',
    };
  }
};

