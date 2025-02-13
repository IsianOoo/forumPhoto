import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function CourseDetails() {
	const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);


	useEffect(() => {
        fetch(`http://localhost:8000/course/${id}`)
            .then(response => response.json())
            .then(data => {
                setCourse(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching course:", error);
                setLoading(false);
            });
    }, [id]);

	if (loading) return <p className="text-center text-gray-500">Loading course...</p>;

    if (!course) return <p className="text-center text-gray-500">Course not found</p>;

    return (
        <div className="container mx-auto mt-10 p-6">
            <h2 className="text-3xl font-bold text-pink-400">{course.title}</h2>
            <p className="text-gray-600 mt-2">{course.description}</p>
            
            <div className="mt-4">
                <span className="text-sm text-gray-500">📚 {course.difficulty} • ⏳ {course.duration} Weeks • 💬 {course.language}</span>
            </div>

            {course.thumbnailUrl && (
                <img src={course.thumbnailUrl} alt={course.title} className="w-full max-w-2xl mt-6 rounded-lg shadow-lg" />
            )}

            <div className="mt-6 bg-white shadow-lg p-6 rounded-lg overflow-auto break-words">
                <h3 className="text-xl font-semibold">Course Content</h3>
                <p className="text-gray-600 mt-2 break-words overflow-auto">{course.content}</p>
            </div>
        </div>
    );
}
