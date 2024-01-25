require('../../app/database_mongo.js');
const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: { type: String, unique:true },
    songs : { type: Array },
    createdAt: { type: Date, default: Date.now()}
});

module.exports = mongoose.model('playlist', schema);