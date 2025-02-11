import React from "react"

export default function Profile() {
    return (
        <div className="max-w-lg mx-auto bg-white border border-gray-200 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Name</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg p-2"
            
          />
          <button className="bg-pink-400 text-white px-3 py-1 rounded-lg hover:bg-pink-500 transition">Change</button>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Email</label>
        <div className="flex items-center gap-2">
          <input
            type="email"
            className="flex-1 border border-gray-300 rounded-lg p-2"
            
          />
          <button className="bg-pink-400 text-white px-3 py-1 rounded-lg hover:bg-pink-500 transition">Change</button>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Password</label>
        <div className="flex items-center gap-2">
          <input
            type="password"
            className="flex-1 border border-gray-300 rounded-lg p-2"
            
          />
          <button className="bg-pink-400 text-white px-3 py-1 rounded-lg hover:bg-pink-500 transition">Change</button>
        </div>
      </div>
    </div>
    )
}