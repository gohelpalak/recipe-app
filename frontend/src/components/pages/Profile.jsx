import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { Pizza, Cake, Drumstick, User } from 'lucide-react';
import axios from 'axios';

const Profile = () => {
  const { user, tokens } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const res = await axios.get('http://localhost:3456/getFavourite', {
          headers: { Authorization: `Bearer ${tokens}` },
        });
        setRecipes(res.data.savedRecipes);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch recipes.');
      }
    };
    fetchSavedRecipes();
  }, []);

  const handleRemove = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3456/removeFavourite/${id}`, {
        headers: { Authorization: `Bearer ${tokens}` },
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove recipe.');
    }
  };

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 min-h-screen flex flex-col items-center p-8 relative">
      <Pizza className="absolute top-10 left-10 text-orange-400 w-16 h-16 opacity-30" />
      <Cake className="absolute top-20 right-20 text-yellow-500 w-16 h-16 opacity-30" />
      <Drumstick className="absolute bottom-20 left-20 text-blue-400 w-16 h-16 opacity-30" />
      
      <div className="bg-white bg-opacity-90 backdrop-blur-lg border border-amber-100 p-8 rounded-xl shadow-xl max-w-md w-full mb-8 text-center">
        {user && (
          <>
            <User size={40} className="text-gray-500 mx-auto" />
            <h1 className="text-3xl font-bold mt-4 text-gray-800">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
          </>
        )}
      </div>

      <div className="w-full max-w-7xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Your Saved Recipes</h2>
        {recipes.length === 0 ? (
          <p className="text-gray-500 text-center">You haven't saved any recipes yet. Start exploring and save your favorites!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="bg-white p-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                <img
                  src={`http://localhost:3456${recipe.image}`}
                  alt={recipe.name}
                  className="rounded-lg h-64 w-full object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800 text-center">{recipe.name}</h3>
                <p className="text-sm text-gray-600 text-center">Category: {recipe.category}</p>
                <p className="text-sm text-gray-600 text-center">Difficulty: {recipe.difficulty}</p>
                <button
                  onClick={() => handleRemove(recipe._id)}
                  className="mt-4 w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Remove from Saved
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
