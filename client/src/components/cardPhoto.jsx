import axios from 'axios'
import { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { UserContext } from '../../context/userContext'

export default function CardPhoto({ id, title, description, imageUrl, initialLikes, initialComments }) {
	const { user } = useContext(UserContext)
	const [likes, setLikes] = useState(initialLikes || 0)
	const [comments, setComments] = useState(initialComments || [])
	const [commentText, setCommentText] = useState('')

	const handleLike = async () => {
		try {
			const response = await axios.post(`/photo/${id}/like`)
			console.log('Like response:', response.data);
			setLikes(response.data.likes)
			toast.success('Photo liked!')
		} catch (error) {
			console.error('Error liking photo:', error)
			toast.error('Error liking photo.')
		}
	}

	const handleAddComment = async (e) => {
		e.preventDefault();
		try {
		  const response = await axios.post(`/photo/${id}/comment`, { text: commentText });
		  console.log('Add comment response:', response.data);
		  setComments([...comments, response.data]);
		  setCommentText('');
		  toast.success('Comment added!');
		} catch (error) {
			console.error('Error adding comment:', error);
		  toast.error('Error adding comment.');
		}
	  };
	
	  const handleDeleteComment = async (commentId) => {
		try {
		  await axios.delete(`/photo/${id}/comment/${commentId}`);
		  setComments(comments.filter((comment) => comment._id !== commentId));
		  toast.success('Comment deleted!');
		} catch (error) {
		  toast.error('Error deleting comment.');
		}
	  };
	return (
		<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      <div className="p-4">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-gray-600">{description}</p>

        
        <button onClick={handleLike} className="flex items-center mt-4 text-pink-500">
          ❤️ {likes}
        </button>

        
        <div className="mt-4">
          <h4 className="font-bold mb-2">Comments:</h4>
          <ul>
            {comments.map((comment) => (
              <li key={comment._id} className="mb-2 flex justify-between">
                <span>{comment.text}</span>
                {user && user._id === comment.userId && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>

          {user && (
            <form onSubmit={handleAddComment} className="mt-4">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="border rounded-md px-2 py-1 w-full"
              />
              <button type="submit" className="bg-pink-500 text-white px-4 py-1 mt-2 rounded-md">
                Add Comment
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
	)
}
