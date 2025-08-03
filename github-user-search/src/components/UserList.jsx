import { useState } from 'react'
import { searchUsers } from '../services/githubService'
import SearchBar from './SearchBar'
import UserCard from './UserCard'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (query) => {
    try {
      setLoading(true)
      setError(null)
      const results = await searchUsers(query)
      setUsers(results)
    } catch (err) {
      setError('Failed to fetch users. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="user-list-container">
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="users-grid">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      {users.length === 0 && !loading && (
        <p className="no-results">No users found. Try searching for a GitHub username.</p>
      )}
    </div>
  )
}

export default UserList