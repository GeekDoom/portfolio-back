const { response, request } = require('express')
const Demo = require('../models/Demo')
const {
    Router
} = require('express');
const router = Router();
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const fs = require('fs-extra');


const newDemo = async (req = request, res = response) => {

    const { title, desc, link, fileSource } = req.body
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    //Create demo with model
    const dbDemo = new Demo({
        title,
        desc,
        link,
        imgURL: result.secure_url,
        public_id: result.public_id
    })
    //Create demo DB
    await dbDemo.save();
    await fs.unlink(req.file.path)
    return res.json({
        ok: true,
        msg: 'Post demo',
    })


}

const demo = async (req = request, res = response) => {


    const dbDemo = await Demo.find({});

    return res.send(dbDemo)


}

const deleteDemo = async (req, res) => {
    const { _id } = req.params;
    const dbDemo = await Demo.findByIdAndDelete(_id);
    const result = await cloudinary.v2.uploader.destroy(dbDemo.public_id);

    return res.json({
        ok: true,
        msg: 'Deleted item'
    })
}


module.exports = {
    newDemo,
    demo,
    deleteDemo
}