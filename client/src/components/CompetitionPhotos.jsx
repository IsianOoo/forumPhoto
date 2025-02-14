import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CompetitionPhotos() {
    const { id } = useParams();
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId'); 

    useEffect(() => {
        const token = localStorage.getItem('token');

        
        fetch(`http://localhost:8000/competition/${id}/photos`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(async data => {
            console.log('Pobrane zdjęcia:', data);

            
            const updatedPhotos = await Promise.all(
                data.map(async (photo) => {
                    try {
                        const imageResponse = await fetch(photo.imageUrl, {
                            headers: { 'Authorization': `Bearer ${token}` }
                        });

                        if (!imageResponse.ok) throw new Error(`Błąd pobierania obrazu: ${imageResponse.status}`);

                        const blob = await imageResponse.blob();
                        return { 
                            ...photo, 
                            imageUrl: URL.createObjectURL(blob),
                            userLiked: Array.isArray(photo.likes) ? photo.likes.includes(userId) : false,
                            votes: Array.isArray(photo.likes) ? photo.likes.length : 0
                        };
                    } catch (error) {
                        console.error(`Błąd ładowania obrazu dla ${photo._id}:`, error);
                        return { ...photo, imageUrl: null, userLiked: false, votes: 0 };
                    }
                })
            );

            setPhotos(updatedPhotos);
        })
        .catch(err => {
            console.error('Błąd pobierania zdjęć konkursowych:', err);
            setError('Nie udało się załadować zdjęć.');
        });

    }, [id]);

    const handleVote = async (photoId, userLiked) => {
        const token = localStorage.getItem('token');

        try {
            const res = await fetch("http://localhost:8000/competition/vote", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ competitionId: id, photoId })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Błąd operacji');

            
            setPhotos(prevPhotos => prevPhotos.map(photo =>
                photo._id === photoId
                    ? { 
                        ...photo, 
                        userLiked: !userLiked, 
                        votes: userLiked ? photo.votes - 1 : photo.votes + 1 
                    }
                    : photo
            ));
        } catch (error) {
            console.error('Błąd głosowania:', error);
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-3xl font-bold text-center mb-6">Zdjęcia konkursowe</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {photos.map(photo => (
                    <div key={photo._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                        {photo.imageUrl ? (
                            <img src={photo.imageUrl} alt={photo.title} className="w-full h-auto rounded-md" />
                        ) : (
                            <p className="text-gray-500">Nie udało się załadować obrazu</p>
                        )}
                        <h3 className="text-lg font-semibold mt-2">{photo.title}</h3>
                        <p>{photo.description}</p>

                        <button 
                            onClick={() => handleVote(photo._id, photo.userLiked)}
                            className={`mt-2 px-4 py-2 rounded-md ${photo.userLiked ? 'bg-red-500' : 'bg-blue-500'} text-white`}
                        >
                            {photo.userLiked ? 'Usuń głos' : 'Głosuj'} ({photo.votes})
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}