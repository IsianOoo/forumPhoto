import axios from 'axios'
import {createContext,useState,useEffect} from 'react'

export const UserContext = createContext({})

export function UserContextProvider({children}){
const [user,setUser] = useState(null)
const [loading, setLoading] = useState(true);
useEffect(()=>{
    axios.get('/profile')
    .then(({ data }) => {
      setUser(data);
    })
    .catch(() => setUser(null))
    .finally(() => setLoading(false));
},[])
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
        <UserContext.Provider value={{user,setUser, logout, loading }}>
            {children}
        </UserContext.Provider>
    )
}