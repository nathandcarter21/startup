const express = require("express")
const db = require('../db')
const uuid = require('uuid')
const bcrypt = require('bcryptjs')

const authRouter = express.Router()

authRouter.get('/user', async (req, res) => {
    const authtoken = req.cookies['authtoken']
    if (authtoken) {
        const user = await db.getUserWithAuthtoken(authtoken)
        res.send(JSON.stringify(user.username))
        return
    }
    res.status(404).send({ msg: 'Unknown' })
})

authRouter.post('/register', async (req, res) => {
    const { username, password } = req.body

    if (await db.getUser(username)) {
        res.status(409).send({ msg: 'Existing user' })
    } else {
        bcrypt.hash(password, 8, async (err, hash) => {
            const authtoken = uuid.v4()
            await db.register(username, hash, authtoken)
            setAuthCookie(res, authtoken)
            res.send({ authtoken })
        })
    }
})

authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body

    const retrieved = await db.getUser(username)

    if (retrieved && retrieved.password) {
        bcrypt.compare(password, retrieved.password, async function (err, valid) {
            if (valid) {
                setAuthCookie(res, retrieved.authtoken)
                res.send({ 'authtoken': retrieved.authtoken })
            }
            else
                res.status(401).send({ msg: 'Unauthorized' })
        })
    } else
        res.status(401).send({ msg: 'Unauthorized' })
})

authRouter.delete('/logout', (_req, res) => {
    res.clearCookie('authtoken')
    res.status(204).end()
})


function setAuthCookie(res, authToken) {
    res.cookie('authtoken', authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    })
}

module.exports = authRouter