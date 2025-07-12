'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('adminToken')
    const userData = localStorage.getItem('adminUser')
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setIsAuthenticated(true)
        setUser(parsedUser)
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)
    
    // Simulate API call with realistic delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Demo credentials with multiple admin users
    const validCredentials = [
      { email: 'admin@ayumist.com', password: 'admin123', name: 'Admin User', role: 'admin' },
      { email: 'manager@ayumist.com', password: 'manager123', name: 'Manager User', role: 'manager' },
      { email: 'staff@ayumist.com', password: 'staff123', name: 'Staff User', role: 'staff' }
    ]
    
    const validUser = validCredentials.find(cred => cred.email === email && cred.password === password)
    
    if (validUser) {
      const userData: User = {
        id: 1,
        email: validUser.email,
        name: validUser.name,
        role: validUser.role,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(validUser.name)}&background=B8956B&color=fff`
      }
      
      localStorage.setItem('adminToken', 'mock-jwt-token')
      localStorage.setItem('adminUser', JSON.stringify(userData))
      
      setIsAuthenticated(true)
      setUser(userData)
      setLoading(false)
      return true
    }
    
    setLoading(false)
    return false
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    setIsAuthenticated(false)
    setUser(null)
  }

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem('adminUser', JSON.stringify(updatedUser))
    }
  }

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}