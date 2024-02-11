const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 5000

// Middleware for parsing request body
app.use(express.json())

// Middleware for handling CORS policy
app.use(
	cors({
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type'],
	})
)

app.get('/', (req, res) => {
	res.send('Hello World!')
})

/* ROUTES */
const booksRouter = require('./routes/books')

app.use('/books', booksRouter)

mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => {
		console.log('MongoDB connected')
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`)
		})
	})
	.catch(err => {
		console.log(err)
	})
