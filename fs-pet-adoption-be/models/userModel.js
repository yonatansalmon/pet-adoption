
const mongoose = require("mongoose");
const Schema = mongoose.Schema
const User = require("./userSchema")

//createUser - CREATE
async function createNewUserInDB(newUser) {
    try {
        const register = new User(newUser)
        await register.save()
        return register;

    }
    catch (err) {
        console.log(err)
    }
}

async function findUserById(id) {
    try {
        const user = await User.findOne({ _id: id })
        return user;
    }
    catch (err) {
        console.log(err)
    }
}


async function deleteUserModel(id) {
    const confirm = await User.findByIdAndDelete(id)
    return confirm

}





module.exports = { createNewUserInDB, findUserById, deleteUserModel, }
