const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT || 5000

// middleware for parsing request body
app.use(express.json())

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
