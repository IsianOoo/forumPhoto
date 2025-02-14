import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CompetitionsPage = () => {
    const [currentCompetition, setCurrentCompetition] = useState(null);
    const [pastCompetitions, setPastCompetitions] = useState([]);
    const [winnerPhotos, setWinnerPhotos] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        console.log('Token:', token);
    
        fetch('http://localhost:8000/competition', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log('Fetched data:', data);
            setCurrentCompetition(data.find(comp => new Date(comp.endDate) > new Date()));
            setPastCompetitions(data.filter(comp => new Date(comp.endDate) <= new Date()));
        })
        .catch(err => {
            console.error('Error fetching competitions:', err);
            setError('Nie udało się pobrać konkursów. Sprawdź logowanie.');
        });
    }, []);

    useEffect(() => {
        pastCompetitions.forEach(comp => {
            if (comp.winnerPhotoId) { 
                const token = localStorage.getItem('token');
    
                fetch(`http://localhost:8000/competition/photo/${comp.winnerPhotoId}/view`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Błąd pobierania obrazu: ${response.status}`);
                    }
                    return response.blob();
                })
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    setWinnerPhotos(prev => ({ ...prev, [comp._id]: url }));
                })
                .catch(error => console.error(`Błąd ładowania obrazu dla konkursu ${comp._id}:`, error));
            }
        });
    }, [pastCompetitions]);
    

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Konkursy</h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-8">
                {currentCompetition ? (
                    <div className="bg-blue-200 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">Obecnie trwający konkurs</h2>
                        <p className="text-lg">{currentCompetition.title}</p>
                        <p>{currentCompetition.description}</p>
                        <p className="text-sm text-gray-600">Koniec: {new Date(currentCompetition.endDate).toLocaleDateString()}</p>
                        <button onClick={() => navigate(`/competition/${currentCompetition._id}/add-photo`)} className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md">
                            Dołącz do konkursu
                        </button>
                        <button onClick={() => navigate(`/competition/${currentCompetition._id}/photos`)} className="mt-2 ml-2 bg-blue-500 text-white px-4 py-2 rounded-md">
                            Zobacz zdjęcia
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-600">Obecnie nie ma trwających konkursów.</p>
                )}
            </div>

            <h2 className="text-2xl font-semibold mb-4">Zakończone konkursy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pastCompetitions.map(comp => (
                    <div key={comp._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">{comp.title}</h3>
                        <p>{comp.description}</p>
                        <p className="text-sm text-gray-600">Zakończono: {new Date(comp.endDate).toLocaleDateString()}</p>
                        {winnerPhotos[comp._id] ? (
                            <div className="mt-2">
                                <p className="font-semibold">Zwycięzca:</p>
                                <img src={winnerPhotos[comp._id]} alt="Zwycięskie zdjęcie" className="w-full h-auto rounded-md" />
                            </div>
                        ) : (
                            <p className="text-gray-500">Brak zwycięskiego zdjęcia.</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompetitionsPage;