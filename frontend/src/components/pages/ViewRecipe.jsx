import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ViewRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const { tokens } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get('https://recipe-app-1pdt.onrender.com/getAllRecipes', {
          headers: { Authorization: `Bearer ${tokens}` },
        });
        setRecipes(res.data.recipes);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch recipes');
      }
    };
    fetchRecipes();
  }, [tokens]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`https://recipe-app-1pdt.onrender.com/deleteRecipe/${id}`, {
        headers: { Authorization: `Bearer ${tokens}` },
      });
      toast.success(res.data.message);
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete recipe');
    }
  };

  const handleEdit = (recipe) => {
    navigate(`/editrecipepage/${recipe._id}`);
  };

  return (
    <div className="min-h-screen bg-red-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-red-700 mb-6">Explore Recipes</h1>
      <button className="mb-4 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
        Filter Recipes
      </button>
      {recipes.length === 0 ? (
        <p className="text-gray-600">No recipes available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-all">
              <img
                src={`https://recipe-app-1pdt.onrender.com${recipe.image}`}
                alt={recipe.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-red-700">{recipe.name}</h2>
                <p className="text-gray-600">Category: {recipe.category}</p>
                <p className="text-gray-600">Difficulty: {recipe.difficulty}</p>
                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => handleEdit(recipe)}
                    className="text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="text-white bg-red-700 px-4 py-2 rounded-md hover:bg-red-900"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewRecipe;
