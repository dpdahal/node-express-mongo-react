const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

let userScheme = new Scheme({
    name: {
        type: String,
    },
    address: {
        type: String
    },
    phone: {
        type: String
    }
});

module.exports = mongoose.model("Users", userScheme);