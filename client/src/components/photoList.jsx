import axios from 'axios'
import { toast } from 'react-hot-toast'
import CardPhoto from './cardPhoto'
import React, { useEffect, useState, useRef } from 'react'

export default function PhotoList() {
    const [photos, setPhotos] = useState([])
    const hasFetched = useRef(false) 

    useEffect(() => {
        if (hasFetched.current) return 
        hasFetched.current = true

        const fetchPhotos = async () => {
            try {
                toast('Fetching photos...')
                const response = await axios.get('http://localhost:8000/photo')

                setPhotos(response.data)

                toast.success('Photos loaded successfully!')
            } catch (err) {
                toast.error(`Error: ${err.message}`)
            }
        }

        fetchPhotos()
    }, [])

    const handleDeletePhoto = (deletedPhotoId) => {
        setPhotos((prevPhotos) => prevPhotos.filter(photo => photo._id !== deletedPhotoId));
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
            {photos.map((photo) => (
                <CardPhoto
                    key={photo._id}
                    id={photo._id}
                    title={photo.title}
                    description={photo.description}
                    imageUrl={photo.imageUrl}
                    initialLikes={photo.likes}
                    initialComments={photo.comments}
                />
            ))}
        </div>
    )
}