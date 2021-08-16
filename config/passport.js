const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcryptjs = require('bcrypt');
const User = require('../model/User')

module.exports = function (passport) {
    passport.use(
        new localStrategy({
            usernameField: 'email'
        }, (email, password, done) => {
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'That email is not registered' })
                    }

                    bcryptjs.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err
                        if (isMatch) {
                            return done(null, user)
                        }
                        else {
                            return done(null, false, { message: 'password incorrect' })
                        }
                    })
                })
            .catch(err => console.log(err))
        })
    )

    passport.serializeUser((user, done) =>{
        done(null, user.id)
    })
    passport.deserializeUser((id, done) =>{
        User.findById(id, (err, user) =>{
            done(err, user)
        })
    })
}