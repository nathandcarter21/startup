const express = require("express");
const apiRouter = express.Router();
const db = require('../db')

apiRouter.get('/myrecipes', async (req, res) => {
    const username = req.get('Authorization')
    const recipes = await db.getRecipes(username)
    res.send(JSON.stringify(recipes))
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