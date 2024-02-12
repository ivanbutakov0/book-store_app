import { Route, Routes } from 'react-router-dom'
import CreateBook from './pages/CreateBook'
import DeleteBook from './pages/DeleteBook'
import EditBook from './pages/EditBook'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ShowBook from './pages/ShowBook'

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/books'>
				<Route path='create' element={<CreateBook />} />
				<Route path='details/:id' element={<ShowBook />} />
				<Route path='edit/:id' element={<EditBook />} />
				<Route path='delete/:id' element={<DeleteBook />} />
			</Route>
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}

export default App
