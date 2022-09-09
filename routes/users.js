var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userModel = require('../models/userModel');
/* GET home page. */


router.post('/add-user', function (req, res, next) {

    // req.assert('name', 'Name is required').notEmpty()           //Validate name
    // req.assert('email', 'A valid email is required').isEmail()  //Validate email

    // var errors = req.validationErrors()

    // if (!errors) {   //No errors were found.  Passed Validation!


        var userDetails = new userModel({
            name: req.body.name,
            email: req.body.email,
        });

        userDetails.save((err, doc) => {
            if (!err) {

                req.flash('success', 'User added successfully!');
                res.redirect('/');
            }
            else {

                console.log('Error during record insertion : ' + err);
            }
        });


        

    // }
    // else {   //Display errors to user
    //     var error_msg = ''
    //     errors.forEach(function (error) {
    //         error_msg += error.msg + '<br>'
    //     })
    //     req.flash('error', error_msg)

    //     res.render('/', {
    //         title: 'Add New User',
    //         name: req.body.name,
    //         email: req.body.email
    //     })
    // }
});
module.exports = router;