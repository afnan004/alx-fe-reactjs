import axios from 'axios'

const GITHUB_API_URL = 'https://api.github.com'

export const searchUsers = async (query) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/search/users`, {
      params: { q: query },
      headers: {
        Authorization: import.meta.env.VITE_GITHUB_TOKEN ? `token ${import.meta.env.VITE_GITHUB_TOKEN}` : undefined
      }
    })
    return response.data.items
  } catch (error) {
    console.error('Error searching users:', error)
    return []
  }
}

export const getUserDetails = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`)
    return response.data
  } catch (error) {
    console.error('Error fetching user details:', error)
    return null
  }
}