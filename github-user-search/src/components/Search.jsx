import { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = async (username) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      return {
        data: response.data,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: "Looks like we can't find the user"
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUserData(null);

    const { data, error } = await fetchUserData(username);
    
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      setUserData(data);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="search-input"
          disabled={loading}
          data-testid="search-input"
        />
        <button 
          type="submit" 
          className="search-button"
          disabled={loading || !username.trim()}
          data-testid="search-button"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && <p className="loading-message">Loading...</p>}
      
      {error && (
        <p className="error-message" data-testid="error-message">
          Looks like we can't find the user
        </p>
      )}

      {userData && (
        <div className="user-profile" data-testid="user-profile">
          <img 
            src={userData.avatar_url} 
            alt={userData.login} 
            className="avatar"
            data-testid="user-avatar"
          />
          <h2 data-testid="user-name">
            <a 
              href={userData.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="profile-link"
            >
              {userData.name || userData.login}
            </a>
          </h2>
          {userData.bio && <p className="bio" data-testid="user-bio">{userData.bio}</p>}
          <div className="user-stats" data-testid="user-stats">
            <span>Followers: {userData.followers}</span>
            <span>Following: {userData.following}</span>
            <span>Repositories: {userData.public_repos}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;