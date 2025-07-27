import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = parseInt(id);
  const [isEditing, setIsEditing] = useState(false);
  const { recipe, toggleFavorite, favorites } = useRecipeStore((state) => ({
    recipe: state.recipes.find((recipe) => recipe.id === recipeId),
    toggleFavorite: state.toggleFavorite,
    favorites: state.favorites
  }));
  const navigate = useNavigate();

  if (!recipe) return <div>Recipe not found</div>;

  const isFavorite = favorites.includes(recipe.id);

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
            <button 
              onClick={() => toggleFavorite(recipe.id)}
              className={isFavorite ? 'favorite-btn active' : 'favorite-btn'}
            >
              {isFavorite ? '❤️ Remove Favorite' : '♡ Add Favorite'}
            </button>
            <button onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;