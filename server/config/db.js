const mongoose = require('mongoose')

mongoose.set('strictQuery', false); //Fix for Mongoose 7 future update
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_STRING)

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
}

module.exports = connectDB;