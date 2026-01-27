const Role = require("../models/role");
const Correo = require("../models/correo");
const Usuario = require("../models/usuario");

const esRoleValido = async (role = "") => {
       
        const existeRole = await Role.findOne({ role })
        if (!existeRole) {
            throw new Error("El role " + role + " no existe")
        }
    }

    const esCorreoValido = async (correo = "") => {
        const existeCorreo = await Correo.findOne({ correo })
        if (existeCorreo) {
            throw new Error("El correo " + correo + " ya existe")
        }
    }


    const existeUsuarioPorID = async (id) => {
        const existeUsuario = await Usuario.findById(id)
        if (!existeUsuario) {
            throw new Error("El usuario " + id + " no existe")
        }
    }

    module.exports = {
        esRoleValido,
        esCorreoValido,
        existeUsuarioPorID
    }