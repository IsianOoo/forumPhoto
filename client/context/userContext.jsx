import axios from 'axios'
import {createContext,useState,useEffect} from 'react'

export const UserContext = createContext({})

export function UserContextProvider({children}){
const [user,setUser] = useState(null)
const [loading, setLoading] = useState(true);
// useEffect(()=>{
//     axios.get('/auth/profile')
//     .then(({ data }) => {
//       setUser(data);
//     })
//     .catch(() => setUser(null))
//     .finally(() => setLoading(false));
// },[])

const login = async (email, password) => {
  try {
    const { data } = await axios.post('/auth/login', { email, password });
    console.log("User logged in:", data); 
    setUser(data.user); 
    return true; 
  } catch (error) {
    console.error("Login failed", error);
    return false;
  }
};
const logout = async () => {
    try {
      await axios.post('/auth/logout');
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error("Logout failed", error);
    }
  }
    return(
        <UserContext.Provider value={{user,setUser, logout, login }}>
            {children}
        </UserContext.Provider>
    )
}