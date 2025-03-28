import React, { useContext, useEffect, useState } from 'react';
import {
  Utensils,
  Leaf,
  Clock,
  Flame,
  List,
  Camera,
  Edit,
  Tag
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tokens } = useContext(AuthContext);
  const [recipeData, setRecipeData] = useState({});

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`https://recipe-app-1pdt.onrender.com/viewSingleRecipe/${id}`, {
          headers: { Authorization: `Bearer ${tokens}` },
        });
        setRecipeData(res.data.singleRecipe);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    fetchRecipe();
  }, [id, tokens]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setRecipeData({ ...recipeData, [name]: files[0] });
    } else {
      setRecipeData({ ...recipeData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(recipeData).forEach((key) => {
      formData.append(key, recipeData[key]);
    });

    try {
      const res = await axios.put(`https://recipe-app-1pdt.onrender.com/editRecipe/${id}`, formData, {
        headers: { Authorization: `Bearer ${tokens}`, 'Content-Type': 'multipart/form-data' },
      });
      if (res.data) {
        toast.success('Recipe updated successfully!');
        navigate("/viewrecipe");
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update recipe');
    }
  };

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 py-10 min-h-screen flex justify-center items-center">
      <div className="bg-white bg-opacity-90 backdrop-blur-lg border border-amber-100 p-8 rounded-xl shadow-xl max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 flex items-center justify-center mb-6">
          <Edit className="text-amber-500 mr-2" size={24} /> Edit Recipe
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-gray-700 font-medium flex items-center">
                <Edit className="text-gray-600 mr-2" size={18} /> Recipe Name
              </label>
              <input
                type="text"
                name="name"
                value={recipeData.name || ''}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg w-full p-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                placeholder="Enter recipe name"
                required
              />
            </div>
            <div>
              <label className="text-gray-700 font-medium flex items-center">
                <Leaf className="text-green-600 mr-2" size={18} /> Dietary Type
              </label>
              <select
                name="isVegetarian"
                value={recipeData.isVegetarian || 'vegetarian'}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg w-full p-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                required
              >
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>
            <div>
              <label className="text-gray-700 font-medium flex items-center">
                <Camera className="text-gray-600 mr-2" size={18} /> Recipe Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="border border-gray-300 rounded-lg w-full p-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                accept="image/*"
              />
            </div>
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-amber-500 text-white font-semibold py-2 rounded-lg flex items-center justify-center hover:bg-amber-600 transition duration-200"
            >
              <Edit className="mr-2" size={18} /> Update Recipe
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditRecipe;
