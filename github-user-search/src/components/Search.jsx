import { useState } from 'react';
import axios from 'axios';

const Search = () => {
  // State for basic search
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  
  // State for advanced search
  const [searchParams, setSearchParams] = useState({
    location: '',
    minRepos: '',
    language: '',
    minFollowers: ''
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchMode, setSearchMode] = useState('basic'); // 'basic' or 'advanced'

  // Maintain fetchUserData from previous tasks
  const fetchUserData = async (username) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      return response.data;
    } catch (error) {
      return null;
    }
  };

  // Basic search handler
  const handleBasicSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const data = await fetchUserData(username);
      if (data) {
        setUserData(data);
      } else {
        setError("Looks like we cant find the user");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Advanced search handler
  const handleAdvancedSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    setLoading(true);
    setError(null);
    
    try {
      const queryParts = [];
      
      if (searchParams.location) queryParts.push(`location:${searchParams.location}`);
      if (searchParams.minRepos) queryParts.push(`repos:>=${searchParams.minRepos}`);
      if (searchParams.language) queryParts.push(`language:${searchParams.language}`);
      if (searchParams.minFollowers) queryParts.push(`followers:>=${searchParams.minFollowers}`);

      const query = queryParts.join('+');
      const response = await axios.get(
        `https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`
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

      setResults(usersWithDetails);
      setTotalCount(response.data.total_count);
    } catch (err) {
      setError("Error searching users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Load more results for advanced search
  const loadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    
    try {
      const queryParts = [];
      
      if (searchParams.location) queryParts.push(`location:${searchParams.location}`);
      if (searchParams.minRepos) queryParts.push(`repos:>=${searchParams.minRepos}`);
      if (searchParams.language) queryParts.push(`language:${searchParams.language}`);
      if (searchParams.minFollowers) queryParts.push(`followers:>=${searchParams.minFollowers}`);

      const query = queryParts.join('+');
      const response = await axios.get(
        `https://api.github.com/search/users?q=${query}&page=${nextPage}&per_page=10`
      );

      const usersWithDetails = await Promise.all(
        response.data.items.map(async user => {
          const details = await fetchUserData(user.login);
          return {
            ...user,
            ...details
          };
        })
      );

      setResults(prev => [...prev, ...usersWithDetails]);
      setPage(nextPage);
    } catch (err) {
      setError("Error loading more results");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Mode Toggle */}
      <div className="flex mb-6">
        <button
          onClick={() => setSearchMode('basic')}
          className={`px-4 py-2 rounded-l-md ${
            searchMode === 'basic' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Basic Search
        </button>
        <button
          onClick={() => setSearchMode('advanced')}
          className={`px-4 py-2 rounded-r-md ${
            searchMode === 'advanced' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Advanced Search
        </button>
      </div>

      {/* Basic Search Form */}
      {searchMode === 'basic' && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">GitHub User Search</h1>
          <form onSubmit={handleBasicSearch} className="flex">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md"
            />
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-r-md text-white ${
                loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>

          {loading && <p className="mt-4">Loading...</p>}
          {error && <p className="mt-4 text-red-500">{error}</p>}
          
          {userData && (
            <div className="mt-6 p-4 border border-gray-200 rounded-md">
              <div className="flex items-center">
                <img
                  src={userData.avatar_url}
                  alt={userData.login}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold">
                    <a
                      href={userData.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {userData.name || userData.login}
                    </a>
                  </h2>
                  {userData.bio && <p className="text-gray-600">{userData.bio}</p>}
                  <div className="mt-2 text-sm text-gray-500">
                    <span className="mr-3">Followers: {userData.followers}</span>
                    <span className="mr-3">Following: {userData.following}</span>
                    <span>Repositories: {userData.public_repos}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Advanced Search Form */}
      {searchMode === 'advanced' && (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold mb-4">Advanced GitHub Search</h1>
            <form onSubmit={handleAdvancedSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={searchParams.location}
                    onChange={handleInputChange}
                    placeholder="e.g. San Francisco"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Repositories</label>
                  <input
                    type="number"
                    name="minRepos"
                    value={searchParams.minRepos}
                    onChange={handleInputChange}
                    placeholder="e.g. 10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <input
                    type="text"
                    name="language"
                    value={searchParams.language}
                    onChange={handleInputChange}
                    placeholder="e.g. JavaScript"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Followers</label>
                  <input
                    type="number"
                    name="minFollowers"
                    value={searchParams.minFollowers}
                    onChange={handleInputChange}
                    placeholder="e.g. 100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded-md text-white font-medium ${
                  loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </form>
          </div>

          {/* Advanced Results */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {error && (
              <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                {error}
              </div>
            )}

            {results.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Results ({totalCount} total)
                </h2>
                
                <div className="space-y-4">
                  {results.map(user => (
                    <div key={user.id} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex items-start space-x-4">
                        <img
                          src={user.avatar_url}
                          alt={user.login}
                          className="w-16 h-16 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-medium">
                              <a
                                href={user.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 hover:underline"
                              >
                                {user.name || user.login}
                              </a>
                            </h3>
                            {user.location && (
                              <span className="text-sm text-gray-500">
                                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {user.location}
                              </span>
                            )}
                          </div>
                          
                          {user.bio && <p className="text-gray-600 mt-1">{user.bio}</p>}
                          
                          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                            <span><strong>{user.public_repos}</strong> repos</span>
                            <span><strong>{user.followers}</strong> followers</span>
                            <span><strong>{user.following}</strong> following</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {results.length < totalCount && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={loadMore}
                      disabled={loading}
                      className={`px-4 py-2 rounded-md text-white font-medium ${
                        loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {loading ? 'Loading...' : 'Load More'}
                    </button>
                  </div>
                )}
              </>
            )}

            {!loading && results.length === 0 && !error && (
              <div className="text-center py-8 text-gray-500">
                Enter search criteria to find GitHub users
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;