import { useState, useEffect } from "react";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/cuisines?apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const formattedCategories = data.cuisines.map((cuisine) => ({
          name: cuisine,
          image: `https://spoonacular.com/recipeImages/${cuisine.toLowerCase()}.jpg`,
        }));

        setCategories(formattedCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200">
        <svg
          width="100px"
          height="100px"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#facc15"
            strokeWidth="4"
            fill="none"
          />
        </svg>
        <p className="text-yellow-400 mt-4 text-lg">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="p-8 bg-gray-900 text-gray-200 min-h-screen">
      <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
        Food Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-2"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/150?text=No+Image+Available")
              }
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-yellow-400 text-center">
                {category.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
