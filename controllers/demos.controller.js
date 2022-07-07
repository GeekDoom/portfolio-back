const { response, request } = require('express')
const Demo = require('../models/Demo')



const newDemo = async (req = request, res = response) => {

    const { title, desc, link, imgName } = req.body
    //Create demo with model
    const dbDemo = new Demo(req.body)
    //Create demo DB
    await dbDemo.save();


    return res.json({
        ok: true,
        msg: 'Post demo'
    })
}

const demo = async (req = request, res = response) => {


    const dbDemo = await Demo.find({});

    return res.send(dbDemo)


}

module.exports = {
    newDemo,
    demo
}