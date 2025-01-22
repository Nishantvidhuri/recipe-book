import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBookmark, FaTimes, FaBars } from "react-icons/fa";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/autocomplete?number=5&query=${query}&apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results.");
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="p-4 bg-gray-900 text-gray-200 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-12 mr-2" />
          <span className="text-xl font-bold text-yellow-400 hidden md:block">Recipe Book</span>
        </Link>

        {/* Search Bar */}
        <div className="relative flex-grow mx-4">
          <div className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search recipes..."
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring focus:ring-yellow-400"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 text-gray-500 hover:text-gray-300"
              >
                <FaTimes />
              </button>
            )}
          </div>
          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <ul className="absolute left-0 mt-2 bg-gray-800 text-gray-200 w-full rounded-lg shadow-lg z-10">
              {searchResults.map((result) => (
                <li
                  key={result.id}
                  className="px-4 py-2 hover:bg-gray-700 transition-colors"
                >
                  <Link to={`/recipe/${result.id}`}>{result.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={toggleMenu}
          className="text-2xl md:hidden focus:outline-none"
        >
          <FaBars />
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 text-lg font-medium">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-yellow-400 transition-colors duration-200"
          >
            <FaHome />
            Home
          </Link>
          <Link
            to="/saved"
            className="flex items-center gap-2 hover:text-yellow-400 transition-colors duration-200"
          >
            <FaBookmark />
            Saved
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      {isMenuOpen && (
        <div className="p-4 bg-gray-900 md:hidden">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              onClick={toggleMenu}
              className="flex items-center gap-2 hover:text-yellow-400 transition-colors duration-200"
            >
              <FaHome />
              Home
            </Link>
            <Link
              to="/saved"
              onClick={toggleMenu}
              className="flex items-center gap-2 hover:text-yellow-400 transition-colors duration-200"
            >
              <FaBookmark />
              Saved
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
