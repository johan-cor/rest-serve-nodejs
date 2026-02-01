const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");


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

const googleSignIn = async (req = request, res = response) => {
    const { id_token } = req.body;
    try {

        const { nombre, correo, imagen } = await googleVerify(id_token);

        //verificar si el correo existe 
        const usuario = await Usuario.findOne({ correo });


        if (!usuario) {

            // si el usuario no existe, se crea
            const usuario = new Usuario({
                nombre,
                correo,
                password: ":)",
                imagen,
                google: true
            })
            await usuario.save();   
        }

        // console.log("antes de validar estado",usuario);

        //Si el usuario no esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                ok: false,
                mensaje: "Usuario / Password no encontrado - estado: false"
            })
        }

        //Si el usuario existe pero no es google
        if (!usuario.google) {
            return res.status(400).json({
                ok: false,
                mensaje: "Usuario / Password no encontrado - google"
            })
        }


        //Generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({
            ok: true,
            mensaje: "Google Sign In",
            usuario,
            token
        });

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            mensaje: "Error al iniciar sesión"
        })
    }
}

module.exports = {
    login,
    googleSignIn
}