
const mongoose = require("mongoose");
const Schema = mongoose.Schema
const User = require("./userSchema")
const Pet = require('./petSchema')

async function tableResults(req, res) {

    try {
        const sumResults = await Pet.find()

        if (sumResults.length >= req.query.limit * (req.query.page)) {
            const result = await Pet.find()
                .sort({ name: 1 })
                .skip(req.query.page > 0 ? ((req.query.page - 1) * req.query.limit) : 0)
                .limit(req.query.limit)
            res.status(200).send(result);

        } else {
            res.status(204).send("No more results");
        }


    }
    catch (err) {
        res.send(err.messege)
    }

}

async function tableResultsUsers(req, res) {
    try {
        const result = await User.findAll(req.query)
          

        console.log(result)
        res.status(200).send(result);
    }
    catch (err) {
        res.send(err.messege)
    }

}



module.exports = { tableResults, tableResultsUsers }
