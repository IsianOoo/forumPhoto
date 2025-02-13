import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function AddCourse() {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		content: '',
		category: '',
		difficulty: '',
		duration: '',
		language: '',
		thumbnail: null,
	})
	const navigate = useNavigate()

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleFileChange = (e) => {
		setFormData({ ...formData, thumbnail: e.target.files[0] })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		// Walidacja wymaganych pól
		if (!formData.title || !formData.thumbnail || !formData.duration) {
			toast.error('Title, thumbnail, and duration are required!')
			return
		}

		// Walidacja difficulty (tylko 3 wartości)
		const allowedDifficulties = ['Beginner', 'Intermediate', 'Advanced']
		if (!allowedDifficulties.includes(formData.difficulty)) {
			toast.error('Invalid difficulty value. Choose Beginner, Intermediate, or Advanced.')
			return
		}

		const payload = new FormData()
		payload.append('title', formData.title)
		payload.append('description', formData.description || '')
		payload.append('content', formData.content || '')
		payload.append('category', formData.category || 'General')
		payload.append('difficulty', formData.difficulty)
		payload.append('duration', Number(formData.duration))
		payload.append('language', formData.language || 'English')
		payload.append('thumbnail', formData.thumbnail)

		try {
			const response = await axios.post('/course', payload, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})

			if (response.data?.id) {
				toast.success('Course added successfully!')
				navigate(`/course/${response.data.id}`)
			} else {
				toast.success('Course added without ID.')
				navigate('/courses')
			}
		} catch (error) {
			console.error('Failed to add course:', error)
			toast.error(`Error: ${error.response?.data?.message || 'Server error'}`)
		}
	}

	return (
		<form onSubmit={handleSubmit} className='max-w-md mx-auto bg-white p-6 rounded-lg shadow-md'>
			<input
				name='title'
				onChange={handleChange}
				placeholder='Title'
				className='border rounded px-2 py-1 w-full mb-3'
				required
			/>
			<textarea
				name='description'
				onChange={handleChange}
				placeholder='Description'
				className='border rounded px-2 py-1 w-full mb-3'
			/>
			<input
				name='content'
				onChange={handleChange}
				placeholder='Content'
				className='border rounded px-2 py-1 w-full mb-3'
			/>
			<input
				name='category'
				onChange={handleChange}
				placeholder='Category'
				className='border rounded px-2 py-1 w-full mb-3'
			/>
			<div className='mb-4'>
				<label className='block text-gray-700 font-semibold'>Difficulty</label>
				<select
					name='difficulty'
					value={formData.difficulty}
					onChange={handleChange}
					className='border rounded-md px-3 py-2 w-full'
					required>
					<option value=''>Select difficulty</option>
					<option value='Beginner'>Beginner</option>
					<option value='Intermediate'>Intermediate</option>
					<option value='Advanced'>Advanced</option>
				</select>
			</div>

			<input
				name='duration'
				onChange={handleChange}
				placeholder='Duration (hours)'
				type='number'
				className='border rounded px-2 py-1 w-full mb-3'
			/>
			<input
				name='language'
				onChange={handleChange}
				placeholder='Language'
				className='border rounded px-2 py-1 w-full mb-3'
			/>
			<input
				type='file'
				onChange={handleFileChange}
				accept='image/*'
				className='border rounded px-2 py-1 w-full mb-3'
				required
			/>
			<button type='submit' className='bg-pink-500 text-white px-4 py-2 rounded-md w-full hover:bg-pink-600 transition'>
				Add Course
			</button>
		</form>
	)
}
