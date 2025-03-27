import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';


const Sinup = () => {
  const [formData, setFormData] = useState({});
  const navigate= useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({...formData,[name]:value})
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (formData.agreeTerms=="on") {
      // console.log('Form submitted:', formData);
      if (formData.password==formData.confirmPassword) {
        let newData= {
          name:formData.name,
          email:formData.email,
          password:formData.password,
          role:"user"
        }
        const res = await axios.post("http://localhost:3456/register" ,newData)
        if (res.data.user) {
          console.log("user registered",res.data.user);
          toast.success("User Registerd Success")
          navigate("/login")
          setFormData({})
        }
        else if(res.data.existingUser) {
          console.log("user registeres",res.data.existingUser);
          toast.warn("User Already Registered with email")
          setTimeout(() => {
            navigate("/login") 
          }, 1000);
          // setFormData({})
        }
      } 
      else{
        console.log("password and confirm password doesnot match");
      }
    }
  };

  return (
    <div className="flex bg-gradient-to-br justify-center from-orange-100 items-center min-h-screen to-red-100 z-2">
      {/* Background decorative elements */}
      <div className="absolute overflow-hidden z-0">
        <div className="bg-orange-300 h-96 rounded-full w-96 -right-24 -top-24 absolute opacity-20"></div>
        <div className="bg-red-300 h-80 rounded-full w-80 -left-24 absolute opacity-20 top-1/4"></div>
        <div className="bg-yellow-300 h-64 rounded-full w-64 absolute bottom-1/4 opacity-20 right-1/4"></div>
        
        {/* Food-related SVG elements */}
        <div className="absolute left-20 opacity-10 top-20">
          <svg className="h-20 text-orange-600 w-20" viewBox="0 0 24 24" fill="currentColor" >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14h2v7h-2zm0 8h2v2h-2z" />
          </svg>
        </div>
        <div className="absolute bottom-20 opacity-10 right-20">
          <svg className="h-24 text-red-600 w-24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.41-1.41 2 2 0 0 0 2.83 0 1 1 0 0 1 1.41 1.41 4 4 0 0 1-5.65 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
          </svg>
        </div>
      </div>

      {/* Registration Card */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative z-10">
        {/* Header with logo */}
        <div className="text-center mb-6">
          <div className="bg-gradient-to-r h-12 justify-center rounded-full w-12 from-orange-500 inline-flex items-center mb-3 to-red-600">
            <svg className="h-6 text-white w-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-5a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm-3-2a1 1 0 100-2H4a1 1 0 100 2h2zm3-4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl text-gray-800 font-bold">Create your account</h2>
          <p className="text-gray-500 mt-1">Join TastyPlate and start your culinary journey</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="text-gray-700 text-sm block font-medium mb-1"> Name</label>
              <input 
                type="text" 
                id="firstName" 
                name="name"
                value={formData.name?formData.name:""}
                onChange={handleChange}
                className="border border-gray-300 rounded-md w-full focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500 px-3 py-2"
                required
              />
            </div>
            {/* <div>
              <label htmlFor="lastName" className="text-gray-700 text-sm block font-medium mb-1">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border border-gray-300 rounded-md w-full focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500 px-3 py-2"
                required
              />
            </div> */}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="text-gray-700 text-sm block font-medium mb-1">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email?formData.email:""}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500 px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="text-gray-700 text-sm block font-medium mb-1">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              value={formData.password?formData.password:""}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500 px-3 py-2"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="text-gray-700 text-sm block font-medium mb-1">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword"
              value={formData.confirmPassword?formData.confirmPassword:""}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500 px-3 py-2"
              required
            />
          </div>

          <div className="flex items-center mb-6">
            <input 
              type="checkbox" 
              id="agreeTerms" 
              name="agreeTerms"
              // checked={formData.agreeTerms}
              onChange={handleChange}
              className="border-gray-300 h-4 rounded text-orange-600 w-4 focus:ring-orange-500"
              required
            />
            <label htmlFor="agreeTerms" className="text-gray-700 text-sm block ml-2">
              I agree to the <a href="#" className="text-orange-600 hover:text-orange-500">Terms of Service</a> and <a href="#" className="text-orange-600 hover:text-orange-500">Privacy Policy</a>
            </label>
          </div>
          <button 
            type="submit" 
            className="bg-gradient-to-r rounded-md shadow-md text-white w-full duration-300 ease-in-out font-medium from-orange-500 hover:from-orange-600 hover:to-red-700 px-4 py-3 to-red-600 transition"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Already have an account? <Link href="#" to={"/login"} className="text-orange-600 font-medium hover:text-orange-500">Sign in</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Sinup;