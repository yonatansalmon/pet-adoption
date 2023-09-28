
const express = require('express')
const PORT = process.env.PORT || 8080
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const db = require('./db/db');
const { searchPet, } = require('./models/searchPetModel')
const { tableResults, tableResultsUsers } = require('./models/AdminModel')
const mongoose = require('mongoose');


const usersRoute = require('./routes/usersRoute')
const petsRoute = require('./routes/petsRoute')
const adminRoute = require('./routes/adminRoute')

require('dotenv').config()

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())
app.use(cookieParser());
app.use('./userImages', express.static('userImages'))

app.use('/users', usersRoute)
app.use('/pets', petsRoute)
app.use('/search', searchPet)
app.use('/petsadmin', tableResults)
app.use('/usersadmin', tableResultsUsers)
app.use('/admin', adminRoute)


app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.message)
  console.error(err.statusCode)
  res.status(err.statusCode).send(err.message)
})


app.use('*', (req, res) => {
  res.status(404).send({ message: "Couldn't find this page!" })

})


async function main() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, { dbName: 'petadoption' });
    if (connection) {
      console.log('Mongoose is connected')
      app.listen(PORT, () => {
        console.log('Listening on port:' + PORT)
      })
    }
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

main()


