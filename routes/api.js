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
    const authtoken = req.cookies['authtoken']
    const user = await db.getUserWithAuthtoken(authtoken)
    if (user) {
        req.body.username = user.username
        const id = await db.addRecipe(req.body)
        res.send({ '_id': id })
        return
    }
    res.status(404).send({ msg: 'User not found' })
})

apiRouter.post('/delete', async (req, res) => {
    const authtoken = req.cookies['authtoken']
    const user = await db.getUserWithAuthtoken(authtoken)
    if (user) {
        const id = req.body._id
        await db.deleteRecipe(user.username, id)
        res.send({ success: true })
        return
    }
    res.status(404).send({ msg: 'User not found' })
})

apiRouter.post('/clear', async (req, res) => {
    const authtoken = req.cookies['authtoken']
    const user = await db.getUserWithAuthtoken(authtoken)
    if (user) {
        await db.clear(user.username)
        res.send({ success: true })
        return
    }
    res.status(404).send({ msg: 'User not found' })
})

module.exports = apiRouter 