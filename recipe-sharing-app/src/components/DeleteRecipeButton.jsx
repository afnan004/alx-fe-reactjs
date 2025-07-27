import { useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRecipe(recipeId);
    navigate('/'); // Redirect to home after deletion
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        backgroundColor: '#ff4444',
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
      }}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;