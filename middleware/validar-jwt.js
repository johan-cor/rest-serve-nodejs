const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {

const token = req.header("x-token");

if (!token) {
    return res.status(401).json({
        ok: false,
        mensaje: "No hay token en la petición"
    })
}

try {
    const {uid} = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
    
    const usuario = await Usuario.findById(uid);
    console.log(usuario);

    if (!usuario) {
        return res.status(401).json({
            ok: false,
            mensaje: "Token no valido - usuario no existe"
        })
    }
    //Verificar si el uid tiene estado en true
    if (!usuario.estado) {
        return res.status(401).json({
            ok: false,
            mensaje: "Token no valido- usuario con estado false"
        })
    }


    req.usuario = usuario;
    req.uid = uid;

    next();
} catch (error) {
    console.log(error); 
    res.status(401).json({
        ok: false,
        mensaje: "Token no valido"
    })

}


}


module.exports = {
    validarJWT
}
