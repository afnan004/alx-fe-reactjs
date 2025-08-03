import { useState } from 'react';
import { searchUsers } from '../services/githubService';

const Search = () => {
  const [searchParams, setSearchParams] = useState({
    username: '',
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPage(1);
    setLoading(true);
    setError(null);
    
    const { data, totalCount, error } = await searchUsers(searchParams);
    
    setLoading(false);
    if (error) {
      setError(error);
      setResults([]);
    } else {
      setResults(data);
      setTotalCount(totalCount);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    
    const { data, error } = await searchUsers(searchParams, nextPage);
    
    setLoading(false);
    if (!error) {
      setResults(prev => [...prev, ...data]);
      setPage(nextPage);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Advanced GitHub User Search</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={searchParams.username}
                onChange={handleInputChange}
                placeholder="e.g. octocat"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Location */}
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

            {/* Min Repos */}
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

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Language</label>
              <input
                type="text"
                name="language"
                value={searchParams.language}
                onChange={handleInputChange}
                placeholder="e.g. JavaScript"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Min Followers */}
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

      {/* Results Section */}
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
                        {user.blog && (
                          <a href={user.blog} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            Website
                          </a>
                        )}
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
    </div>
  );
};

export default Search;