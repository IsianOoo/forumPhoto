import axios from 'axios';
import { createContext, useState } from 'react';



export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      
      const { data } = await axios.post('/auth/login', { email, password });
      console.log("Login response:", data);

      if (!data.token) {
        console.error("Login failed: No token received");
        return false;
      }

      
      localStorage.setItem('token', data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      
      const profileResponse = await axios.get('/auth/profile');
      console.log("User profile response:", profileResponse.data);

      setUser(profileResponse.data);
      return true;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/auth/logout');
      setUser(null);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      window.location.href = '/';
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, login }}>
      {children}
    </UserContext.Provider>
  );
}
