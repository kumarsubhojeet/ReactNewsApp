const express = require ('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const process = require('process');

const app = express()
app.use(cookieParser());

dotenv.config({path:"./config.env"})
app.use(express.json());

require("./DB/Connection")
// const User = require("../Schema/UserSchema")

//Link the Router || Auth PAge
app.use(require("./Route/auth"))

//Middleware

const PORT = process.env.PORT;
if (PORT == null || PORT == "") {
  PORT = 5000;
}

if ( process.env.NODE_ENV == "production"){

    app.use(express.static("napp/build"));

    const path = require("path");

    app.get("*", (req, res) => {

        res.sendFile(path.resolve(__dirname, 'napp', 'build', 'index.html'));

    })

}

app.listen(PORT , console.log(`Server started at ${PORT}`))