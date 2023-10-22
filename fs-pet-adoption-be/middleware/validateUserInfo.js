
const bcrypt = require('bcrypt');
const db = require('../db/db')
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function isUserNew(req, res, next) {
    const isUserNew = await User.findUserByEmail(req.body.email)
    if (!isUserNew) {
        return next()
    } else {
        const err = new Error("User already exists")
        err.statusCode = 400
        return next(err)
    }
}



async function passwordMatch(req, res, next) {
    if (req.body.password === req.body.repassword) {
        return next()
    }
    const err = new Error("Passwords dont match")
    err.statusCode = 400
    return next(err)
}

async function encryptPassword(req, res, next) {
    const saltRounds = 10
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) {
            const err = new Error(err.message)
            err.statusCode = 500
            return next(err)
        } else {
            req.body.password = hash
            next()
        }
    });

}

function auth(req, res, next) {
    if (!req.cookies.token) {
        return res.status(401).send('Token Required')
    }
    const token = req.cookies.token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid Token')
        }
        req.body.userId = decoded.id
        next()
    })


}








module.exports = { passwordMatch, isUserNew, encryptPassword, auth }

