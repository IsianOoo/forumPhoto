import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function CourseCard({ id, title, difficulty, duration, language, thumbnail, userId }) {
    const navigate = useNavigate();
    const { user } = useContext(UserContext); 

    const handleStartClick = () => {
        navigate(`/course/${id}`);
    };

    const handleDeleteCourse = async () => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;
        try {
            await axios.delete(`/course/${id}`);
            toast.success("Course deleted successfully!");
            window.location.reload(); 
        } catch (error) {
            toast.error("Failed to delete course.");
        }
    };

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col">
            <img
                className="w-full h-60 object-cover"
                src={thumbnail || "https://via.placeholder.com/300"}
                alt={title}
            />
            <div className="p-4 flex-1">
                <span className="bg-purple-200 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    #Photography course
                </span>
                <h3 className="font-bold text-lg mt-2">{title}</h3>
                <p className="text-gray-600 text-sm mt-1 flex items-center gap-2">
                    📚 {difficulty} • ⏳ {duration} Weeks • 💬 {language}
                </p>
            </div>

         
            {user && user.id === userId && (
                <div className="p-4 flex justify-between">
                    <button onClick={() => navigate(`/course/edit/${id}`)} className="text-blue-500">
                        <FaEdit /> Edit
                    </button>
                    <button onClick={handleDeleteCourse} className="text-red-500">
                        <FaTrash /> Delete
                    </button>
                </div>
            )}

            <div className="p-4 flex flex-col items-center">
                <button
                    onClick={handleStartClick}
                    className="w-full bg-pink-500 text-white font-semibold py-2 rounded-lg hover:bg-pink-600 transition"
                >
                    Start
                </button>
            </div>
        </div>
    );
}