const express = require("express")
const db = require('../db')
const apiRouter = express.Router()

apiRouter.get('/myrecipes', async (req, res) => {
    const authtoken = req.cookies['authtoken']
    const user = await db.getUserWithAuthtoken(authtoken)
    if (user) {
        const recipes = await db.getRecipes(user.username)
        res.send(JSON.stringify(recipes))
    } else {
        res.status(401).send({ msg: 'Unauthorized' })
    }
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