const express = require("express");
const apiRouter = express.Router();
const db = require('../db')
const uuid = require('uuid')

const bcrypt = require('bcryptjs')


apiRouter.get('/myrecipes', async (req, res) => {
    const username = req.get('Authorization')
    const recipes = await db.getRecipes(username)
    res.send(JSON.stringify(recipes))
})

apiRouter.post('/register', async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    const authtoken = uuid.v4()

    bcrypt.hash(password, 8, async (err, hash) => {
        await db.register(username, hash, authtoken)
    })

    res.send({ authtoken })
})

apiRouter.post('/login', async (req, res) => {
    const { username, password } = req.body

    const retrieved = await db.getPassword(username)

    if (retrieved && retrieved.password) {
        bcrypt.compare(password, retrieved.password, function (err, valid) {
            if (valid === true) {
                res.send(JSON.stringify(retrieved))
                return
            }
        });
    }
    res.send({ 'success': 'fail' })
})

apiRouter.post('/recipe', async (req, res) => {
    const id = await db.addRecipe(req.body)
    res.send({ '_id': id })
})

apiRouter.post('/delete', async (req, res) => {
    const username = req.get('Authorization')
    const id = req.body._id
    await db.deleteRecipe(username, id)
    res.send({ success: true })
})

apiRouter.post('/clear', async (req, res) => {
    const username = req.get('Authorization')
    await db.clear(username)
    res.send({ success: true })
})

module.exports = apiRouter 