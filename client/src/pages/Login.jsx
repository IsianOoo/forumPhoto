import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'

export default function Login() {
	const navigate = useNavigate()
	const [data, setData] = useState({
		email: '',
		password: '',
	})

	const [isLogin, setIsLogin] = useState(false)
	const { setUser } = useContext(UserContext)

	const loginUser = async (e) => {
		e.preventDefault()
		const { email, password } = data
		try {
			const { data } = await axios.post('/auth/login', {
				email,
				password,
			})

			if (data.error) {
				toast.error(data.error)
			} else {
				console.log('Login response:', data)
				localStorage.setItem('token', data.token) // Zapis tokena
				axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
				setData({})
				navigate('/')
				setUser(data)
			}
		} catch (error) {
			toast.error('Login failed')
		}
	}
	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<form onSubmit={loginUser} className='p-8 bg-white shadow-lg w-full max-w-sm'>
				<h2 className='text-2xl font-bold text-pink-400 mb-6'>Log in</h2>
				<div className='mb-4'>
					<label className='text-sm mb-2 font-semibold text-gray-700 block'>Email</label>
					<input
						type='email'
						placeholder='Wpisz email...'
						value={data.email}
						onChange={(e) => setData({ ...data, email: e.target.value })}
						className='w-full px-4 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700'
					/>
				</div>
				<div className='mb-6'>
					<label className='text-gray-700 text-sm block font-semibold mb-2'>Password</label>
					<input
						type='password'
						placeholder='Wpisz hasło...'
						value={data.password}
						onChange={(e) => setData({ ...data, password: e.target.value })}
						className='text-gray-700 border rounded-md w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700'
					/>
				</div>

				<button
					type='submit '
					className='bg-pink-400 text-white font-semibold rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-700'>
					Log in
				</button>
				<p className='text-sm text-gray-500 mt-4 text-center'>
					Don't have an account?{' '}
					<a href='/register' className='text-pink-400 hover:underline'>
						Sign up
					</a>
				</p>
			</form>
		</div>
	)
}
