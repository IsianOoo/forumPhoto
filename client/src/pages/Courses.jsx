import CourseList from '../components/courseList'
import { Link } from 'react-router-dom'

export default function Courses() {
	return (
		<div className='flex-1 justify-items-center container mx-auto mt-10 '>
			<div className='container mx-auto text-center my-10'>
				<h2 className='text-3xl font-bold text-pink-400'>Why Choose Our Photography Courses?</h2>
				<p className='text-gray-600 max-w-2xl mx-auto mt-2'>
					Enhance your photography skills with expert-led courses that cover everything from composition to editing. Our
					structured curriculum ensures you gain practical experience to take stunning photos.
				</p>
				<div className='flex flex-wrap justify-center gap-6 mt-6'>
					<div className='bg-white shadow-lg rounded-lg p-6 w-64 text-center'>
						<div className='text-pink-500 text-4xl'>📅</div>
						<h3 className='font-bold text-lg mt-2'>Flexible Schedule</h3>
						<p className='text-gray-500 text-sm'>Learn at your own pace, anytime, anywhere.</p>
					</div>
					<div className='bg-white shadow-lg rounded-lg p-6 w-64 text-center'>
						<div className='text-green-500 text-4xl'>📷</div>
						<h3 className='font-bold text-lg mt-2'>Expert Instructors</h3>
						<p className='text-gray-500 text-sm'>Learn from professional photographers with real-world experience.</p>
					</div>
					<div className='bg-white shadow-lg rounded-lg p-6 w-64 text-center'>
						<div className='text-yellow-500 text-4xl'>💰</div>
						<h3 className='font-bold text-lg mt-2'>Affordable Courses</h3>
						<p className='text-gray-500 text-sm'>High-quality lessons at a price that fits your budget.</p>
					</div>
				</div>
			</div>

			<div className='flex justify-center mb-6'>
				<Link to='/course/add' className='bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition'>
					➕ Add New Course
				</Link>
			</div>

			<CourseList />
		</div>
	)
}
