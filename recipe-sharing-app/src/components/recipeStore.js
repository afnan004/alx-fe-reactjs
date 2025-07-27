import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  // Existing state (recipes, search, filters)
  recipes: [
    { id: 1, title: 'Pasta Carbonara', description: 'Classic Italian pasta dish', ingredients: ['pasta', 'eggs', 'cheese'], prepTime: 20 },
    { id: 2, title: 'Chicken Curry', description: 'Spicy chicken curry', ingredients: ['chicken', 'curry paste', 'coconut milk'], prepTime: 40 }
  ],
  searchTerm: '',
  filteredRecipes: [],
  filterBy: 'title',
  minPrepTime: 0,
  
  // New state for favorites and recommendations
  favorites: [],
  recommendations: [],

  // Existing actions (CRUD, search, filters)
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
  setRecipes: (newRecipes) => set({ recipes: newRecipes }),
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
  }),

  // New actions for favorites and recommendations
  addFavorite: (recipeId) => set((state) => {
    if (!state.favorites.includes(recipeId)) {
      return { favorites: [...state.favorites, recipeId] };
    }
    return state;
  }),
  removeFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),
  toggleFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.includes(recipeId)
      ? state.favorites.filter(id => id !== recipeId)
      : [...state.favorites, recipeId]
  })),
  generateRecommendations: () => set((state) => {
    // Simple recommendation logic based on favorites
    const favoriteIngredients = state.recipes
      .filter(recipe => state.favorites.includes(recipe.id))
      .flatMap(recipe => recipe.ingredients);
    
    const uniqueIngredients = [...new Set(favoriteIngredients)];
    
    const recommended = state.recipes
      .filter(recipe => !state.favorites.includes(recipe.id))
      .filter(recipe => 
        recipe.ingredients.some(ing => uniqueIngredients.includes(ing))
      )
      .sort(() => Math.random() - 0.5)
      .slice(0, 3); // Return top 3 recommendations
    
    return { recommendations: recommended };
  })
}));

export default useRecipeStore;