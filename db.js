let env = process.env.NODE_ENV || 'development'
if (env === 'development')
    require('dotenv').config()

const { MongoClient } = require('mongodb')

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

const addRecipe = async recipe => {
    try {
        res = await recipeCollection.insertOne(recipe)
        return res.insertedId
    } catch (e) {
        console.error(`Something went wrong: ${e}`)
        return null
    }
}

module.exports = { test, addRecipe }