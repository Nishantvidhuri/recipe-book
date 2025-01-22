import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSavedRecipes } from "../context/SavedRecipesContext";

import { FaRegClock, FaUtensils, FaHeart, FaRegHeart } from "react-icons/fa"; // Import icons

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const { savedRecipes, addRecipe, removeRecipe } = useSavedRecipes();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipe details.");
        }
        const data = await response.json();
        setRecipe(data);

        // Check if the recipe is already saved
        const alreadySaved = savedRecipes.some(
          (savedRecipe) => savedRecipe.id === data.id
        );
        setIsSaved(alreadySaved);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRecipeDetails();
  }, [id, savedRecipes]);

  const toggleSave = () => {
    if (isSaved) {
      removeRecipe(recipe.id);
      setIsSaved(false);
    } else {
      addRecipe(recipe);
      setIsSaved(true);
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!recipe) {
    return <p className="text-gray-400">Loading recipe details...</p>;
  }

  return (
    <div className="p-8 bg-gray-900 text-gray-200 min-h-screen">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="rounded-lg mb-6 max-w-full"
      />

      {/* Save Button */}
      <button
        onClick={toggleSave}
        className={`flex items-center space-x-2 px-4 py-2 font-bold rounded-lg transition-colors duration-200 ${
          isSaved
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
        }`}
      >
        {isSaved ? <FaHeart /> : <FaRegHeart />}
        <span>{isSaved ? "Saved" : "Save"}</span>
      </button>

      {/* Time and Servings */}
      <div className="flex items-center space-x-8 mt-6 text-lg">
        <div className="flex items-center space-x-2">
          <FaRegClock className="text-yellow-400" />
          <span>{recipe.readyInMinutes} mins</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaUtensils className="text-yellow-400" />
          <span>{recipe.servings} servings</span>
        </div>
      </div>

      {/* Ingredients */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Ingredients</h2>
      <ul className="list-disc pl-5 mb-6">
        {recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>

      {/* Instructions */}
      <h2 className="text-2xl font-bold mb-4">Instructions</h2>
      {recipe.analyzedInstructions.length > 0 ? (
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <ol className="space-y-6">
            {recipe.analyzedInstructions[0].steps.map((step, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0"
              >
                {/* Step Number */}
                <div className="flex-shrink-0 flex items-center justify-center bg-yellow-500 text-gray-900 font-bold w-12 h-12 rounded-full shadow-md">
                  {index + 1}
                </div>
                {/* Step Description */}
                <div>
                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                    {step.step}
                  </p>
                  {step.ingredients && step.ingredients.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-semibold text-yellow-400">
                        Ingredients:
                      </p>
                      <ul className="text-sm text-gray-400 ml-4 list-disc">
                        {step.ingredients.map((ingredient) => (
                          <li key={ingredient.id}>{ingredient.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {step.equipment && step.equipment.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-semibold text-yellow-400">
                        Equipment:
                      </p>
                      <ul className="text-sm text-gray-400 ml-4 list-disc">
                        {step.equipment.map((item) => (
                          <li key={item.id}>{item.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <p className="text-gray-400 italic">
          No instructions available for this recipe.
        </p>
      )}
    </div>
  );
};

export default RecipeDetails;
