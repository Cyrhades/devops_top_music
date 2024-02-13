require('../../app/database_mongo.js');
const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    id_rapid_api_deezer: { type: Number, unique:true },
    title : { type: String },
    artist_name : { type: String},
    artist_name_accepted : { type: Array},
    title_accepted : { type: Array},    
    cover : { type: String},
    preview : { type: String},
    createdAt: { type: Date, default: Date.now()}
});

module.exports = mongoose.model('music', schema);