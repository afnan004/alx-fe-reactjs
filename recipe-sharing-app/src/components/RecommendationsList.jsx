import { useEffect } from 'react';
import useRecipeStore from '../recipeStore';

const RecommendationsList = () => {
  const { recommendations, generateRecommendations, addFavorite } = useRecipeStore();

  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  return (
    <div className="recommendations-container">
      <h2>Recommended For You</h2>
      {recommendations.length > 0 ? (
        <div className="recipe-grid">
          {recommendations.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <button
                onClick={() => addFavorite(recipe.id)}
                className="add-favorite-btn"
              >
                Add to Favorites
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No recommendations available. Add some favorites first!</p>
      )}
    </div>
  );
};

export default RecommendationsList;