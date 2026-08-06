"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { logoutAction } from "../(auth)/logoutAction";

type User = {
  _id: string;      
  firstName: string;
  lastName: string;
  userName: string; 
  email: string;
  phone:string;
  isAdmin: boolean; 
} | null;

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ 
  children, 
  initialUser 
}: { 
  children: ReactNode; 
  initialUser: User 
}) => {
  const [user, setUser] = useState(initialUser);
  const router = useRouter();

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
  await logoutAction(); 
  setUser(null);
  router.push("/");
  router.refresh(); 
};

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};