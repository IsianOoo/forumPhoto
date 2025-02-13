import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext'
import Photos from './pages/Photos'
import PrivateRoute from './components/PrivateRoute'
import Courses from './pages/Courses'
import Profile from './pages/Profile'
import AddPhoto from './pages/AddPhoto'
import EditPhoto from './components/EditPhoto'
import CourseDetails from './components/CourseDetails'
import AddCourse from './components/AddCourse'
import EditCourse from './components/EditCourse'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
	return (
		<UserContextProvider>
			<Navbar />
			<Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route
					path='/photo'
					element={
						<PrivateRoute>
							<Photos />
						</PrivateRoute>
					}
				/>
				<Route
					path='/courses'
					element={
						<PrivateRoute>
							<Courses />
						</PrivateRoute>
					}
				/>
				<Route
					path='/competition'
					element={
						<PrivateRoute>
							<div>Competition Page</div>
						</PrivateRoute>
					}
				/>
				<Route
					path='/profile'
					element={
						<PrivateRoute>
							<Profile />
						</PrivateRoute>
					}
				/>
				<Route
					path='/add-photo'
					element={
						<PrivateRoute>
							<AddPhoto />
						</PrivateRoute>
					}
				/>
				<Route
					path='/photo/edit/:id'
					element={
						<PrivateRoute>
							<EditPhoto />
						</PrivateRoute>
					}
				/>
				<Route
					path='/course/:id'
					element={
						<PrivateRoute>
							<CourseDetails />
						</PrivateRoute>
					}
				/>

				<Route
					path='/course/add'
					element={
						<PrivateRoute>
							<AddCourse />
						</PrivateRoute>
					}
				/>
        <Route
					path='/course/edit/:id'
					element={
						<PrivateRoute>
							<EditCourse />
						</PrivateRoute>
					}
				/>
			</Routes>
		</UserContextProvider>
	)
}

export default App
