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
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<form onSubmit={registerUser} className='p-8 bg-white shadow-lg w-full max-w-sm'>
				<h2 className='text-2xl font-bold text-pink-400 mb-6'>Sign Up</h2>
				<div className='mb-4'>
					<label className='text-sm mb-2 font-semibold text-gray-700 block'>Nazwa</label>
					<input
						type='text'
						placeholder='Wpisz nazwe...'
						value={data.name}
						onChange={(e) => setData({ ...data, name: e.target.value })}
						className='text-gray-700 border rounded-md w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700'
					/>
				</div>
				<div className='mb-4'>
					<label className='text-sm mb-2 font-semibold text-gray-700 block'>Email</label>
					<input
						type='email'
						placeholder='Wpisz email...'
						value={data.email}
						onChange={(e) => setData({ ...data, email: e.target.value })}
						className='text-gray-700 border rounded-md w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700'
					/>
				</div>
				<div className='mb-4'>
					<label className='text-sm mb-2 font-semibold text-gray-700 block'>Hasło</label>
					<input
						type='password'
						placeholder='Wpisz hasło...'
						value={data.password}
						onChange={(e) => setData({ ...data, password: e.target.value })}
						className='text-gray-700 border rounded-md w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700'
					/>
				</div>

				<button type='submit' className='bg-pink-400 text-white font-semibold rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-700'>Create account</button>
				<p className='text-sm text-gray-500 mt-4 text-center'>
					Already have ab account?{' '}
					<a href='/login' className='text-pink-400 hover:underline'>
						Log in
					</a>
				</p>
			</form>
		</div>
	)
}
