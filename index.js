const express = require ('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const process = require('process');
const path = require("path");

const app = express()
app.use(cookieParser());

dotenv.config({path:"./config.env"})
app.use(express.json());

require("./DB/Connection")
// const User = require("../Schema/UserSchema")

//Link the Router || Auth PAge
app.use(require("./Route/auth"))

//Middleware

const port = process.env.PORT || 5000;

if ( process.env.NODE_ENV == "production"){

    app.use(express.static("client/build"));

    app.get("*", (req, res) => {

        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));

    })

}

app.listen(port , console.log(`Server started at ${port}`))