const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");

/* POST login. */
router.post('/login', function (req, res, next) {
    console.log(req.body.username,req.body.password)
    // req.body
    passport.authenticate('local', {session: false}, (err, user, info) => {
        // req.user.username=req.body.username;
        // req.user.password=req.body.password;
        // console.log(req.user)
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed json web token with the contents of user object and return it in the response
           const token = jwt.sign(user, 'secret');
           return res.json({user, token});
        });
    })(req, res);
});

