import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from '../recipeStore';
import SearchBar from './SearchBar';

const RecipeList = () => {
  const { recipes, filteredRecipes, filterRecipes, minPrepTime, setMinPrepTime } = useRecipeStore();

  // Initialize filtered recipes when component mounts
  useEffect(() => {
    filterRecipes();
  }, [filterRecipes]);

  return (
    <div className="recipe-list-container">
      <SearchBar />
      
      <div className="prep-time-filter">
        <label>Minimum Preparation Time (mins):</label>
        <input
          type="number"
          value={minPrepTime}
          onChange={(e) => setMinPrepTime(Number(e.target.value))}
          min="0"
        />
      </div>

      <div className="recipe-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
              <p><strong>Prep Time:</strong> {recipe.prepTime} minutes</p>
              <Link to={`/recipes/${recipe.id}`}>View Details</Link>
            </div>
          ))
        ) : (
          <p>No recipes found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeList;