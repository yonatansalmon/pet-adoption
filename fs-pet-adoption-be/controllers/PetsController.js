const express = require('express')
const { mongo, default: mongoose } = require('mongoose')
const db = require('../db/db')
const Pet = require('../models/petSchema')
const User = require('../models/userSchema')


const app = express()

require('dotenv').config()

async function getPetByIdParams(req, res) {
    const petId = req.params.id;
    const filter = { _id: petId };
    const petInfo = await Pet.findOne(filter);
    res.send(petInfo);

}

async function getAllPets(req, res) {

    try {
        const result = await Pet.find()
        res.status(200).send(result);
    }
    catch (err) {
        res.send(err.messege)
    }
}



//ADD
async function savePet(req, res) {
    try {
        const filter = { _id: req.body.userId };
        const userAfterUpdate = await User.findOneAndUpdate(
            filter,
            { $addToSet: { savedPets: req.body.petId } },
            { new: true });
        const getSavedPets = await User.findOne(filter).populate('savedPets').exec()
        res.status(200).send(getSavedPets)
    } catch (err) {
        console.log(err)

    }
}

async function fosterPetUser(req, res) {
    try {
        const filter = { _id: req.params.userId };
        const userAfterUpdate = await User.findOneAndUpdate(
            filter,
            { $addToSet: { fosteredPets: req.params.petId } },
            { new: true });
        const getFosteredPets = await User.findOne(filter).populate('fosteredPets').exec()
        res.status(200).send(getFosteredPets)
    } catch (err) {
        console.log(err)

    }

}


async function adoptPetUser(req, res) {

    try {
        const filter = { _id: req.params.userId };
        const userAfterUpdate = await User.findOneAndUpdate(
            filter,
            { $addToSet: { adoptedPets: req.params.petId } },
            { new: true });
        const getAdoptedPets = await User.findOne(filter).populate('adoptedPets').exec()
        res.status(200).send(getAdoptedPets)
    } catch (err) {
        console.log(err)

    }
}




//DELETE
async function removeSavedPet(req, res) {
    try {

        const userAfterUpdate = await User.updateOne
            ({ _id: req.params.userId },
                { $pull: { savedPets: req.params.petId } },
                { new: true })

        res.status(200).send(userAfterUpdate.savedPets)

    } catch (err) {
        console.log(err)
    }

}
async function removeFosteredPet(req, res) {
    try {


        const userAfterUpdate = await User.updateOne
            ({ _id: req.params.userId },
                { $pull: { fosteredPets: req.params.petId } },
                { new: true })

        res.status(200).send(userAfterUpdate.fosteredPets)

    } catch (err) {
        console.log(err)
    }

}
async function removeAdoptededPet(req, res) {
    try {

        const userAfterUpdate = await User.updateOne
            ({ _id: req.params.userId },
                { $pull: { adoptedPets: req.params.petId } },
                { new: true })

        res.status(200).send(userAfterUpdate.adoptedPets)

    } catch (err) {
        console.log(err)
    }

}









module.exports = {
    getPetByIdParams, getAllPets,
    savePet, removeSavedPet,
    adoptPetUser, removeAdoptededPet,
    fosterPetUser, removeFosteredPet,
}

