const express = require("express")
const db = require('../db')
const uuid = require('uuid')
const bcrypt = require('bcryptjs')

const authRouter = express.Router()

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

authRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName)
    res.status(204).end()
})

authRouter.get('/user/:username', async (req, res) => {
    const user = await db.getUser(req.params.username)
    if (user) {
        const token = req?.cookies.token
        res.send({ email: user.email, authenticated: token === user.token })
        return
    }
    res.status(404).send({ msg: 'Unknown' })
});


function setAuthCookie(res, authToken) {
    res.cookie('authtoken', authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    })
}

module.exports = authRouter