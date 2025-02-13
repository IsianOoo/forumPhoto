import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditPhoto() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get('/photo'); 
        const currentPhoto = response.data.find(photo => photo._id === id);
        if (currentPhoto) {
          setTitle(currentPhoto.title);
          setDescription(currentPhoto.description);
        } else {
          toast.error('Photo not found.');
        }
      } catch (error) {
        toast.error('Failed to load photo details.');
      }
    };
    fetchPhoto();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      imagePath: 'default.jpg',
    };

    try {
      await axios.put(`/photo/${id}`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      toast.success('Photo updated successfully!');
      navigate('/photo');
    } catch (error) {
      toast.error('Failed to update photo.');
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">Edit Photo</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-md px-3 py-2 w-full mb-4"
          placeholder="Enter title..."
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded-md px-3 py-2 w-full mb-4"
          placeholder="Enter description..."
        />
        <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition">
          Save Changes
        </button>
      </form>
    </div>
  );
}
