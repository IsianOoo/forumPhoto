import axios from 'axios'
import { toast } from 'react-hot-toast'
import CardPhoto from "./cardPhoto"
import React, { useEffect, useState } from 'react'
export default function PhotoList(){
    const [photo, setPhoto] = useState([]);

useEffect( () => {
    const fetchPhotos = async(e)=>{
        e.preventDefault()
        try{
            toast.info('Fetching photos...');
            const response = await axios.get('/photo')
            setPhoto(response.data)
            toast.success('Login Succesful. Welcome!')
        }catch(err){
            toast.error(`Error:${err.message}`)
        }
        
    }


    fetchPhotos();
    },[])
    return(
        <div className="card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {photo.map((photo)=>(
                <CardPhoto
                key={photo.id}
                title={photo.title}
                description={photo.description}
                imageUrl={photo.imageUrl}
                />    
            ))}
            
           
        </div>
    )
}