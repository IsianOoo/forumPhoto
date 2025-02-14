import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function AddCompetitionPhoto() {
    const { id } = useParams();
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
            toast.error('Tytuł i zdjęcie są wymagane!');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);

        const token = localStorage.getItem('token');

        try {
            await axios.post(`http://localhost:8000/competition/${id}/join`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            toast.success('Zdjęcie dodane do konkursu!');
            navigate('/competition');
        } catch (error) {
            console.error('Błąd dodawania zdjęcia:', error);
            toast.error('Nie udało się dodać zdjęcia.');
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-3xl font-bold text-center mb-6">Dodaj zdjęcie do konkursu</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border rounded-md px-3 py-2 w-full mb-4" placeholder="Tytuł zdjęcia" required />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border rounded-md px-3 py-2 w-full mb-4" placeholder="Opis (opcjonalnie)" />
                <input type="file" accept="image/*" onChange={handleFileChange} className="border rounded-md px-3 py-2 w-full mb-4" required />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md w-full">Dodaj zdjęcie</button>
            </form>
        </div>
    );
}