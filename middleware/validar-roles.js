const {Response, Request} = require("express");



const esAdminRole = (req = Request, res = Response, next) => {
 

    if (!req.usuario) {
        return res.status(500).json({
            ok: false,
            mensaje: "Se quiere validar el role sin validar el token primero"
        })
    }

    const {role, nombre} = req.usuario;

    if (role !== "ADMIN_ROL") {
        return res.status(401).json({
            ok: false,
            mensaje: `El usuario ${nombre} no es administrador`
        })
    }


    next();
}


const tieneRole = (...roles) => {

    return (req = Request, res = Response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                ok: false,
                mensaje: "Se quiere validar el role sin validar el token primero"
            })
        }

        const {role, nombre} = req.usuario;
        console.log(role);

        if (!roles.includes(role)) {
            return res.status(401).json({
                ok: false,
                mensaje: `El usuario ${nombre} no tiene el role de ${roles}`
            })
        }


        next();
    }
}


module.exports = {
    esAdminRole,
    tieneRole
}