import React from 'react'
import { useState } from 'react'

export default function Register() {
    const[data,setData] = useState({
        name:'',
        email:'',
        password:'',
    })

    const registerUser =(e) =>{
        e.preventDefault()
    }

  return (
    <div>
        <form onSubmit={registerUser}>
            <label>Nazwa</label>
            <input type="text" placeholder='Wpisz nazwe...' value={data.name} onChange={(e) => setData({...data,name:e.target.value})}/>
            <label>Email</label>
            <input type="email" placeholder='Wpisz email...' value={data.email} onChange={(e) => setData({...data,email:e.target.value})}/>
            <label>Hasło</label>
            <input type="password" placeholder='Wpisz hasło...' value={data.password} onChange={(e) => setData({...data,password:e.target.value})}/>
            <button type='submit'>Stwórz konto</button>
        </form>
    </div>
  )
}
