const express = require('express')

const app = express()
const apiRouter = require('./routes/api.js')

const port = process.argv.length > 2 ? process.argv[2] : 3000

app.use(express.json());
app.use(express.static('public'))

app.use('/api', apiRouter)

app.use((req, res) => {
    res.sendFile('index.html', { root: 'public' })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})