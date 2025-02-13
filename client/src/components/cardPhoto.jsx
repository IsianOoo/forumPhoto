import axios from 'axios'
import { useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { UserContext } from '../../context/userContext'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function CardPhoto({ id, title, description, imageUrl, initialLikes, initialComments }) {
	const { user } = useContext(UserContext)
	const [likes, setLikes] = useState(initialLikes || 0)
	const [comments, setComments] = useState(initialComments || [])
	const [commentText, setCommentText] = useState('')
	const [photoUserId, setPhotoUserId] = useState(null)
	const [editingCommentId, setEditingCommentId] = useState(null)
	const [editCommentText, setEditCommentText] = useState('')

	const navigate = useNavigate()

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const response = await axios.get(`/photo/${id}/comments`)
				console.log('Fetched comments:', response.data)
				setComments(response.data)
			} catch (error) {
				console.error('Error fetching comments:', error)
				toast.error('Error fetching comments.')
			}
		}

		fetchComments()
	}, [id])

	useEffect(() => {
		const fetchPhotoDetails = async () => {
			try {
				const response = await axios.get(`/photo`)
				const currentPhoto = response.data.find((photo) => photo._id === id)

				if (currentPhoto) {
					setPhotoUserId(currentPhoto.userId)
					console.log('Found photo userId:', currentPhoto.userId)
				} else {
					console.warn('Photo not found in response')
				}
			} catch (error) {
				console.error('Error fetching photo details:', error)
				toast.error('Error fetching photo details.')
			}
		}

		fetchPhotoDetails()
	}, [id])

	const handleLike = async () => {
		try {
			const response = await axios.post(`/photo/${id}/like`)
			console.log('Like response:', response.data)
			setLikes(response.data.likes)
			toast.success('Photo liked!')
		} catch (error) {
			console.error('Error liking photo:', error)
			toast.error('Error liking photo.')
		}
	}

	const handleAddComment = async (e) => {
		e.preventDefault()
		if (!commentText.trim()) {
			toast.error('Comment cannot be empty!')
			return
		}
		try {
			const response = await axios.post(`/photo/${id}/comment`, { content: commentText })
			console.log('Add comment response:', response.data)
			const updatedComments = await axios.get(`/photo/${id}/comments`)
			setComments(updatedComments.data)
			setCommentText('')
			toast.success('Comment added!')
		} catch (error) {
			console.error('Error adding comment:', error)
			toast.error('Error adding comment.')
		}
	}

	const handleDeleteComment = async (commentId) => {
		try {
			await axios.delete(`/photo/${id}/comment/${commentId}`)
			setComments(comments.filter((comment) => comment._id !== commentId))
			toast.success('Comment deleted!')
		} catch (error) {
			console.error('Error deleting comment:', error)
			toast.error('Error deleting comment.')
		}
	}

	const handleDeletePhoto = async () => {
		if (!window.confirm('Are you sure you want to delete this photo?')) return

		try {
			await axios.delete(`/photo/${id}`)
			toast.success('Photo deleted!')
		} catch (error) {
			console.error('Error deleting photo:', error)
			toast.error('Error deleting photo.')
		}
	}

	const handleUpdateComment = async () => {
		try {
			await axios.put(`/photo/${id}/comment/${editingCommentId}`, { content: editCommentText })
			toast.success('Comment updated successfully!')
			const updatedComments = await axios.get(`/photo/${id}/comments`)
			setComments(updatedComments.data)
			setEditingCommentId(null)
			setEditCommentText('')
		} catch (error) {
			toast.error('Failed to update comment.')
		}
	}

	return (
		<div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden'>
			<img className='w-full h-80 object-cover' src={imageUrl} alt={title} />
			<div className='p-4'>
				<div className='flex justify-between'>
					<h3 className='font-bold text-lg'>{title}</h3>
					{user && photoUserId && String(user.id) === String(photoUserId) && (
						<div className='flex space-x-2'>
							<button onClick={handleDeletePhoto} className='text-red-500'>
								<FaTrash />
							</button>
							<button onClick={() => navigate(`/photo/edit/${id}`)} className='text-blue-500'>
								<FaEdit />
							</button>
						</div>
					)}
				</div>
				<p className='text-gray-600'>{description}</p>

				<button onClick={handleLike} className='flex items-center mt-4 text-pink-500'>
					❤️ {likes}
				</button>

				<div className='mt-4'>
					<h4 className='font-bold mb-2'>Comments:</h4>
					<ul>
						{comments.map((comment) => (
							<li key={comment._id} className='mb-2'>
								<div>
									<span className='font-semibold'>{comment.content}</span>
									<br />
									<span className='text-gray-500 text-sm'>
										Added by {user && user.id === comment.userId ? 'you' : `user ${comment.userId}`}
									</span>
								</div>
								{editingCommentId === comment._id ? (
									<div className='flex space-x-2'>
										<input
											type='text'
											value={editCommentText}
											onChange={(e) => setEditCommentText(e.target.value)}
											className='border px-2 py-1 rounded w-full'
										/>
										<button onClick={handleUpdateComment} className='bg-green-500 text-white px-3 py-1 rounded'>
											Update
										</button>
										<button
											onClick={() => setEditingCommentId(null)}
											className='bg-gray-500 text-white px-3 py-1 rounded'>
											Cancel
										</button>
									</div>
								) : (
									<div>
										{user && user.id === comment.userId && (
											<>
												<button
													onClick={() => {
														setEditingCommentId(comment._id)
														setEditCommentText(comment.content)
													}}
													className='text-blue-500 hover:underline mr-2'>
													Edit
												</button>
												<button onClick={() => handleDeleteComment(comment._id)} className='text-red-500 text-sm'>
													Delete
												</button>
											</>
										)}
									</div>
								)}
							</li>
						))}
					</ul>

					{user && (
						<form onSubmit={handleAddComment} className='mt-4'>
							<input
								type='text'
								placeholder='Add a comment...'
								value={commentText}
								onChange={(e) => setCommentText(e.target.value)}
								className='border rounded-md px-2 py-1 w-full'
							/>
							<button type='submit' className='bg-pink-500 text-white px-4 py-1 mt-2 rounded-md'>
								Add Comment
							</button>
						</form>
					)}
				</div>
			</div>
		</div>
	)
}
