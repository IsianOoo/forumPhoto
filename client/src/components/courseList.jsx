import { useState, useEffect } from "react";
import CourseCard from "./courseCard";

export default function CourseList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/course") 
            .then(response => response.json())
            .then(data => {
                setCourses(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching courses:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p className="text-center text-gray-500">Loading courses...</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {courses.length > 0 ? (
                courses.map(course => (
                    <CourseCard 
                        key={course._id}
                        id={course._id}  
                        title={course.title}
                        difficulty={course.difficulty}
                        duration={course.duration}
                        language={course.language}
                        thumbnail={course.thumbnailUrl} 
                        userId={course.userId} 
                    />
                ))
            ) : (
                <p className="text-center text-gray-500">No courses available</p>
            )}
        </div>
    );
}