import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

/**
 * Fetches detailed information for a specific GitHub user
 * @param {string} username - GitHub username to fetch
 * @returns {Promise<Object|null>} User data or null if not found
 */
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${username}:`, error);
    return null;
  }
};

/**
 * Searches GitHub users with advanced filters
 * @param {Object} params - Search parameters
 * @param {string} params.username - Username to search
 * @param {string} params.location - Location filter
 * @param {number} params.minRepos - Minimum repositories
 * @param {string} params.language - Primary language
 * @param {number} params.minFollowers - Minimum followers
 * @param {number} page - Page number for pagination
 * @returns {Promise<Object>} Search results
 */
export const searchUsers = async (params, page = 1) => {
  try {
    const queryParts = [];
    
    if (params.username) queryParts.push(`${params.username} in:login`);
    if (params.location) queryParts.push(`location:${params.location}`);
    if (params.minRepos) queryParts.push(`repos:>=${params.minRepos}`);
    if (params.language) queryParts.push(`language:${params.language}`);
    if (params.minFollowers) queryParts.push(`followers:>=${params.minFollowers}`);

    const query = queryParts.join('+');
    const response = await axios.get(
      `${GITHUB_API_URL}/search/users?q=${query}&page=${page}&per_page=10`
    );

    // Get detailed info for each user
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
    console.error('Error searching users:', error);
    return {
      data: null,
      totalCount: 0,
      error: error.response?.status === 404 
        ? "No users found matching your criteria" 
        : "An error occurred while searching"
    };
  }
};