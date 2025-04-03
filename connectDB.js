const mongoose = require("mongoose");

const connectDB = async (filePath) => {
    return await mongoose.connect(filePath)
}

module.exports = {
    connectDB
}