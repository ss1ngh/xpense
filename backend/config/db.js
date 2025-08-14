const mongoose = require("mongoose");

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {});
        console.log("Mongoose connected");
    } catch(err) {
        console.log("Error connecting to Mongoose");
        process.exit(1);
    }
};

module.exports = connectDB;
