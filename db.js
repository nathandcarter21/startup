let env = process.env.NODE_ENV || 'development'
if (env === 'development')
    require('dotenv').config()

const { MongoClient } = require('mongodb')
const ObjectId = require('mongodb').ObjectId

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
    throw Error('Database not configured. Set environment variables')
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`

const client = new MongoClient(url)
const recipeCollection = client.db('startup').collection('recipe')

const test = async () => {
    const recipe = {
        "hello": 'world'
    }
    await recipeCollection.insertOne(recipe)
}

const getRecipe = async (id) => {
    const query = { '_id': new ObjectId(id) }
    const recipe = recipeCollection.findOne(query)
    return recipe
}

const getRecipes = async username => {
    const query = { username }
    const cursor = recipeCollection.find(query)
    return cursor.toArray()
}

const addRecipe = async recipe => {
    try {
        res = await recipeCollection.insertOne(recipe)
        return res.insertedId
    } catch (e) {
        console.error(`Something went wrong: ${e}`)
        return null
    }
}

const deleteRecipe = async (username, id) => {
    const query = { username, '_id': new ObjectId(id) }
    await recipeCollection.deleteOne(query)
}

const clear = async username => {
    const query = { username }
    await recipeCollection.deleteMany(query)
}

module.exports = { test, addRecipe, getRecipes, getRecipe, clear, deleteRecipe }