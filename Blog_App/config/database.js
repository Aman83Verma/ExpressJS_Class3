const mongoose = require("mongoose");

require("dotenv").config();

const connectWithDB = () => {
    mongoose.connect(process.env.DataBase_URL)
    .then(console.log("DataBase Connected Successfully"))
    .catch( (error) => {
        console.log(error);
        console.log("DataBase is Facing Connection Issue");
        process.exit(1);
    })
};

module.exports = connectWithDB;