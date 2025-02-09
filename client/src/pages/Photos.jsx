import React from 'react'
import PhotoList from '../components/PhotoList'

export default function Photos() {
	return (
		<>
			<div className='flex-1 justify-items-center container mx-auto mt-10 '>
				<h2 className='text-3xl font-bold text-center mb-6'>All Photos</h2>
				<PhotoList />
			</div>
		</>
	)
}
