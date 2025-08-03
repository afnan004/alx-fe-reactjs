import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const GitHubSearch = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    
    const { data, error } = await fetchUserData(username);
    
    setLoading(false);
    if (error) {
      setError(error);
      setUserData(null);
    } else {
      setUserData(data);
    }
  };

  return (
    <div className="github-search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="search-input"
        />
        <button 
          type="submit" 
          className="search-button"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && <div className="status-message">Loading...</div>}
      
      {error && (
        <div className="status-message error">
          {error === 'User not found' 
            ? "Looks like we can't find the user" 
            : error}
        </div>
      )}

      {userData && (
        <div className="user-profile">
          <img 
            src={userData.avatar_url} 
            alt={userData.login} 
            className="avatar"
          />
          <h2 className="username">
            <a 
              href={userData.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {userData.name || userData.login}
            </a>
          </h2>
          {userData.bio && <p className="bio">{userData.bio}</p>}
          <div className="stats">
            <span>Followers: {userData.followers}</span>
            <span>Following: {userData.following}</span>
            <span>Repos: {userData.public_repos}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubSearch;