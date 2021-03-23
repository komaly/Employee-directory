/**
 * Employees collection schema
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Employees = new Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    address: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        zip_code: {
            type: String,
        },
    },
    phone_number: {
        type: String,
    },
    email: {
        type: String,
    },
    picture: {
        type: String
    },
    job_title: {
        type: String,
    },
    department: {
        type: String,
    }
})

module.exports = mongoose.model('Employees', Employees)