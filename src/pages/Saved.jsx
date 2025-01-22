import { useSavedRecipes } from "../context/SavedRecipesContext";

const Saved = () => {
  const { savedRecipes, removeRecipe } = useSavedRecipes();

  if (savedRecipes.length === 0) {
    return (
      <div className="p-8 bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">Saved Recipes</h1>
        <p className="text-gray-400 text-lg">No saved recipes found.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-900 text-gray-200 min-h-screen">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6 text-center">Saved Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {savedRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform transform hover:-translate-y-2 flex flex-col"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-grow">
              <h2 className="text-lg font-bold text-yellow-400 truncate">{recipe.title}</h2>
              <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                {recipe.summary?.replace(/<[^>]*>/g, "").substring(0, 150) || "No summary available."}
              </p>
            </div>
            <div className="p-4 flex justify-between items-center">
              <button
                onClick={() => removeRecipe(recipe.id)}
                className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Remove
              </button>
              <a
                href={`/recipe/${recipe.id}`}
                className="px-4 py-2 text-sm font-medium bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition"
              >
                View Recipe
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saved;
