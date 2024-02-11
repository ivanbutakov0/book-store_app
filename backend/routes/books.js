const express = require('express')
const { Book } = require('../models/bookModel')
const router = express.Router()

router
	.route('/')
	.get(async (req, res) => {
		try {
			const books = await Book.find({})
			res.status(200).json({
				count: books.length,
				data: books,
			})
		} catch (err) {
			console.log(err.message)
			res.status(500).send({ message: err.message })
		}
	})
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

router
	.route('/:id')
	.get(async (req, res) => {
		try {
			const book = await Book.findById(req.params.id)
			if (!book) {
				return res.status(404).send({ message: 'Book not found' })
			}
			res.status(200).json(book)
		} catch (err) {
			console.log(err.message)
			res.status(500).send({ message: err.message })
		}
	})
	.put(async (req, res) => {
		try {
			if (!req.body.title || !req.body.author || !req.body.publishYear) {
				return res.status(400).send({
					message: 'All fields are required: title, author, publishYear',
				})
			}
			const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
			})

			if (!book) {
				return res.status(404).send({ message: 'Book not found' })
			}

			return res.status(200).json({
				message: 'Book updated successfully:',
				data: book,
			})
		} catch (err) {
			console.log(err.message)
			res.status(500).send({ message: err.message })
		}
	})
	.delete(async (req, res) => {
		try {
			const book = await Book.findByIdAndDelete(req.params.id)
			if (!book) {
				return res.status(404).send({ message: 'Book not found' })
			}
			return res.status(200).json({
				message: 'Book deleted successfully:',
				data: book,
			})
		} catch (err) {
			console.log(err.message)
			res.status(500).send({ message: err.message })
		}
	})

module.exports = router
