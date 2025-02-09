
import axios from 'axios'
import { toast } from 'react-hot-toast'

export default function CardPhoto({ title, description, imageUrl }) {
	return (
		<div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden'>
			<img className='w-full h-48 object-cover' src={imageUrl} alt='{title}' />
			<div className='p-4'>
				<div className='p-4'>
					<div>imie</div>
					<div>nazwisko</div>
				</div>
				<div className='p-4'>
					<h3 className='font-bold text-lg'>{title}</h3>
					<p className='text-gray-600'>{description}</p>
				</div>
			</div>
		</div>
	)
}
