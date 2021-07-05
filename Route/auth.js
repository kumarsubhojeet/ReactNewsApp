const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../Middleware/authenticate");


require("../DB/Connection");
const User = require("../Schema/UserSchema");


router.post('/register', async (req, res) => {

    const {name, Email, password, cpassword } = req.body;
    
    if (!name || !Email || !password || !cpassword) {
        return res.status(422).json({ error: "Plz filled the field properly" });
    }

    try {

        const userExist = await User.findOne({ Email: Email });

        if (userExist) {
             return res.status(422).json({ error: "Email already Exist" });
        } else if (password != cpassword) {
             return res.status(422).json({ error: "password are not matching" });
        } else {
             const user = new User({name, Email, password, cpassword  });
            // yeha pe 
            await user.save();
            res.status(201).json({ message: "user registered successfuly" });
        }
        
  
    } catch (err) {
        console.log(err);
    }

});

// login route 

router.post('/login', async (req, res) => {
    try {
        let token;
        const { Email, password } = req.body;

        if (!Email || !password) {
            return res.status(400).json({error:"Plz Filled the data"})
        }

        const userLogin = await User.findOne({ Email: Email });

        // console.log(userLogin);

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

           

        if (!isMatch) {
            res.status(400).json({ error: "Invalid Credientials " });
        } else {
             // need to genereate the token and stored cookie after the password match 
            token = await userLogin.generateAuthToken();
            // console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 604800000),
                httpOnly:true
            });
            
            res.json({ message: "user Signin Successfully" });
        }
        } else {
             res.status(400).json({ error: "Invalid details " });
        }

    } catch (err) {
        console.log(err);
    }
});


// about us ka page 

router.get('/Sports', authenticate ,(req, res) => {
    res.send(req.rootUser);
});


// Logout  ka page 
router.get('/logout', (req, res) => {
    // console.log(`Hello my Logout Page`);
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('User lOgout');
});


module.exports = router;

