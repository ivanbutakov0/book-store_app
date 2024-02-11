const express = require('express')
const { Book } = require('../models/bookModel')
const router = express.Router()

router
	.route('/')
	.post(async (req, res) => {
		try {
			if (!req.body.title || !req.body.author || !req.body.publishYear) {
				return res.status(400).send({
					message: 'All fields are required: title, author, publishYear',
				})
			}

			const { title, author, publishYear } = req.body
			const book = new Book({ title, author, publishYear })
			await book.save()

			res.status(201).send(book)
		} catch (err) {
			console.log(err.message)
			res.status(500).send({ message: err.message })
		}
	})
	.get(async (req, res) => {
		try {
			const books = await Book.find()
			res.status(200).send(books)
		} catch (err) {
			console.log(err.message)
			res.status(500).send({ message: err.message })
		}
	})

module.exports = router
