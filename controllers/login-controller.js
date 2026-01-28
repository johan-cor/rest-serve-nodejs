const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");


const login = async (req = request, res = response) => {

    const { correo, password } = req.body;

    try {

        //verificar si el correo existe 

        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: "Usuario / Password no encontrado - correo"
            })
        }

        // si el usuario esta activo

        if (!usuario.estado) {
            return res.status(400).json({
                ok: false,
                mensaje: "Usuario / Password no encontrado - estado: false"
            })
        }

        //Verificar la contraseña
        const esPasswordValido = bcryptjs.compareSync(password, usuario.password);
        if (!esPasswordValido) {
            return res.status(400).json({
                ok: false,
                mensaje: "Usuario / Password no encontrado - password"
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            mensaje: "Login",
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            mensaje: "Error al iniciar sesión"
        })
    }



}

module.exports = {
    login
}