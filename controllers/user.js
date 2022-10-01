const User = require( "../models/user" );

// import bcryptjs third party module
const bcrypt = require( "bcryptjs" );

let loginErrorMessage;
let signupErrorMessage;

exports.getLogin = ( req, res, next ) => {

    if( req.session.userLoggedIn ) {
        res.redirect( "/" );
    } else {
        res.render( "user/user-login", { 
            user: "",
            errorMessage: loginErrorMessage
        });
        loginErrorMessage = "";
    }
}

exports.postLogin = ( req, res, next ) => {

    // optain the user entered data
    const loginData = {
        email: req.body.email,
        password: req.body.password
    }

    // check is user exist or not
    User.find({
        email: loginData.email
    }, ( err, data ) => {
        if( data.length > 0 ) {

            // save user id to use other places
            req.session.userId = data[0].id

            // compare password if a user exist with the given email
            bcrypt.compare(
                loginData.password,
                data[0].password, 
                ( err, isMatch ) => {
                    if( err ) {
                        throw err
                    } else if( !isMatch ) {
                        console.log( "password does not match" );
                        loginErrorMessage = "wrong email or password";
                        res.redirect( "login" );
                    } else {
                        const userType = data[0].userType === "user" ? "user" : "seller";

                        req.session.userLoggedIn = true;
                        req.session.userType = userType;
                        // console.log( req.session.userType );
                        res.redirect( "/" );
                    }
                }
            )
        } else {
            console.log( "user not exist" );
            loginErrorMessage = "user not exist!";
            res.redirect( "login" );
        }
    })
}

exports.getSignup = ( req, res, next ) => {

    if( req.session.userLoggedIn ) {
        res.redirect( '/' );
    } else {
        res.render( "user/user-signup", { 
            user: "", 
            errorMessage: signupErrorMessage
        });
        signupErrorMessage = "";
    }
}

exports.postSignup = ( req, res, next ) => {

    // obtain all data user entered in signup form
    const signupData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phone,
        userType: 'user'
    }

    // set salt round to bcrypt the password
    const saltRound = 10;

    // check is it exist or not
    User.find({
        email: signupData.email
    }, ( err, data ) => {

        // save user if it is not exist in database
        if( data.length === 0 ) {

            // bcrypt the password
            bcrypt.genSalt( saltRound, ( saltError, salt ) => {
                if( saltError ) {
                    throw saltError
                } else {
                    bcrypt.hash( signupData.password, salt, ( hashError, hash ) => {
                        if( hashError ) {
                            throw hashError
                        } else {

                            // create User object or document
                            const user = new User({
                                name: signupData.name,
                                email: signupData.email,
                                phoneNumber: signupData.phoneNumber,
                                password: hash,
                                userType: signupData.userType
                            })

                            // save the user
                            user.save()
                                .then( result => {
                                    res.redirect( "/user/login" );
                                })
                                .catch( err => {
                                    console.log( "error in user createion" );
                                    console.log( err );
                                    res.redirect( '/' );
                                })
                        }
                    })
                }
            })
        } else {
            signupErrorMessage = "user already exist";
            console.log( "emil exist" );
            res.redirect( "signup" );
        }
    })
}

exports.userLogout = ( req, res, next ) => {
    req.session.userLoggedIn = false;
    
    res.redirect( "/" );
}