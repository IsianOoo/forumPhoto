import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Register() {
	const navigate = useNavigate()
	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
	})

	const registerUser = async (e) => {
		e.preventDefault()
		const { name, email, password } = data
		try {
			const { data } = await axios.post('/auth/register', { name, email, password })
			if (data.error) {
				toast.error(data.error)
			} else {
				setData({})
				toast.success('Login Succesful. Welcome!')
				navigate('/login')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			<form onSubmit={registerUser}>
				<label>Nazwa</label>
				<input
					type='text'
					placeholder='Wpisz nazwe...'
					value={data.name}
					onChange={(e) => setData({ ...data, name: e.target.value })}
				/>
				<label>Email</label>
				<input
					type='email'
					placeholder='Wpisz email...'
					value={data.email}
					onChange={(e) => setData({ ...data, email: e.target.value })}
				/>
				<label>Hasło</label>
				<input
					type='password'
					placeholder='Wpisz hasło...'
					value={data.password}
					onChange={(e) => setData({ ...data, password: e.target.value })}
				/>
				<button type='submit'>Stwórz konto</button>
			</form>
		</div>
	)
}
