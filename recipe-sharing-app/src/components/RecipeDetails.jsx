import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useRecipeStore from './recipeStore'
import EditRecipeForm from './EditRecipeForm'
import DeleteRecipeButton from './DeleteRecipeButton'

const RecipeDetails = () => {
  const { id } = useParams()
  const recipeId = parseInt(id)
  const [isEditing, setIsEditing] = useState(false)
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  )
  const navigate = useNavigate()

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
            <DeleteRecipeButton recipeId={recipeId} />
            <button onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </>
      )}
    </div>
  )
}

export default RecipeDetails