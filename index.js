const express = require('express')
const cookieParser = require('cookie-parser')


const app = express()
const apiRouter = require('./routes/api')
const myRecipesRouter = require('./routes/myrecipes')
const authRouter = require('./routes/auth')

const port = process.argv.length > 2 ? process.argv[2] : 3000

app.use(express.json());
app.use(express.static('public'))
app.use(cookieParser())

app.use('/api', apiRouter)
app.use('/myrecipes', myRecipesRouter)
app.use('/auth', authRouter)

app.use((req, res) => {
    res.sendFile('index.html', { root: 'public' })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})