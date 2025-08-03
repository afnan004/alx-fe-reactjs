import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserList from './components/UserList'
import './index.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>GitHub User Search</h1>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<UserList />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>© {new Date().getFullYear()} GitHub User Search</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
