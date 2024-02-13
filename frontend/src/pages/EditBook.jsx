import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const EditBook = () => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [publishYear, setPublishYear] = useState('')
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const { id } = useParams()

	useEffect(() => {
		async function fetchBook() {
			setLoading(true)

			try {
				const data = await axios.get(`http://localhost:3000/books/${id}`)
				const book = data.data
				setTitle(book.title)
				setAuthor(book.author)
				setPublishYear(book.publishYear)
				setLoading(false)
			} catch (err) {
				console.log(err.message)
				setLoading(false)
			}
		}
		fetchBook()
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)

		const book = {
			title,
			author,
			publishYear,
		}

		try {
			await axios.put(`http://localhost:3000/books/${id}`, book)
			setLoading(false)
			navigate('/')
		} catch (e) {
			console.log(e.message)
			setLoading(false)
		}
	}

	return (
		<div className='p-4'>
			<BackButton />
			<h1 className='text-3xl my-4'>Edit Book</h1>
			{loading ? (
				<Spinner />
			) : (
				<form
					onSubmit={handleSubmit}
					className='flex flex-col border-2 border-sky-400 rounded-xl p-4 max-w-[600px] mx-auto'
				>
					<label htmlFor='title' className='text-xl mr-4 text-gray-500'>
						Title
					</label>
					<input
						type='text'
						name='title'
						value={title}
						onChange={e => setTitle(e.target.value)}
						className='border-2 border-gray-500 py-2 px-4 mb-4'
					/>

					<label htmlFor='author' className='text-xl mr-4 text-gray-500'>
						Author
					</label>
					<input
						type='text'
						name='author'
						value={author}
						onChange={e => setAuthor(e.target.value)}
						className='border-2 border-gray-500 py-2 px-4 mb-4'
					/>

					<label htmlFor='publishYear' className='text-xl mr-4 text-gray-500'>
						Publish Year
					</label>
					<input
						type='text'
						name='publishYear'
						value={publishYear}
						onChange={e => setPublishYear(e.target.value)}
						className='border-2 border-gray-500 py-2 px-4 mb-4'
					/>

					<button
						type='submit'
						className='p-2 bg-sky-300 m-8 hover:bg-sky-400 transition-all'
					>
						Save
					</button>
				</form>
			)}
		</div>
	)
}

export default EditBook
