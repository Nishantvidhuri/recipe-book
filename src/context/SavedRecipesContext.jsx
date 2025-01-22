import { createContext, useState, useContext } from "react";

export const SavedRecipesContext = createContext();

export const SavedRecipesProvider = ({ children }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const addRecipe = (recipe) => {
    setSavedRecipes((prev) => [...prev, recipe]);
  };

  const removeRecipe = (id) => {
    setSavedRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  return (
    <SavedRecipesContext.Provider
      value={{ savedRecipes, addRecipe, removeRecipe }}
    >
      {children}
    </SavedRecipesContext.Provider>
  );
};

// Custom Hook
export const useSavedRecipes = () => useContext(SavedRecipesContext);
