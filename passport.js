const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt= require('bcrypt')

//Admin Users
const admins=[
    {
        username:"boudriou",
        password:"boud1143"
    }
]

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, 
    function (username, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        // return UserModel.findOne({username, password})
        

        if(username===admins[0].username && 
            password===admins[0].password) {
                // console.log( 'here')
                // return admins[0]
            return cb(null, admins[0] )
            }
        //    .then(user => {
        //        if (!user) {
        //            return cb(null, false, {message: 'Incorrect username or password.'});
        //        }
        //        return cb(null, user, {message: 'Logged In Successfully'});
        //   })
        //   .catch(err => {cb(err)});
    }
));
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'secret'
},
function (jwtPayload, cb) {
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    // return UserModel.findOneById(jwtPayload.id)
    if(jwtPayload.username===admins[0].username && 
        jwtPayload.password===admins[0].password){
            console.log('here')
            return cb(null, admins[0])}


        // .then(user => {
        //     return cb(null, user);
        // })
        // .catch(err => {
        //     return cb(err);
        // });
}
));