/**
 * Handles all HTTP requests to get and update information
 * in the MongoB database
 */
const { MONGO_URL } = process.env

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
const router = express.Router()
const PORT = 4000

let Employees = require('./employees.model')

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', function() {
    console.log("MongoDB database connection established successfully")
})

router.get('/', function(req, res) {
    Employees.find(function(err, data) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.json(data)
        }
    })
})

router.delete('/delete', function(req, res) {
    Employees.deleteOne({ _id: req.body.id }, function(err, data) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.json(data)
        }
    })
})

router.put('/edit', function(req, res) {
    const { id, employeeData } = req.body.data

    Employees.updateOne({ _id: id }, { $set: employeeData }, function(err, data) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.json(data);
        }
    })
})

router.post('/add', function(req, res) {
    const { employeeData } = req.body.data

    Employees.create(employeeData, function(err, data) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.json(data)
        }
    })
})

router.get('/search/:query', function(req, res) {
    const { query } = req.params
    const regex = '.*' + query + '.*'

    Employees.find({
        $or: [
            { first_name: { $regex: regex, $options: 'i' } },
            { last_name: { $regex: regex, $options: 'i' } },
            { 'address.street': { $regex: regex, $options: 'i' } },
            { 'address.city': { $regex: regex, $options: 'i' } },
            { 'address.state': { $regex: regex, $options: 'i' } },
            { 'address.country': { $regex: regex, $options: 'i' } },
            { 'address.zip_code': { $regex: regex, $options: 'i' } },
            { phone_number: { $regex: regex, $options: 'i' } },
            { email: { $regex: regex, $options: 'i' } },
            { job_title: { $regex: regex, $options: 'i' } },
            { department: { $regex: regex, $options: 'i' } },
        ],
     }, function(err, data) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.json(data)
        }
    })
})

app.use('/employees', router)

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT)
})