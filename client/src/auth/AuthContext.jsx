
import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({children}){

  const [user,setUser] = useState(()=>{
    const token = localStorage.getItem("token");
    if(!token) return null;
    return jwtDecode(token);
  });

  const login = (token)=>{
    localStorage.setItem("token",token);
    setUser(jwtDecode(token));
  };

  const logout = ()=>{
    localStorage.removeItem("token");
    setUser(null);
  };

  return(
    <AuthContext.Provider value={{user,login,logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = ()=> useContext(AuthContext);
