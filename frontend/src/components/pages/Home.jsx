import React, { useContext, useEffect, useState } from "react";
import { Search, Filter, Star, Heart } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dietType, setDietType] = useState("");

  const navigate = useNavigate();
  const { tokens, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3456/getCategory");
        setCategory(res.data.recipe);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const params = new URLSearchParams();
        if (searchTerm) params.append('category', searchTerm);
        if (dietType) params.append('type', dietType);

        const res = await axios.get(`http://localhost:3456/getRecipe?${params.toString()}`);
        setRecipes(res.data.allRecipes);
      } catch (error) {
        console.error("Failed to fetch recipes", error);
      }
    };
    fetchRecipes();
  }, [searchTerm, dietType]);

  const viewSingle = (id) => {
    navigate(`/viewsinglerecipe/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
          Culinary Inspirations
        </h1>
        
        <div className="relative max-w-xl mx-auto">
          <div className="flex items-center">
            <div className="relative flex-grow">
              <input 
                type="text" 
                placeholder="Search recipes..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button 
              onClick={() => setFilterOpen(!filterOpen)}
              className="bg-gray-100 border border-l-0 border-gray-300 p-3 rounded-r-lg hover:bg-gray-200 transition"
            >
              <Filter className="text-gray-600" />
            </button>
          </div>

          {filterOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-lg border border-gray-200 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">All Categories</option>
                    {category.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Diet Type
                  </label>
                  <select 
                    value={dietType}
                    onChange={(e) => setDietType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">All Types</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="non-vegetarian">Non-Vegetarian</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div 
            key={recipe._id} 
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
          >
            <div className="relative">
              <img 
                src={`http://localhost:3456${recipe.image}`} 
                alt={recipe.title} 
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-3 right-3 bg-white/80 p-2 rounded-full hover:bg-white">
                <Heart className="text-red-500 w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-gray-900">{recipe.title}</h2>
                <div className="flex items-center text-yellow-500">
                  <Star className="w-5 h-5 mr-1" />
                  <span className="text-sm">4.5</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{recipe.category}</p>
              <button 
                onClick={() => viewSingle(recipe._id)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

// hello 