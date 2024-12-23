import { Link } from 'react-router-dom'
export default function Navbar() {
	return (
		<nav className='bg-gray-200 bg-opacity-100'>
			<div className='max-w-7xl mx-auto px-3'>
				<div className='flex items-center justify-between h-14'>
          <div className='shrink-0'>
					<a href='/' class='text-pink-400 text-xl font-bold'>
						Forum Photo
					</a>
          </div>

					<ul className='flex space-x-7'>
						<li>
							<a href='/' className='text-gray-500 hover:text-pink-400 hover:border-b-2 py-1 border-transparent transition-all duration-100  hover:border-pink-400'>Home</a>
						</li>
						<li>
							<a href='#' className='text-gray-500 hover:text-pink-400 hover:border-b-2 py-1 border-transparent transition-all duration-100  hover:border-pink-400'>Photos</a>
						</li>
						<li>
							<a href='#' className='text-gray-500 hover:text-pink-400 hover:border-b-2 py-1 border-transparent transition-all duration-100  hover:border-pink-400'>Courses</a>
						</li>
						<li>
							<a href='#' className='text-gray-500 hover:text-pink-400 hover:border-b-2 py-1 border-transparent transition-all duration-100  hover:border-pink-400'>Competition</a>
						</li>
					</ul>

					<div className='flex space-x-4'>
						<a href='/register' className='text-gray-500 hover:text-pink-400 hover:border-b-2 py-1 border-transparent transition-all duration-100  hover:border-pink-400 font-bold'>Sign Up</a>
						<a href='/login 'className='text-gray-400 hover:text-pink-400 hover:border-b-2 py-1 border-transparent transition-all duration-100  hover:border-pink-400'>Log in</a>
					</div>
				</div>
			</div>
		</nav>
	)
}
