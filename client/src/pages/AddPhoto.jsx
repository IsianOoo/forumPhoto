import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AddPhoto() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState(null);
	const navigate = useNavigate();

	const handleFileChange = (e) => {
		setImage(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		
		if (!title || !image) {
			toast.error('Title and image are required!');
			return;
		}

		const formData = new FormData();
		formData.append('title', title);
		formData.append('description', description);
		formData.append('image', image);

		try {
			const response = await axios.post('/photo', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			console.log('Photo added:', response.data);
			toast.success('Photo added successfully!');
			navigate('/photo'); 
		} catch (error) {
			console.error('Error adding photo:', error);
			toast.error('Failed to add photo.');
		}
	};

	return (
		<div className="container mx-auto mt-10">
			<h2 className="text-3xl font-bold text-center mb-6">Add New Photo</h2>

			<form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
				<div className="mb-4">
					<label className="block text-gray-700 font-semibold">Title</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="border rounded-md px-3 py-2 w-full"
						placeholder="Enter title..."
						required
					/>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 font-semibold">Description (optional)</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="border rounded-md px-3 py-2 w-full"
						placeholder="Enter description..."
					/>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 font-semibold">Upload Image</label>
					<input
						type="file"
						accept="image/*"
						onChange={handleFileChange}
						className="border rounded-md px-3 py-2 w-full"
						required
					/>
				</div>

				<button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded-md w-full hover:bg-pink-600 transition">
					Add Photo
				</button>
			</form>
		</div>
	);
}
