import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const ShowBook = () => {
	const [book, setBook] = useState({})
	const [loading, setLoading] = useState(false)
	const { id } = useParams()

	useEffect(() => {
		setLoading(true)
		async function fetchBook() {
			try {
				const data = await axios.get(`http://localhost:3000/books/${id}`)
				const book = data.data
				setBook(book)
				setLoading(false)
			} catch (err) {
				console.log(err.message)
				setLoading(false)
			}
		}

		fetchBook()
	}, [])

	return (
		<div className='p-4 w-fit'>
			<BackButton />
			<h1 className='text-3xl my-4'>Show Book</h1>
			{loading ? (
				<Spinner />
			) : (
				<div className='flex flex-col border-2 border-sky-400 rounded-xl p-4'>
					<div className='py-2'>
						<span className='text-xl mr-4 text-gray-500'>Id</span>
						<span>{book._id}</span>
					</div>
					<div className='py-2'>
						<span className='text-xl mr-4 text-gray-500'>Title</span>
						<span>{book.title}</span>
					</div>
					<div className='py-2'>
						<span className='text-xl mr-4 text-gray-500'>Author</span>
						<span>{book.author}</span>
					</div>
					<div className='py-2'>
						<span className='text-xl mr-4 text-gray-500'>Publish Year</span>
						<span>{book.publishYear}</span>
					</div>
					<div className='py-2'>
						<span className='text-xl mr-4 text-gray-500'>Create Time</span>
						<span>{new Date(book.createdAt).toString()}</span>
					</div>
					<div className='py-2'>
						<span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
						<span>{new Date(book.updatedAt).toString()}</span>
					</div>
				</div>
			)}
		</div>
	)
}

export default ShowBook
