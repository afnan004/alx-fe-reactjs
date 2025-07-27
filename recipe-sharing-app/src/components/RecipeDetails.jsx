import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useRecipeStore from './recipeStore'
import EditRecipeForm from './EditRecipeForm'

const RecipeDetails = () => {
  const { id } = useParams()
  const recipeId = parseInt(id)
  const [isEditing, setIsEditing] = useState(false)
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  )
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe)
  const navigate = useNavigate()

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId)
      navigate('/')
    }
  }

  if (!recipe) return <div>Recipe not found</div>

  return (
    <div className="recipe-details">
      {isEditing ? (
        <EditRecipeForm 
          recipe={recipe} 
          onCancel={() => setIsEditing(false)} 
        />
      ) : (
        <>
          <h2>{recipe.title}</h2>
          <p>{recipe.description}</p>
          <div className="recipe-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </>
      )}
    </div>
  )
}

export default RecipeDetails