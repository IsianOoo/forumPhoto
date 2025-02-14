import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from '../../context/userContext';

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleUpdate = async (field, value) => {
      try {
          const response = await axios.put('/auth/profile', { [field]: value });
          setUser(response.data);
          toast.success(`${field} updated successfully!`);
      } catch (error) {
          toast.error(`Failed to update ${field}`);
      }
  };



  return (
    <div className="max-w-lg mx-auto bg-white border border-gray-200 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

        <div className="mb-4">
            <label className="block text-gray-700 font-medium">Name</label>
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-2"
                />
                <button
                    onClick={() => handleUpdate('name', name)}
                    className="bg-pink-400 text-white px-3 py-1 rounded-lg hover:bg-pink-500 transition"
                >
                    Change
                </button>
            </div>
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <div className="flex items-center gap-2">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-2"
                />
                <button
                    onClick={() => handleUpdate('email', email)}
                    className="bg-pink-400 text-white px-3 py-1 rounded-lg hover:bg-pink-500 transition"
                >
                    Change
                </button>
            </div>
        </div>
    </div>
);
}