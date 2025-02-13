import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCourse() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`/course/${id}`);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setContent(response.data.content || "");
            } catch (error) {
                toast.error("Failed to load course details.");
            }
        };
        fetchCourse();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/course/${id}`, { title, description, content  });
            toast.success("Course updated successfully!");
            navigate("/courses");
        } catch (error) {
            toast.error("Failed to update course.");
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-3xl font-bold text-center mb-6">Edit Course</h2>
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
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border rounded-md px-3 py-2 w-full mb-4"
                    placeholder="Enter course content..."
                />
                <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition">
                    Save Changes
                </button>
            </form>
        </div>
    );
}