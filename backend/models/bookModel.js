const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		publishYear: {
			type: Number,
			require: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports.Book = mongoose.model('Book', bookSchema)
