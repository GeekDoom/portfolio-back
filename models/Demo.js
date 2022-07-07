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
    imgName: {
        type: String,
        required: true
    }

});

module.exports = model('Demo', demoSchema);