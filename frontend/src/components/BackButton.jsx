import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const BackButton = ({ destination = '/' }) => {
	return (
		<Link
			to={destination}
			className='bg-sky-800 border border-transparent text-white px-3 py-1 rounded-lg hover:bg-transparent hover:text-sky-800 hover:border-sky-800 transition-all inline-block'
		>
			<ArrowLeft />
		</Link>
	)
}

export default BackButton
