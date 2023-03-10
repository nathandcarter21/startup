const express = require("express");
const myRecipesRouter = express.Router();
const db = require('../db')

myRecipesRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const recipe = await db.getRecipe(id)
    res.send(JSON.stringify(recipe))
})

module.exports = myRecipesRouter 