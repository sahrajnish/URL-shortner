const dotenv = require("dotenv")
const express = require("express");

dotenv.config({
    path: "./.env"
})

const urlRouter = require("./routes/url.routes.js");
const {connectDB} = require("./connectDB.js");
const URL = require("./models/url.models.js");

const app = express();
const PORT = 8001;

connectDB(process.env.MONGODB_URI)
.then(() => console.log(`MongoDB connected successfully.`))
.catch(() => console.log(`Error connecting with MongoDB`))

app.use(express.json());
app.use('/url', urlRouter);

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));