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
        `https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`
      );
  
      // Get detailed info for each user
      const usersWithDetails = await Promise.all(
        response.data.items.map(async user => {
          const details = await axios.get(`https://api.github.com/users/${user.login}`);
          return {
            ...user,
            ...details.data
          };
        })
      );
  
      return {
        data: usersWithDetails,
        totalCount: response.data.total_count,
        error: null
      };
    } catch (error) {
      return {
        data: null,
        totalCount: 0,
        error: error.response?.status === 404 
          ? "No users found matching your criteria" 
          : "An error occurred while searching"
      };
    }
  };