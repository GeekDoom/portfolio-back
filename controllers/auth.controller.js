const { response, request } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { gJWT } = require('../helpers/jwt')


const register = async (req = request, res = response) => {

    const { email, name, password } = req.body


    try {
        //verify email
        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            })
        }

        //Create user with model

        const dbUser = new User(req.body);

        //hash password
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);

        //Generate JWT
        const token = await gJWT(dbUser.id, name)

        //Create user DB

        await dbUser.save();

        //Generate success response
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            token
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the website admin'
        })
    }
}

const login = async (req = request, res = response) => {


    const { email, password } = req.body

    try {

        const dbUser = await User.findOne({ email });

        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales inválidas, verifica tu email y password.'
            });
        }

        //confirm password mastch
        const validPassword = bcrypt.compareSync(password, dbUser.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales inválidas, verifica tu email y password.'
            });
        }

        //generate JWT
        const token = await gJWT(dbUser.id, dbUser.name)

        //Response
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            token
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })

    }

}

const renew = async(req = request, res = response) => {

    const { uid, name } = req;
    const token = await gJWT(uid, name)


    return res.json({
        ok: true,
        uid,
        name,
        token

    })
}

module.exports = {
    register,
    login,
    renew
}