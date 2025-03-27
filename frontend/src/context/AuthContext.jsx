import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const AuthContext= createContext()

function AuthContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [tokens, settokens] = useState(JSON.parse(localStorage.getItem("token"))|| null)

    // console.log("context token s",token);
    const fetchUser = async()=>{
        try {
            const res = await axios.get("http://localhost:3456/profile",{
                headers:{ Authorization:`Bearer ${tokens}`}
            })
            // console.log("context data",  res.data);
            setUser(res.data);
        } catch (error) {
            console.error("Error fetching user data:", error.response?.data?.message || error.message);
            // localStorage.removeItem("token");
        }
    }
    useEffect(() => {
      fetchUser()
    }, [tokens])

    const login =  (token) => {
        settokens(token)
        localStorage.setItem("token", JSON.stringify(token));
      };

    const logout = (navigate) => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login")
      };

  return (
    <AuthContext.Provider value={{login,user,logout,tokens}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider