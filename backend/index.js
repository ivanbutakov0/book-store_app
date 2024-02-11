const express = require('express')
const app = express()
const { PORT } = require('./config')

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
