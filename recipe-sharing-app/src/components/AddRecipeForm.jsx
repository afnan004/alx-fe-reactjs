import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const AddRecipeForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const addRecipe = useRecipeStore((state) => state.addRecipe)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addRecipe({ title, description })
    navigate('/')
  }

  return (
    <div className="recipe-form">
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  )
}

export default AddRecipeForm