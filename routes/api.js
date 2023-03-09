const express = require("express");
const apiRouter = express.Router();
const db = require('../db')

apiRouter.get("/", (req, res) => {
    db.test()
    res.send({ "Hello": 'World' })
})

apiRouter.post('/recipe', async (req, res) => {
    const id = await db.addRecipe(req.body)
    res.send({ '_id': id })
})

module.exports = apiRouter 