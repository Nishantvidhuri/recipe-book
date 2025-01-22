import { Link } from "react-router-dom";
import { useContext } from "react";
import { FaSave, FaRegSave } from "react-icons/fa";
import { SavedRecipesContext } from "../context/SavedRecipesContext"; // Import context

const FoodCard = ({ id, title, image, summary, date }) => {
  const { savedRecipes, addRecipe, removeRecipe } = useContext(SavedRecipesContext); // Use context

  const isSaved = savedRecipes.some((recipe) => recipe.id === id); // Check if recipe is saved

  const toggleSave = () => {
    if (isSaved) {
      removeRecipe(id);
    } else {
      addRecipe({ id, title, image, summary, date });
    }
  };

  // Function to remove HTML tags
  const stripHTML = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col sm:flex-row hover:shadow-xl transform transition-transform hover:-translate-y-2">
      {/* Image Section */}
      <Link to={`/recipe/${id}`} className="sm:w-1/3 w-full">
        <img
          src={image}
          alt={title}
          className="w-full h-48 sm:h-full object-cover"
          onError={(e) =>
            (e.target.src = "https://via.placeholder.com/150?text=No+Image+Available")
          }
        />
      </Link>

      {/* Content Section */}
      <div className="p-4 sm:w-2/3 w-full flex flex-col justify-between">
        {/* Title and Summary */}
        <div>
          <h2 className="text-lg font-bold text-yellow-400">
            <Link to={`/recipe/${id}`} className="hover:underline">
              {title}
            </Link>
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            {stripHTML(summary).length > 150
              ? `${stripHTML(summary).substring(0, 150)}...`
              : stripHTML(summary)}
          </p>
        </div>

        {/* Footer Section */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-500 text-sm flex items-center">
            <span className="inline-block w-4 h-4 mr-2 bg-gray-600 rounded-full flex items-center justify-center">
              🕒
            </span>
            Ready in {date} minutes
          </p>
          <button
            onClick={toggleSave}
            className={`text-sm flex items-center ${
              isSaved ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"
            }`}
          >
            {isSaved ? (
              <>
                <FaSave className="mr-1" />
                Saved
              </>
            ) : (
              <>
                <FaRegSave className="mr-1" />
                Save
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
