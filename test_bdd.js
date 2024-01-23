const dotenv = require("dotenv");
dotenv.config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB).then(() => {
    console.log(`connected !`)
});