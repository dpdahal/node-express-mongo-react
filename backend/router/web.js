var express = require('express');
var router = express.Router()
var mongoose = require('mongoose');
var usersSchema = require('../models/users');

router.get('/', function (req, res, next) {
    usersSchema.find((error, data) => {
        if (error) {
            console.log(error)
        } else {
            res.json(data);
        }
    });
});

// insert record

router.post('/', function (req, res, next) {
    usersSchema.create(req.body, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            res.json(data);
        }
    });
});
//==========edit data =======
router.get('/edit/:id', function (req, res, next) {
    usersSchema.findById(req.params.id, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            res.json(data);
        }
    });
});

//update record
router.patch('/edit/:id', function (req, res, next) {
    usersSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            res.json(data);
        }
    });
});

// delete record
router.delete('/delete/:id', function (req, res, next) {
    usersSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                message: data
            });
        }
    });
});


module.exports = router;
