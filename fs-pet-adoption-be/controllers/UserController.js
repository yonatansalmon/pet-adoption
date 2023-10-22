const express = require('express')
const { mongo, default: mongoose } = require('mongoose')
const User = require('../models/userSchema')
const db = require('../db/db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser');
const { createNewUserInDB, findUserByEmail, findUserById } = require('../models/userModel')
const { encryptPassword } = require('../middleware/validateUserInfo')
const app = express()

require('dotenv').config()



async function signup(req, res) {
    try {
        const { first_name, last_name, email, password, phone_number } = req.body
        const newUser = await User.createUser({
            first_name,
            last_name,
            email,
            phone_number,
            password
        })
        res.status(201).send(newUser);
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }

}

async function login(req, res, next) {
    try {
        const { user, password } = req.body
        const verifyUser = await bcrypt.compare(password, user.password)
        if (!verifyUser) {
            const err = new Error('Incorrect Password!')
            err.statusCode = 400
            return next(err)
        }
        if (verifyUser) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
            res.cookie('token', token, { maxAge: 100000 * 20 * 60, httpOnly: true })
            res.send({ ok: true, id: user._id })
        }
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send(err.messege)
    }
}




async function updatePassword(req, res) {
    try {
        const userId = req.params.id;
        const filter = { _id: userId };
        const update = { password: req.body.password };
        const userAfterUpdate = await User.findOneAndUpdate(filter, update, {
            new: true
        });
        res.status(200).send(userAfterUpdate)

    } catch (err) {
        res.status(500).send(err)
    }


}





async function updateUserById(req, res) {
    try {
        const filter = { _id: req.body.id };
        const update = { ...req.body, picture: req.file.path };

        const userAfterUpdate = await User.findOneAndUpdate(filter, update, {
            new: true
        });
        res.status(200).send(userAfterUpdate)

    } catch (err) {
        res.status(500).send(err.message)

    }

}


async function updateUserInfo(req, res) {
    try {
        const userAfterUpdate = await User.findOneAndUpdate({ _id: req.body.id }, req.body, {
            new: true
        });
        res.status(200).send(userAfterUpdate)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

function deleteUserById(req, res) {
    const userId = req.params.id;
    res.send(`This is gg a route to delete user with ID: ${userId}`);
}

async function getUserByIdParams(req, res) {
    try {
        const userId = req.params.id;
        const filter = { _id: userId };
        const userInfo = await User.findOne(filter);
        res.send(userInfo);
    } catch (err) {
        res.status(500).send(err.message)

    }

}

// async function getAllUsers(req, res) {
//     try {
//         const result = await User.findAll()
//         res.send(result);
//     }
//     catch (err) {
//         res.status(500).send(err.message)
//     }
// }

async function getUserInfo(req, res) {
    try {
        const userId = req.body.id;
        const filter = { _id: userId };
        const userInfo = await User.findOne(filter);
        res.send(userInfo);
    } catch (err) {
        res.status(500).send(err.message)
    }
}

async function getSavedPets(req, res) {
    try {
        const userId = req.params.id;
        const filter = { _id: userId };
        const getSavedPets = await User.findOne(filter).populate('savedPets').exec()
        res.send(getSavedPets.savedPets);
    } catch (err) {
        res.status(500).send(err.message)

    }
}

async function getAdoptedPets(req, res) {
    try {
        const userId = req.params.id;
        const filter = { _id: userId };
        const getAdoptedPets = await User.findOne(filter).populate('adoptedPets').exec()
        res.send(getAdoptedPets.adoptedPets);
    } catch (err) {
        res.status(500).send(err.message)

    }
}

async function getFosteredPets(req, res) {
    try {
        const userId = req.params.id;
        const filter = { _id: userId };
        const getFosteredPets = await User.findOne(filter).populate('fosteredPets').exec()
        res.send(getFosteredPets.fosteredPets);
    } catch (err) {
        res.status(500).send(err.message)

    }
}

async function logout(req, res) {
    try {
        if (req.cookies.token) {
            res.clearCookie('token');
            res.status(200).send("cookie was cleard")
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
}


module.exports = {
    logout, login, signup, getUserInfo, updateUserById, deleteUserById,
    updatePassword, getUserByIdParams, getSavedPets, updateUserInfo,
    getAdoptedPets, getFosteredPets
}