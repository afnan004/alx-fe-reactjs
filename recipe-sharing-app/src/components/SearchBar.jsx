import { useEffect } from 'react';
import useRecipeStore from '../recipeStore';

const SearchBar = () => {
  const { searchTerm, setSearchTerm, filterBy, setFilterBy, filterRecipes } = useRecipeStore();

  useEffect(() => {
    filterRecipes();
  }, [searchTerm, filterBy, filterRecipes]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select 
        value={filterBy} 
        onChange={(e) => setFilterBy(e.target.value)}
        className="filter-select"
      >
        <option value="title">By Title</option>
        <option value="ingredients">By Ingredients</option>
      </select>
    </div>
  );
};

export default SearchBar;