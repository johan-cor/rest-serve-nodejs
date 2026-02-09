const { response, request } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Usuario, Categoria, Producto } = require("../models");

const coleccionesPermitidas = [
    "usuarios",
    "categorias",
    "productos",
    "roles"
]


const buscarUsuarios = async (termino = "", res = response) => {
    const esMongoID = ObjectId.isValid(termino); //TRUE


    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            ok: true,
            resultados: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, "i");

    const usuarios = await Usuario.find({
        $or: [
            { nombre: regex },
            { correo: regex }
        ],
        $and: [{ estado: true }]
    })

    return res.json({
        ok: true,
        resultados: usuarios
    })
}

const buscarCategorias = async (termino = "", res = response) => {
    const esMongoID = ObjectId.isValid(termino); //TRUE

    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            ok: true,
            resultados: (categoria) ? [categoria] : []
        })
    }

    const regex = new RegExp(termino, "i");

    const categorias = await Categoria.find({
        $or: [
            { nombre: regex }
        ],
        $and: [{ estado: true }]
    })

    return res.json({
        ok: true,
        resultados: categorias
    })
}

const buscarProductos = async (termino = "", res = response) => {
    const esMongoID = ObjectId.isValid(termino); //TRUE

    if (esMongoID) {
        const producto = await Producto.findById(termino).populate("categoria", "nombre");
        return res.json({
            ok: true,
            resultados: (producto) ? [producto] : []
        })
    }

    const regex = new RegExp(termino, "i");

    const productos = await Producto.find({
        $or: [
            { nombre: regex }
        ],
        $and: [{ estado: true }]
    }).populate("categoria", "nombre");

    return res.json({
        ok: true,
        resultados: productos
    })
}

const buscar = async (req = request, res = response) => {
    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            ok: false,
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case "usuarios":
            buscarUsuarios(termino, res);
            break;
        case "categorias":
            buscarCategorias(termino, res);
            break;
        case "productos":
            buscarProductos(termino, res);
            break;
        default:
            return res.status(500).json({
                ok: false,
                msg: "Error inesperado"
            })
    }
}


module.exports = {
    buscar
}
