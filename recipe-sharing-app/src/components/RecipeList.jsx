import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add one below! 🍳</p>
      ) : (
        recipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              padding: '15px',
              margin: '10px 0',
              border: '1px solid #ddd',
              borderRadius: '8px',
            }}
          >
            <Link
              to={`/recipes/${recipe.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;