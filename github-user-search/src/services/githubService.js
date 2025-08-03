import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

// Keep existing fetchUserData function (unchanged from previous task)
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${username}:`, error);
    return null;
  }
};

// New function for advanced search
export const searchGitHubUsers = async (searchParams, page = 1) => {
  try {
    // Construct the search query
    const queryParams = [];
    
    if (searchParams.username) queryParams.push(`${searchParams.username} in:login`);
    if (searchParams.location) queryParams.push(`location:${searchParams.location}`);
    if (searchParams.minRepos) queryParams.push(`repos:>=${searchParams.minRepos}`);
    if (searchParams.language) queryParams.push(`language:${searchParams.language}`);

    // Build the complete API URL with required format
    const queryString = queryParams.join('+');
    const apiUrl = `https://api.github.com/search/users?q=${queryString}&page=${page}&per_page=10`;

    const response = await axios.get(apiUrl);

    // Get detailed user data using existing fetchUserData
    const usersWithDetails = await Promise.all(
      response.data.items.map(async user => {
        const details = await fetchUserData(user.login);
        return { ...user, ...details };
      })
    );

    return {
      users: usersWithDetails,
      totalCount: response.data.total_count,
      error: null
    };
  } catch (error) {
    return {
      users: [],
      totalCount: 0,
      error: error.response?.status === 404 
        ? "No users found matching your criteria"
        : "Failed to search users"
    };
  }
};