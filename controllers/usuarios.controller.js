const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");


const usuariosGet = async (req = request, res = response) => {

    // const { q, nombre, apikey } = req.query;
    const { limite = 5, desde = 0 } = req.query

    // console.log(typeof Number(limite), typeof Number(desde))
    if (isNaN(Number(limite)) || isNaN(Number(desde))) {
        return res.status(400).json({
            ok: false,
            mensaje: "El limite y desde deben ser números"
        })
    }


    // const usuarios = await Usuario.find({estado:true}).skip(desde).limit(limite)
    // const total = await Usuario.countDocuments({estado:true});


    const [usuarios, total] = await Promise.all([
        Usuario.find({ estado: true }).skip(desde).limit(limite),
        Usuario.countDocuments({ estado: true })
    ])

    res.json({
        ok: true,
        total,
        mensaje: "GET API - controlador",
        usuarios,
    })
}

const usuariosPost = async (req, res = response) => {





    const { nombre, correo, password, role } = req.body
    const usuario = new Usuario({ nombre, correo, password, role })




    //encriptar contrasenna
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)


    await usuario.save()

    res.status(201).json({
        ok: true,
        mensaje: "POST API - controlador",
        usuario
    })
}

const usuariosPut = async (req, res = response) => {

    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body

    //TODO validar contra la base de datos
    if (password) {
        //encriptar contrasenna
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.status(201).json({
        ok: true,
        mensaje: "PUT API - controlador",
        id,
        usuario
    })
}

const usuariosDelete = async (req, res = response) => {

    const {id } = req.params;

    // Físicamente se elimina el registro
    // const usuario = await Usuario.findByIdAndDelete(id)

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })


    res.status(201).json({
        ok: true,
        mensaje: "DELETE API - controlador",
        usuario
    })
}

const usuariosPatch = (req, res = response) => {
    res.status(201).json({
        ok: true,
        mensaje: "PATCH API - controlador"
    })
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}