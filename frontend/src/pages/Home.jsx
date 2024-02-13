import axios from 'axios'
import { Info, Pencil, PlusSquare, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'

const Home = () => {
	const [loading, setLoading] = useState(false)
	const [books, setBooks] = useState([])

	useEffect(() => {
		setLoading(true)

		async function fetchBooks() {
			try {
				const data = await axios.get('http://localhost:3000/books')
				const books = data.data.books

				setBooks(books)
				setLoading(false)
			} catch (err) {
				console.log(err.message)
				setLoading(false)
			}
		}

		fetchBooks()
	}, [])

	return (
		<div className='p-4'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl'>Books List</h1>
				<Link to={'/books/create'}>
					<PlusSquare className='text-sky-800 w-8 h-8' />
				</Link>
			</div>
			{loading ? (
				<div className='flex justify-center'>
					<Spinner />
				</div>
			) : (
				<table className='w-full border-separate border-spacing-2'>
					<thead>
						<tr>
							<th className='border border-slate-600 rounded-md'>No</th>
							<th className='border border-slate-600 rounded-md'>Title</th>
							<th className='border border-slate-600 rounded-md'>Author</th>
							<th className='border border-slate-600 rounded-md'>
								Publish Year
							</th>
							<th className='border border-slate-600 rounded-md'>Operations</th>
						</tr>
					</thead>
					<tbody>
						{books.map((book, index) => (
							<tr key={book._id}>
								<td className='border border-slate-700 rounded-md text-center'>
									{index + 1}
								</td>
								<td className='border border-slate-700 rounded-md text-center'>
									{book.title}
								</td>
								<td className='border border-slate-700 rounded-md text-center max-md:hidden'>
									{book.author}
								</td>
								<td className='border border-slate-700 rounded-md text-center max-md:hidden'>
									{book.publishYear}
								</td>
								<td className='border border-slate-700 rounded-md text-center'>
									<div className='flex justify-center gap-4'>
										<Link to={`/books/details/${book._id}`}>
											<Info className='text-green-800' />
										</Link>
										<Link to={`/books/edit/${book._id}`}>
											<Pencil className='text-yellow-600' />
										</Link>
										<Link to={`/books/delete/${book._id}`}>
											<Trash2 className='text-red-700' />
										</Link>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}

export default Home
