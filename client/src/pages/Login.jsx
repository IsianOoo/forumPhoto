import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function Login() {
    const [data,setData] = useState({
        email:'',
        password:'',
    })

	const loginUser = (e) => {
		e.preventDefault()
		axios.get('/')
	}
	return (
		<div>
			<form onSubmit={loginUser}>
				<label>Email</label>
				<input type='email' placeholder='Wpisz email...' value={data.email}  onChange={(e)=>setData({...data,email:e.target.value})}/>
				<label>Hasło</label>
				<input type='password' placeholder='Wpisz hasło...' value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} />
				<button type='submit'>Loguj</button>
			</form>
		</div>
	)
}
