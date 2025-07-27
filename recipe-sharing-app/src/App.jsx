import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Recipe Sharing App</h1>
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/add">Add Recipe</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/add" element={<AddRecipeForm />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>© {new Date().getFullYear()} Recipe Sharing App</p>
        </footer>
      </div>
    </Router>
  )
}

export default App