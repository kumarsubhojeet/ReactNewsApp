const express = require ('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');

const app = express()
app.use(cookieParser());

dotenv.config({path:"./config.env"})
app.use(express.json());

require("./DB/Connection")
// const User = require("../Schema/UserSchema")

//Link the Router || Auth PAge
app.use(require("./Route/auth"))

//Middleware

const PORT = Process.env.PORT || 5000 



app.listen(PORT , console.log(`Server started at ${PORT}`))