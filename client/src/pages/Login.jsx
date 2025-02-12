import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { UserContext } from '../../context/userContext';
import axios from 'axios';


export default function Login() {
	const navigate = useNavigate();
	const [data, setData] = useState({ email: '', password: '' });
	const { login } = useContext(UserContext);
  
	const loginUser = async (e) => {
	  e.preventDefault();
	  const success = await login(data.email, data.password);
	  
	  if (success) {
		toast.success("Logged in successfully!");
		navigate('/');
	  } else {
		toast.error("Invalid credentials.");
	  }
	};
  
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
			  className='w-full px-4 py-2 border rounded-md'
			/>
		  </div>
		  <div className='mb-6'>
			<label className='text-sm font-semibold text-gray-700 block'>Password</label>
			<input
			  type='password'
			  placeholder='Wpisz hasło...'
			  value={data.password}
			  onChange={(e) => setData({ ...data, password: e.target.value })}
			  className='w-full px-4 py-2 border rounded-md'
			/>
		  </div>
		  <button type='submit' className='bg-pink-400 text-white font-semibold rounded-md w-full py-2 px-4'>
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
	);
  }
