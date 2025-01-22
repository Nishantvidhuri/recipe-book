import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Saved from "./pages/Saved";
import User from "./pages/User";
import RecipeDetails from "./pages/RecipeDetails";
import { SavedRecipesProvider } from "./context/SavedRecipesContext";

function App() {
  return (
    <SavedRecipesProvider>
      <div className="min-h-screen bg-gray-900 text-gray-200">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
         
            <Route path="/saved" element={<Saved />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </div>
      </div>
    </SavedRecipesProvider>
  );
}

export default App;
