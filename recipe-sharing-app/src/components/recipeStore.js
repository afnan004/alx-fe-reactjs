import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  // State
  recipes: [
    { id: 1, title: 'Pasta Carbonara', description: 'Classic Italian pasta dish', ingredients: ['pasta', 'eggs', 'cheese'], prepTime: 20 },
    { id: 2, title: 'Chicken Curry', description: 'Spicy chicken curry', ingredients: ['chicken', 'curry paste', 'coconut milk'], prepTime: 40 }
  ],
  searchTerm: '',
  filteredRecipes: [],
  filterBy: 'title',
  minPrepTime: 0,

  // Recipe CRUD Actions
  addRecipe: (recipe) => set((state) => ({ 
    recipes: [...state.recipes, { ...recipe, id: Date.now() }] 
  })),
  updateRecipe: (id, updatedRecipe) => 
    set((state) => ({
      recipes: state.recipes.map(recipe => 
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      )
    })),
  deleteRecipe: (id) => 
    set((state) => ({
      recipes: state.recipes.filter(recipe => recipe.id !== id)
    })),
  setRecipes: (newRecipes) => set({ recipes: newRecipes }), // Added for Task 0

  // Search and Filter Actions
  setSearchTerm: (term) => set({ searchTerm: term }),
  setFilterBy: (filter) => set({ filterBy: filter }),
  setMinPrepTime: (time) => set({ minPrepTime: time }),
  filterRecipes: () => set((state) => {
    const term = state.searchTerm.toLowerCase();
    return {
      filteredRecipes: state.recipes.filter(recipe => {
        const matchesSearch = 
          state.filterBy === 'title' 
            ? recipe.title.toLowerCase().includes(term)
            : state.filterBy === 'ingredients'
            ? recipe.ingredients.some(ing => ing.toLowerCase().includes(term))
            : true;
        const matchesPrepTime = recipe.prepTime >= state.minPrepTime;
        return matchesSearch && matchesPrepTime;
      })
    };
  })
}));

export default useRecipeStore;