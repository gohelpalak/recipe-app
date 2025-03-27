import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { User, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logOut = () => {
    logout(navigate);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-orange-500">TastyPlate</Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-orange-500">Home</Link>
          {user?.role === 'admin' && (
            <Link to="/addrecipe" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              Add Recipes
            </Link>
          )}

          {/* User Profile Dropdown */}
          {user ? (
            <div className="relative group">
              <button className="flex items-center space-x-2 border p-2 rounded-full">
                <User size={24} className="text-gray-500" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Your Profile</Link>
                {user?.role === 'admin' && (
                  <Link to="/viewrecipe" className="block px-4 py-2 hover:bg-gray-100">Your Added Recipes</Link>
                )}
                <button onClick={logOut} className="w-full text-left px-4 py-2 hover:bg-gray-100">Sign Out</button>
              </div>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="border px-4 py-2 rounded text-gray-700 hover:bg-gray-100">Log In</Link>
              <Link to="/signup" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Sign Up</Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} className="text-gray-700" /> : <Menu size={28} className="text-gray-700" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md py-4 px-6 flex flex-col space-y-4">
          <Link to="/" className="text-gray-700 hover:text-orange-500">Home</Link>
          {user?.role === 'admin' && (
            <Link to="/addrecipe" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              Add Recipes
            </Link>
          )}
          {user ? (
            <>
              <Link to="/profile" className="text-gray-700 hover:text-orange-500">Your Profile</Link>
              {user?.role === 'admin' && <Link to="/viewrecipe" className="text-gray-700 hover:text-orange-500">Your Added Recipes</Link>}
              <button onClick={logOut} className="w-full text-left text-gray-700 hover:text-red-500">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="border px-4 py-2 rounded text-gray-700 hover:bg-gray-100">Log In</Link>
              <Link to="/signup" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;