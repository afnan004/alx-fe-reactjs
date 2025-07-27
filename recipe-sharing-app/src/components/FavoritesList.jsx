import useRecipeStore from '../recipeStore';

const FavoritesList = () => {
  const { favorites, recipes, removeFavorite } = useRecipeStore();
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

  return (
    <div className="favorites-container">
      <h2>My Favorite Recipes</h2>
      {favoriteRecipes.length > 0 ? (
        <div className="recipe-grid">
          {favoriteRecipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <button 
                onClick={() => removeFavorite(recipe.id)}
                className="remove-favorite-btn"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>You haven't added any favorites yet.</p>
      )}
    </div>
  );
};

export default FavoritesList;