import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/users?q ';

// Maintain existing fetchUserData function from previous tasks
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${username}:`, error);
    return null;
  }
};

// New advanced search function with proper API endpoint
export const advancedSearchUsers = async (params, page = 1) => {
  try {
    // Construct query parameters
    const queryParts = [];
    
    if (params.username) queryParts.push(`${params.username} in:login`);
    if (params.location) queryParts.push(`location:${params.location}`);
    if (params.minRepos) queryParts.push(`repos:>=${params.minRepos}`);
    if (params.language) queryParts.push(`language:${params.language}`);
    if (params.minFollowers) queryParts.push(`followers:>=${params.minFollowers}`);

    // Build complete API URL with search endpoint
    const query = queryParts.join('+');
    const apiUrl = `${GITHUB_API_URL}/search/users?q=${query}&page=${page}&per_page=10`;
    
    // Make the API request
    const response = await axios.get(apiUrl);

    // Get detailed info for each user (using existing fetchUserData)
    const usersWithDetails = await Promise.all(
      response.data.items.map(async user => {
        const details = await fetchUserData(user.login);
        return {
          ...user,
          ...details
        };
      })
    );

    return {
      data: usersWithDetails,
      totalCount: response.data.total_count,
      error: null
    };
  } catch (error) {
    console.error('Error in advanced search:', error);
    return {
      data: null,
      totalCount: 0,
      error: error.response?.status === 404 
        ? "No users found matching your criteria" 
        : "An error occurred while searching"
    };
  }
};