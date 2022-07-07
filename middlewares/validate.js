const { response } = require("express");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");



const validateFields = (req, res = response, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msg: error.mapped()
        });
    }
    next();
}

const validateJWT = (req, res = response, next) => {

    const token = req.header('security-x');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'error del token'
        })
    }

    try {

        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.name = name;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        })
    }


    next();
}

module.exports = {
    validateFields,
    validateJWT
}