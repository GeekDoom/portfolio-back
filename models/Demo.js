const { Schema, model } = require("mongoose");



const demoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true
    },
    imgURL: {
        type: String,
    },
    public_id: {
        type: String,
    }

});

module.exports = model('Demo', demoSchema);