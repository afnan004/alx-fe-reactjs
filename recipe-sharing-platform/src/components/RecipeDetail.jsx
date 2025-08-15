import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import data from '../data.json';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const foundRecipe = data.find((item) => item.id === parseInt(id));
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return <p className="text-center mt-10">Recipe not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
      <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded" />
      <h1 className="text-3xl font-bold mt-4">{recipe.title}</h1>
      <p className="text-gray-700 mt-2">{recipe.summary}</p>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Ingredients</h2>
        <ul className="list-disc list-inside mt-2 space-y-1">
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Instructions</h2>
        <ol className="list-decimal list-inside mt-2 space-y-2">
          {recipe.instructions?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <Link to="/" className="inline-block mt-6 text-blue-500 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}

export default RecipeDetail;
