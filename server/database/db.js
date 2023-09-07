const mongoose = require('mongoose');

const Connection = async() => {
    const uri = process.env.database;

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while connecting to the database", error);
    }
}


module.exports = Connection;
