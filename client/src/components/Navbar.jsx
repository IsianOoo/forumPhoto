import { Link } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import {useContext} from 'react'
export default function Navbar() {

	const {user,logout,loading} = useContext(UserContext)
	if(loading) return null
	return (
		<nav className='bg-gray-200 bg-opacity-100'>
			<div className='max-w-7xl mx-auto px-3'>
				<div className='flex items-center justify-between h-14'>
					<div className='shrink-0'>
						<Link to='/' className='text-pink-400 text-xl font-bold'>
							Forum Photo
						</Link>
					</div>

					<ul className='flex space-x-7'>
						<li>
							<Link to='/' className='text-gray-500 hover:text-pink-400 hover:border-b-2 py-1 border-transparent transition-all duration-100 hover:border-pink-400'>Home</Link>
						</li>
						<li>
							<Link to='/photo' className='text-gray-500 hover:text-pink-400 hover:border-b-2 py-1 border-transparent transition-all duration-100 hover:border-pink-400'>Photos</Link>
						</li>
						<li>
							<Link to='/courses' className='text-gray-500 hover:text-pink-400 hover:border-b-2 py-1 border-transparent transition-all duration-100 hover:border-pink-400'>Courses</Link>
						</li>
						<li>
							<Link to='/competition' className='text-gray-500 hover:text-pink-400 hover:border-b-2 py-1 border-transparent transition-all duration-100 hover:border-pink-400'>Competition</Link>
						</li>
					</ul>

					<div className='flex space-x-4'>
						{user ? (
							<>
								<Link to='/profile' className='text-gray-500 hover:text-pink-400 hover:border-b-2 py-1 border-transparent transition-all duration-100 hover:border-pink-400 font-bold'>
									Profile
								</Link>
								<button onClick={logout} className='text-gray-400 hover:text-red-400 hover:border-b-2 py-1 border-transparent transition-all duration-100 hover:border-red-400'>
									Log out
								</button>
							</>
						) : (
							<>
								<Link to='/register' className='text-gray-500 hover:text-pink-400 hover:border-b-2 py-1 border-transparent transition-all duration-100 hover:border-pink-400 font-bold'>
									Sign Up
								</Link>
								<Link to='/login' className='text-gray-400 hover:text-pink-400 hover:border-b-2 py-1 border-transparent transition-all duration-100 hover:border-pink-400'>
									Log in
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	)
}
