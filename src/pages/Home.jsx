import { useState, useEffect } from "react";
import FoodCard from "../components/FoodCard";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Page count for "Load More"

  const fetchRecipes = async (isLoadMore = false) => {
    setLoading(true);
    const url = `https://api.spoonacular.com/recipes/random?number=20&apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch recipes.");
      }

      const data = await response.json();
      setRecipes((prevRecipes) =>
        isLoadMore ? [...prevRecipes, ...data.recipes] : data.recipes
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetchRecipes(true); // Load more recipes
  };

  if (loading && recipes.length === 0) {
    return (
      <div className="text-gray-400 flex justify-center items-center min-h-screen">
        <p>Loading recipes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center min-h-screen">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-900 text-gray-200 min-h-screen">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6 text-center">
        Discover Random Recipes
      </h1>

      {/* Recipe Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <FoodCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            image={recipe.image}
            summary={recipe.summary || "No summary available"}
            date={recipe.readyInMinutes || "N/A"}
          />
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleLoadMore}
          className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg font-medium hover:bg-yellow-500 transition"
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default Home;
