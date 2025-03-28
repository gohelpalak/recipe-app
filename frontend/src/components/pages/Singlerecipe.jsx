import React, { useContext, useState, useEffect } from 'react';
import { Clock, Award, Heart, Printer, Share2, Utensils, ChefHat } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const SingleRecipeView = () => {
  const { tokens } = useContext(AuthContext);
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getSingleRecipe = async () => {
      try {
        const res = await axios.get(`https://recipe-app-1pdt.onrender.com/viewSingleRecipe/${id}`, {
          headers: { Authorization: `Bearer ${tokens}` },
        });
        if (res.data) {
          setRecipe(res.data.singleRecipe);
          setIngredients(res.data.singleRecipe.ingredients);
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    getSingleRecipe();
  }, [id, tokens]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-orange-200 text-gray-900 flex justify-center py-10">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl">
        {/* Left Column - Recipe Image */}
        <div className="relative flex justify-center">
          <img
            src={`https://recipe-app-1pdt.onrender.com${recipe.image}`}
            alt={recipe.name}
            className="w-full h-[600px] object-cover rounded-xl shadow-lg border border-orange-300"
          />
          <span className="absolute top-4 left-4 bg-orange-600 text-white px-4 py-1 rounded-full text-lg font-medium shadow-md">
            {recipe.category}
          </span>
        </div>

        {/* Right Column - Recipe Details */}
        <div className="p-6 bg-white shadow-lg rounded-xl">
          <h1 className="text-4xl font-bold mb-6 flex items-center gap-3 text-orange-700">
            <ChefHat size={40} className="text-orange-500" /> {recipe.name}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col items-center text-center">
              <Clock className="text-orange-500" size={32} />
              <p className="text-gray-500 text-md">Prep Time</p>
              <span className="text-gray-800 font-semibold text-lg">{recipe.prepTime} min</span>
            </div>

            <div className="flex flex-col items-center text-center">
              <Clock className="text-orange-500" size={32} />
              <p className="text-gray-500 text-md">Cook Time</p>
              <span className="text-gray-800 font-semibold text-lg">{recipe.cookTime} min</span>
            </div>

            <div className="flex flex-col items-center text-center">
              <Clock className="text-orange-500" size={32} />
              <p className="text-gray-500 text-md">Total Time</p>
              <span className="text-gray-800 font-semibold text-lg">{recipe.prepTime + recipe.cookTime} min</span>
            </div>

            <div className="flex flex-col items-center text-center">
              <Award className="text-orange-500" size={32} />
              <p className="text-gray-500 text-md">Difficulty</p>
              <span className="text-gray-800 font-semibold text-lg capitalize">{recipe.difficulty}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8 justify-center">
            <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition text-lg shadow">
              <Heart size={20} /> Like
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition text-lg shadow">
              <Share2 size={20} /> Share
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition text-lg shadow">
              <Printer size={20} /> Print
            </button>
          </div>

          {/* Ingredients */}
          <div className="mt-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              Ingredients <Utensils className="text-orange-500" size={30} />
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700 text-lg flex items-center">
                  <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRecipeView;