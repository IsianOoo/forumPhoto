import React from 'react'
import PhotoList from '../components/photoList'
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'

export default function Photos() {

	const { user } = useContext(UserContext)


	return (
		<>
			<div className='flex-1 justify-items-center container mx-auto mt-10 '>
				<h2 className='text-3xl font-bold text-center mb-6'>All Photos</h2>
				{user && (
					<div className="flex justify-center mb-4">
						<Link
							to="/add-photo"
							className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition"
						>
							Add new post
						</Link>
					</div>
				)}
				<PhotoList />
			</div>
		</>
	)
}
