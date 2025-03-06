import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Demo user for presentation
  const [user, setUser] = useState({
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signIn = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual authentication API call
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: email,
      };
      setUser(mockUser);
      // Store auth token in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      return mockUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual registration API call
      const mockUser = {
        id: '1',
        name: name,
        email: email,
      };
      // Don't set user here - make them sign in instead
      return mockUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  // Check for stored user data on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
